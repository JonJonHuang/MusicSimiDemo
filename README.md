# Watson Speed Dating Demo
by Jonathon Huang, Aakash Singh, Stephen Wan, and Andy Wei

## To run the app:
Go into the directory of watsonwebapp, then run the following:
```
npm install
npm start app.js
```
Then, navigate to [http://localhost:3000/](http://localhost:3000/) in the web browser to view the web application.

## Development Notes
The following section includes documentation about the development process of this project. It is not necessary to run these procedures again.

### To initialize the project files:
The following only needs to be run once, in order to quickly setup the Express.js project:
```
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install express-generator -g
express --view=pug watsonwebapp
```

### To set up Mongo database locally
Go to the [MongoDB Community Server download page](https://www.mongodb.com/download-center?initial=true#community) and install MongoDB Server. If you want to you can also install Compass (provides a GUI view for MongoDB).

Add the MongoDB bin folder to your PATH environment variables so that you can run ```mongod``` from the command line.

Run
```
mkdir WatsonSpeedFriending/data/db
npm run dbon
```

### To set up Mongo database on Ubuntu
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
