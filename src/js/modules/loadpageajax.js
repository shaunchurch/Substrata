/*
 * loadajaxpagemodule module
 * Loads ajax page required modules depending on the page type
 */

define([

	"pagetypeajax"

	], function(pageTypeAjax) {

		"use strict";

		var cache = {

			bodyElement: null,
			quickLinks: null,

			currentPage: null,
			modal: null,
			slides: null

		}

		function getPageTypeAjax() {

			var page;
			page = pageTypeAjax.getPageTypeAjax();

			if (page !== undefined && page !== "") {

				require(page).init();

			}
		}

		function getModalWidth() {

			return $(window).width() - 200;

		}

		function getModalHeight() {

			return $(window).height() - 200;

		}

		function createModal(pageContent) {

			if(!cache.modal) {
				cache.modal = $('<div></div>');
				cache.modal.addClass('quick-look-modal');
				// cache.modal.css('height', getModalHeight());
				cache.modal.css('width', getModalWidth());
				cache.modal.css('top', -cache.modal.height());
				cache.modal.css('left', 100);
			}

			cache.modal.html(pageContent);

			cache.bodyElement.append(cache.modal);

			// refresh cache
			cacheElements();
			// reattach click events
			bindClickEvents();

			cache.modal.animate({'top': 100}, 200, 'swing');

		}


		function pushHistory() {

			window.history.pushState(null, null, cache.currentPage);
			

		}

		function pageWasReceived(page) {

			var pageContent = $(page).filter('.content');

			pushHistory();

			createModal(pageContent);

		}

		function requestPage(url) {

			var request = $.get( url );

			request.done( pageWasReceived );

		}

		function quickLinkWasClicked(click) {

			click.preventDefault();
			click.stopPropagation();

			var url = $(click.target).attr('href');

			cache.currentPage = url;

			requestPage( url );

		}

		function windowPopped(event) {

			console.log('pop goes the weasel');

			requestPage( event );
			console.log(event);
			

		}

		function bindClickEvents() {

			cache.quickLinks.off('click');
			cache.quickLinks.on('click', quickLinkWasClicked);

		}

		function bindEvents() {


			$(window).on('popstate', windowPopped);

		}

		function cacheElements() {

			cache.bodyElement = $('body');
			cache.quickLinks = $('[data-quicklook]');
			

		}

		function initialise() {

			cacheElements();
			bindEvents();
			bindClickEvents();

		}

		return {
			init: initialise
		};
	}
);