describe("Dom Tests", function() {

    var substrata = {};

    beforeEach(function(){
        substrata = new Substrata();
    });

    it("has a function called testRun which returns true", function() {
        expect(substrata.testRun()).to.be.true;
    });

    it("has a function called setupWindow which returns an integer", function() {
        expect(substrata.setupWindow()).to.be.a('number');
    })

});