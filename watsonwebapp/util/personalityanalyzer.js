var db = require('./db.js');
// set up wrapper for Personality Insights
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personalityInsights = new PersonalityInsightsV3({
    version: '2017-10-13',
    username: '15d6c13d-04a9-4325-96da-50fe39f6f34a',
    password: '1jm1gUI2MYvF',
    url: 'https://gateway.watsonplatform.net/personality-insights/api'
  });

var PersonalityAnalyzer = class {
    constructor() {
        this.userPersonalities=[];
    }

    async getPersonality(email) {
        return new Promise((res, rej) => {
            var personalityVals = [];
            db.getUser(email).then((user) => {
                var userMessages = user.messages;
                var userText = "";
                for (let mObj of userMessages) {
                    if (!mObj.isWatson) {
                        userText += mObj.text + " ";
                    }
                }
                var profileParams = {
                    content: userText,
                    'content_type':'text/plain',
                };
                var profile = personalityInsights.profile(profileParams, function(error,
                    profile) {
                        if (error) {
                            console.log(error);
                        }
                        if (profile != null) {
                          for (let pt of profile['personality']) {
                              personalityVals.push({name: pt['name'], val: pt['percentile']});
                          }
                          for (let need of profile['needs']) {
                              personalityVals.push({name: need['name'], val: need['percentile']});
                          }
                          for (let value of profile['values']) {
                              personalityVals.push({name: value['name'], val: value['percentile']});
                          }
                          db.setPersonality(email, personalityVals);
                          res(true);
                        } else {
                            console.log("profile is null!")
                            res(null);
                        }
                    });
            });
        });
            
    }
}
module.exports = PersonalityAnalyzer;