var db = require('../util/db.js');
var email = 't@t';
var pas = 'aaa';
var userName = 'tw';
// var email1 = 'testing1@test.com';
// var pas1 = '1234';
// var userName1 ='bornToBeRemoved';
var message = 'testing';
var res = false;

describe('database',function(){

    beforeAll(function(done){
        db.registerUser(email, userName, pas);
        done();
    })
    it('Add user message successful', function(done){
        db.addUserMessage(email,message).then((res) => {
            expect(res).toBe(true);
            done();
        });
    })
    it('validate user successful', function(done){
        db.validateUser(email, pas).then((res) =>{
            expect(res).toBe(true);
            done();
        })
    })
    // it('remove user successful', function(done){
    //     db.registerUser(email1,userName1,pas1);
    //     db.removeUser(email1).then((res) => {
    //         expect(res).toBe(true);
    //         done();
    //     });
    // })
    afterAll(function(done){
        done();
    })
})