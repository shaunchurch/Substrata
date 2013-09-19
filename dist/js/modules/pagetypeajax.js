/*
 * pagetype module
 */

define([

		"jquery"

		], function($) {

		"use strict";

		function getPageTypeAjax () {

			return $("div.main").data("jsroute");

		}

		return {
			getPageTypeAjax: getPageTypeAjax
		};
	}
);