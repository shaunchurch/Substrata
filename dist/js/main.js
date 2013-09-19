// This is the entry point (root require module) for the core JavaScript

define([ "jquery", "loadpage", "loadpageajax"], function ($, loadPage, loadPageAjax) {

        "use strict";

        console.log('main');

        // Remove the no-js class from the html element
        $("html").removeClass("no-js");

        // Initialise our page specific modules
        loadPage.init();
        loadPageAjax.init();


        // Initialise deferred scripts
        // deferred.init();

});
