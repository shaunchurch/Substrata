function Substrata() {
    var self = this;

    this.init = function() {
        // resize event
        $(window).resize(function() {
                self.setupWindow();
                console.log("let's see if this thing works at all')");
        });
    };

    this.setupWindow = function() {
        console.log('setupWindow()');
        return window.innerHeight;
    };

    this.testRun = function() {
        return true;
    };
}