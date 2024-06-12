var personality = require('../routes/personality');

describe('personality',function(){

    beforeAll(function(done){
        done();
    })
    it('successfully receiving back from waston', function(done){
        expect(personality).not.toBeNull();
        done();
    })
    afterAll(function(done){
        done();
    })
})