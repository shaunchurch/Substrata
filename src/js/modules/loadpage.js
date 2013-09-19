/*
 * loadpagemodule module
 * Loads page modules depending on the page type
 */

define([

	"pagetype"

	], function(pageType) {

		"use strict";

		function initialise () {

			var page;
			page = pageType.getPageType();

			if (page !== undefined && page !== "") {

				require(page).init();

			}
		}

		return {
			init: initialise
		};
	}
);