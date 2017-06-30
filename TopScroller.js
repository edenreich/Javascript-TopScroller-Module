var TopScroller = (function(window) {
	
	'use strict';

	/**
	 * Stores the current top position of the window.
	 */
	var currentTop = 0;

	/**
	 * Checks whether the element has been already added to the DOM.
	 */
	var elementInTheDOM = false;

	/**
	 * Stores the element.
	 */
	var topScrollerElement = null;

	/**
	 * Stores the settings.
	 */
	var settings = {};

	/**
	 * Stores the default settings.
	 */
	var defaultSettings = {
		after: '400px',
		background: 'rgba(0, 0, 0, 0.2)',
		backgroundHover: 'rgba(0, 0, 0, 0.5)',
		position: {
			distance: '20px',
			corner: ['right', 'bottom'],
		}
	};

	/**
	 * Initializing:
	 * - Setting up the developer's settings.
	 * - Creating the scroller element.
	 * - Attaching a listener to onscroll event.
	 */
	function init(devSettings) {
		if(typeof settings !== 'object') {
			throw new Error('TopScroller.init() expecting object, but ' + typeof settings + ' was passed.');
		}

		settings = extend(defaultSettings, devSettings);

		topScrollerElement = createTopScrollerElement();

		window.onscroll = checkIfScrollLimitIsPassed;
	}

	/**
	 * Creates the scroller element. 
	 */
	function createTopScrollerElement() {
		if(topScrollerElement) {
			return;
		}

		var button = document.createElement('a');

		button.setAttribute('id', 'topScroller');
		button.setAttribute('href', '#');
		button.setAttribute('title', 'Scroll back to top');
		
		button.innerHTML = '&#x5e;';

		button.onclick = slideToTop;

		return button;
	}

	/**
	 * Scrolls the browser slowly to the top, more like sliding.
	 */
	function slideToTop(event) {
		event.preventDefault();

		var requestID = window.requestAnimationFrame(slideStep); 

		function slideStep() {
  			currentTop -= 100;
			
			window.scrollTo(0, currentTop);

			if(currentTop <= 0) {
				window.cancelAnimationFrame(requestID);
				return requestID = undefined;
			}
			requestID = window.requestAnimationFrame(slideStep);
		}
	}

	/**
	 * Checks whether the limit, that the scroller 
	 * element should appear, is passed.
	 */
	function checkIfScrollLimitIsPassed() {
		currentTop = document.documentElement.scrollTop || document.body.scrollTop;

		if(currentTop >= parseInt(settings.after)) {
			displayTopScrollerButton();
		} else {
			hideTopScrollerButton();
		}
	}

	/**
	 * Displays the scroll to top element.
	 */
	function displayTopScrollerButton() {
		if(topScrollerElement && elementInTheDOM) {
			topScrollerElement.className = 'visible';
		}

		if(topScrollerElement && ! document.querySelector('#topScroller')) {
			document.body.appendChild(topScrollerElement);
			addTopScrollerStyleTag();
			elementInTheDOM = true;
		}
	}

	/**
	 * Hides the scroll to top element.
	 */
	function hideTopScrollerButton() {
		if(topScrollerElement) {
			topScrollerElement.className = 'invisible';
		}
	}
	
	/**
	 * Checks if an object is empty.
	 */
	function isEmpty(object) {
		for(var property in object) {
			return false;
		}
		
		return true
	}

	/**
	 * Extends an existing object, inheritance.
	 */
	function extend(source, object) {
		if(isEmpty(object)) {
			return source;
		}
		
		var extended = {};

		Object.keys(source).map(function(key) {
			for(var property in object) {
				if(key === property) {
					extended[key] = object[key]; 
					break;
				}
					
				extended[key] = source[key];
			}
		});

		return extended;
	}

	/**
	 * Adds the style tag of that element.
	 */
	function addTopScrollerStyleTag() {
		if(document.getElementById('topScrollerStyleTag')) {
			return;
		}

		var styleTag = document.createElement('style');
		styleTag.setAttribute('id', 'topScrollerStyleTag');

		var CSS = `
			a#topScroller {
				color: #ffffff;
				font-size: 1.2em;
				z-index: 9999;
				text-decoration: none;
				width: 50px;
				height: 50px;
				line-height: 50px;
				text-align: center;
				border: 1px solid #10334d;
				position: fixed;
				${settings.position.corner[0]}: ${settings.position.distance};
				${settings.position.corner[1]}: ${settings.position.distance};
				background-color: ${settings.background};
				trasition: all 0.3s ease-out;		
			}

			a#topScroller:hover {
				trasition: all 0.3s ease-out;
				background-color: ${settings.backgroundHover};
			}

			a#topScroller.visible {
				visibility: visible;
				trasition: all 0.3s ease-out;
			}

			a#topScroller.invisible {
				visibility: hidden;
				trasition: all 0.3s ease-out;
			}
		`;

		CSS = minify_css(CSS);
		styleTag.innerHTML = CSS;

		document.head.appendChild(styleTag);
	}

	/**
	 * minifies the css text.
	 */
	function minify_css(string) {
	    string = string.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
	    string = string.replace(/ {2,}/g, ' ');
	    string = string.replace(/([{:}])/g, '$1');
	    string = string.replace(/([;,]) /g, '$1');
	    string = string.replace(/ !/g, '!');
	    
	    return string;
	}

	return {
		init: init,
	}

})(window);
