const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const uri = "mongodb+srv://Default:12345@watsonspeedfriending-2njuo.mongodb.net/test?retryWrites=true";
// const uri = "mongodb://localhost:27017";
// mongoose.connect(uri, (err) => {
//     if (err)
//         throw err;
// });

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    pwHash: {type: String, required: true},
    messages: {type: Array, required: true},
    context: {type: Schema.Types.Mixed, default: null},
    personality: {type: Array, required: true}
}, {
    strict: true
});
const UserModel = mongoose.model('users', userSchema);

mongoose.connect(uri).then(() => {
    console.log('Mongoose connection opened.');
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

process.on('exit', () => {
    console.log('Closing Mongoose connection.');
    mongoose.disconnect().then(() => {
        console.log('Mongoose connection closed.')
        process.exit(0);
    }, (err) => {
        throw err;
    });
});
// process.on('SIGINT', () => {
//     console.log('hi');
//     mongoose.disconnect().then(() => {
//         console.log('Mongoose connection closed.')
//         process.exit(0);
//     }, (err) => {
//         throw err;
//     });
// });

/**
 * 
 * @param {*} email 
 * @returns Promise<User>
 */
async function getUser(email) {
    return UserModel.findOne({email: email}).catch((err) => {
        console.error(err);
    });;
}

/**
 * @returns Promise<Users>
 */
async function getAllUsers() {
    return UserModel.find({}).catch((err) => {
        console.error(err);
    });
}

/**
 * 
 * @param {*} email 
 * @param {*} username 
 * @param {*} password 
 * @returns Promise<boolean> that resolves with whether the user was successfully created.
 */
async function registerUser(email, username, password) {
    let user = await getUser(email);
    if (!user) {
        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(password, salt);
        let newUser = new UserModel({
            email: email,
            username: username,
            pwHash: hash,
            messages: [
                {senderId: 'Watson', text: 'Hi! I can help you find people with similar interests, such as a gaming partner, or just a friend in general.', isWatson: true},
            ],
            personality: []
        });
        let success = await newUser.save().then(() => {
            return true;
        }, (err) => {
            console.error(err);
            return false;
        });
        return success;
    }
    return false;
}

/**
 * @para {*} email
 * @returns Promise<boolean> that removed user
 */
async function removeUser(email){
    let user = await getUser(email);
    if(user){
        let success = await user.remove().then(() => {
            return true;
        }, (err) => {
            console.error(err);
            return false;
        });
        return success;
    }
    return false;
}

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns Promise<boolean> that resolves with whether the credentials match.
 */
async function validateUser(email, password) {
    let user = await getUser(email);
    if (user) {
        return bcrypt.compare(password, user.pwHash).catch((err) => {
            console.error(err);
        });
    }
    return false;
}


/**
 * 
 * @param {*} email 
 * @param {*} message 
 * @returns Promise<boolean> that resolves with if the user message was saved.
 */
async function addUserMessage(email, senderId, message, isWatson) {
    let user = await getUser(email);
    if (user) {
        user.messages.push({senderId: senderId, text: message, isWatson: isWatson});
        let success = await user.save().then(() => {
            return true;
        }, (err) => {
            return false;;
        });
        return success;
    }
    return false;
}

async function setContext(email, context) {
    return UserModel.updateOne({email: email}, {context: context}).catch((err) => {
        console.error(err);
    });
}

async function setPersonality(email, personalityArr) {
    return UserModel.updateOne({email: email}, {personality: personalityArr}).catch((err) => {
        console.error(err);
    });
}

module.exports = {
    getUser: getUser,
    registerUser: registerUser,
    validateUser: validateUser,
    addUserMessage: addUserMessage,
    setContext: setContext,
    removeUser: removeUser,
    getAllUsers: getAllUsers,
    setPersonality: setPersonality
};
