(function($) {
	'use strict';

	$('html').addClass('js').removeClass('no-js');

	// Typing.
	// -------------------------
	function deleteString($target, delay, cb) {
		var length;

		$target.html(function(_, html) {
			length = html.length;
			return html.substr(0, length - 1);
		});

		if (length > 1) {
			setTimeout(function() {
				deleteString($target, delay, cb);
			}, delay);
		} else {
			cb();
		}
	}

	// $ hook.
	$.fn.extend({
		teletype: function(opts) {
			var settings = $.extend({}, $.teletype.defaults, opts);

			return $(this).each(function() {
				(function loop($tar, idx) {
					// type
					typeString($tar, settings.text[idx], 0, settings.delay, function() {
						// delete
						setTimeout(function() {
							deleteString($tar, settings.delay, function() {
								loop($tar, (idx + 1) % settings.text.length);
							});
						}, settings.pause);
					});

				}($(this), 0));
			});
		}
	});

	// Plugin defaults.
	$.extend({
		teletype: {
			defaults: {
				// Time to type.
				delay: 110,
				// Pause between deletion.
				pause: 1500,
				text: []
			}
		}
	});

	$('.typer-text').teletype({
		text: [
			'Ben Welsby',
			'Web Designer',
			'Web Developer',
			'Digital Marketer'
		]
	});

	$('.period').teletype({
		text: ['.', ' '],
		delay: 1000,
		// Cursor flash speed.
		pause: 550,
	});

	function typeString($target, str, cursor, delay, cb) {
		$target.html(function(_, html) {
			return html + str[cursor];
		});

		if (cursor < str.length - 1) {
			setTimeout(function() {
				typeString($target, str, cursor + 1, delay, cb);
			}, delay);
		} else {
			cb();
		}
	}

	AOS.init();

}(jQuery))