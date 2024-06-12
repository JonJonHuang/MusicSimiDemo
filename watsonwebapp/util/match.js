var users = {};
var db = require('./db.js');

async function findMatch(userEmail) {
    let users = await db.getAllUsers();
    let user = await db.getUser(userEmail);
    var personalityArr = user.personality;
    var tempUserArr;
    var userMap = new Map();
    var scores = [];
    for (let user of users) {
        if (user.email.localeCompare(userEmail) != 0) {
            tempUserArr = user.personality;
            var email = user.email;
            var profile = [user.username, email];
            var i;
            var dist;
            var totalDist = 0;
            if (tempUserArr.length > 0) {
                for (i = 0; i < personalityArr.length; i++) {
                    dist = Math.pow((personalityArr[i].val - tempUserArr[i].val), 2);
                    if (dist <= .05) {
                        profile.push(personalityArr[i].name);
                    }
                    totalDist += dist;
                }
                userMap.set(Math.sqrt(totalDist), profile);
                scores.push(Math.sqrt(totalDist));
            }
        }
    }
        var topMatch = [];
        var mapAsc = new Map([...userMap.entries()].sort());
        for(var entry of mapAsc.entries()) {
            topMatch.push( [entry[1], entry[0]] );
        }
        // scores.sort(function (a, b) {
        //     return a - b
        // });
        // for (i = 0; i < scores.length; i++) {
        //     topMatch.push(userMap.get(scores[i]));
        // }
    
    console.log(topMatch);
    return topMatch;
}

module.exports = {
    findMatch : findMatch
};
