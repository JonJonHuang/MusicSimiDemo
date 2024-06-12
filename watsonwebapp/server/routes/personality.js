var express = require('express');
var router = express.Router();


var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personalityInsight = new PersonalityInsightsV3({
    version: '2018-09-20',
    username: '46267b81-a12c-436a-9cfc-e315fc056275',
    password: 'EKB44xNnNUUF',
    url: 'https://gateway-wdc.watsonplatform.net/personality-insights/api'
});

var userMatcher = require('../../util/match.js');
var personalityAnalyzer = require('../../util/personalityanalyzer.js');
var pa = new personalityAnalyzer;
var db = require('../../util/db.js');
router.get('/', function(req,res,next){
    db.getUser(req.query.email).then((user)=>{
        if (user) {
            pa.getPersonality(req.query.email).then((result)=> {
                if (result === null) {
                    res.send({message: 'Not enough data to compute personality traits.', personality: []})
                    return;
                }
                db.getUser(req.query.email).then((user)=>{
                    res.send({personality: user.personality});
                }).catch((err)=>{
                    console.log(err);
                });
            }).catch((err)=>{
                console.log(err);
            });
          } else {
              res.send(['There was an error.'])
          }
    }).catch((err)=>{
        console.log(err);
    });
})

module.exports = router;
