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
    };
}