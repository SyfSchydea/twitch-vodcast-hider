// ==UserScript==
// @name         Twitch Vodcast Hider
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hides Vodcasts from the list of live followed channels.
// @author       SyfSchydea
// @match        https://www.twitch.tv/directory/following/live
// @grant        none
// ==/UserScript==

( () => {
	'use strict';

	// Returns an array-like of all channel cards on the page.
	function getCards() {
		return document.querySelectorAll(".tw-tower > .tw-mg-b-2");
	}

	// Returns truthy if the given card is a vodcast, falsey otherwise.
	function isVodcast(card) {
		return card.querySelector(".stream-type-indicator--rerun");
	}

	// Removes the card from the page
	function removeCards(div) {
		div.parentElement.removeChild(div);
	}
	
	const retryDelay = 5000;
	
	function run() {
		let vodcastCards = Array.from(getCards()).filter(isVodcast);
		
		vodcastCards.forEach(removeCards);
		
		if (vodcastCards.length > 0) {
			console.log(`[Vodcast Hider] Hid ${ vodcastCards.length } cards`);
		}
	}
	
	setInterval(run, retryDelay);
} )();
