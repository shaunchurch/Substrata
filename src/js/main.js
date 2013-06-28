function Substrata() {
    var self = this;

    this.init = function() {
        // resize event
        $(window).resize(function() {
                self.setupWindow();
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