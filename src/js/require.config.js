/*
 * RequireJS Config
 */

require.config({

	paths: {

		// "chai":									"../test/lib/chai",
		// "mocha":								"../test/lib/mocha",
		// "squire":								"../test/lib/squire",

		// third party
		'jquery':								'bower_components/jquery/jquery',

		// local modules
		'loadpage':								'modules/loadpage',
		'loadpageajax':							'modules/loadpageajax',
		'pagetype':								'modules/pagetype',
		'pagetypeajax':							'modules/pagetypeajax'

	},

	shim: {

		// "jquery.ui":							["jquery"],

	}
});
