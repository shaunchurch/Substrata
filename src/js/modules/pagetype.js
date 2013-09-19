/*
 * pagetype module
 */

define([

		"jquery"

		], function($) {

		"use strict";

		function getPageType () {

			return $("body").data("jspagetype");

		}

		return {
			getPageType: getPageType
		};
	}
);