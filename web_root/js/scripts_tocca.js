// JavaScript für VIA Tocca


// function onMapPairsDrop(dropzone, draggable) {
//   $(dropzone).children('div.rightObject').prepend(draggable);
// 	$(draggable).css({top:0, left:0});
// }

function swapElement(a, b) {
  // create a temporary marker div
  var aNext = $('<div>').insertAfter(a);
  a.insertAfter(b);
  b.insertBefore(aNext);
  // remove marker div
  aNext.remove();
}

function swapContent(a, b) {

	var as = a.children();

	b.children().appendTo(a);
	as.appendTo(b);
	
}

//
// Map Pairs
//

function onMapPairsSelectionResult(correct, exerciseId) {
	var objectPair = $('#'+exerciseId).find('div.objectPair').has('div.leftObject.selected');
	var leftObject = objectPair.find('div.leftObject.selected');

	var rightObject = objectPair.find('div.rightObject');
	var newRightObject = $('#'+exerciseId).find('div.rightObject.selected');

	if (correct) {
		swapContent(rightObject, newRightObject);

		leftObject.addClass('correct');
		rightObject.addClass('correct');
	}
	$("#" + exerciseId + " div.objectPair div.selected").removeClass("selected");
}

function mapPairsCheck(exercise, callbackToCorrect) {
	if ($('#'+exercise).find('div.leftObject.selected, div.rightObject.selected').length == 2) {
		callbackToCorrect();
	}
}

function onMapPairsTapLeft(exercise, element, callbackToCorrect) {
	if (!$(element).hasClass("correct")) {
		$("div.objectPair div.leftObject").removeClass("selected");
		$(element).addClass("selected");
		mapPairsCheck(exercise, callbackToCorrect);
	}
}

function onMapPairsTapRight(exercise, element, callbackToCorrect) {
	if (!$(element).hasClass("correct")) {
		$("div.objectPair div.rightObject").removeClass("selected");
		$(element).addClass("selected");
		mapPairsCheck(exercise, callbackToCorrect);
	}
}


//
// Drag/Drop
//

function onDragDropDrop(dropzone, draggable) {
  $(dropzone).append(draggable);
	$(draggable).css({top:0, left:0});
}


//
// Text input
//

function textinput_markAsEmpty(event, elementId) {
	var element = $('#'+elementId);
	event.stopPropagation();

	element.toggleClass('markedAsEmpty');

	if (element.hasClass('markedAsEmpty')) {
		$(event.target).addClass('active');
		element.val('BLANK')
	} else {
		$(event.target).removeClass('active');
		element.val('')		
	}	
}


//
// Select many
//

function selectmany_preventTooManyChecks(regionId, buttonId, number, message) {
	if ((number > 0) && ($('#'+regionId+' input:checkbox:checked').length > number)) {
		alert(message);
		return false;
	}
	$('#'+buttonId).toggleClass('active');

	return true;
}


/**
 * Element.requestFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Element.prototype.requestFullscreen) {
	Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
	document.fullscreenElement = function () { return document.mozFullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement };
	document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
}
Element.prototype.toggleFullscreen = function () {
	if (document.fullscreenElement) { 
		document.exitFullscreen();
	} else {
		this.requestFullscreen();
	}
};



// function hello_init_custom_oauth(baseUrl) {
// 	hello.init({

// 		customoauth: {

// 			name: 'Custom OAuth',

// 			oauth: {
// 				version: 2,
// 				response_type: "code", // explicit flow, more secure for server side app
// 				auth: 'https://hepverlag-cms.grape.novu.ch/oauth/authorize',
// //				grant: (baseUrl + '/oauth/access_token'),
// 				grant: 'https://hepverlag-cms.grape.novu.ch/oauth/token' // Not needed since we do not grant in browser with hellojs?!
// 			},

// 			// Authorization scopes
// 			scope: {
// 				email: 'email',
// 				first_name: 'first_name',
// 				last_name: 'last_name',
// 			},

// 			// Refresh the access_token
// 			refresh: false,

// 			login: function(p) {

// 				// // Reauthenticate
// 				// // https://developers.facebook.com/docs/facebook-login/reauthentication
// 				// if (p.options.force) {
// 				// 	p.qs.auth_type = 'reauthenticate';
// 				// }

// 				// // Set the display value
// 				// p.qs.display = p.options.display || 'popup';
// 			},

// 			// logout: function(callback, options) {
// 			// 	// Assign callback to a global handler
// 			// 	var callbackID = hello.utils.globalEvent(callback);
// 			// 	var redirect = encodeURIComponent(hello.settings.redirect_uri + '?' + hello.utils.param({callback:callbackID, result: JSON.stringify({force:true}), state: '{}'}));
// 			// 	var token = (options.authResponse || {}).access_token;
// 			// 	hello.utils.iframe('https://www.facebook.com/logout.php?next=' + redirect + '&access_token=' + token);

// 			// 	// Possible responses:
// 			// 	// String URL	- hello.logout should handle the logout
// 			// 	// Undefined	- this function will handle the callback
// 			// 	// True - throw a success, this callback isn't handling the callback
// 			// 	// False - throw a error
// 			// 	if (!token) {
// 			// 		// If there isn't a token, the above wont return a response, so lets trigger a response
// 			// 		return false;
// 			// 	}
// 			// },

// 			// API Base URL
// 			base: baseUrl,

// 			// // Map GET requests
// 			// get: {
// 			// 	me: 'me?fields=email,first_name,last_name,name,timezone,verified',
// 			// 	'me/friends': 'me/friends',
// 			// 	'me/following': 'me/friends',
// 			// 	'me/followers': 'me/friends',
// 			// 	'me/share': 'me/feed',
// 			// 	'me/like': 'me/likes',
// 			// 	'me/files': 'me/albums',
// 			// 	'me/albums': 'me/albums?fields=cover_photo,name',
// 			// 	'me/album': '@{id}/photos?fields=picture',
// 			// 	'me/photos': 'me/photos',
// 			// 	'me/photo': '@{id}',
// 			// 	'friend/albums': '@{id}/albums',
// 			// 	'friend/photos': '@{id}/photos'

// 			// 	// Pagination
// 			// 	// Https://developers.facebook.com/docs/reference/api/pagination/
// 			// },

// 			// // Map POST requests
// 			// post: {
// 			// 	'me/share': 'me/feed',
// 			// 	'me/photo': '@{id}'

// 			// 	// Https://developers.facebook.com/docs/graph-api/reference/v2.2/object/likes/
// 			// },

// 			// wrap: {
// 			// 	me: formatUser,
// 			// 	'me/friends': formatFriends,
// 			// 	'me/following': formatFriends,
// 			// 	'me/followers': formatFriends,
// 			// 	'me/albums': format,
// 			// 	'me/photos': format,
// 			// 	'me/files': format,
// 			// 	'default': format
// 			// },

// 			// // Special requirements for handling XHR
// 			// xhr: function(p, qs) {
// 			// 	if (p.method === 'get' || p.method === 'post') {
// 			// 		qs.suppress_response_codes = true;
// 			// 	}

// 			// 	// Is this a post with a data-uri?
// 			// 	if (p.method === 'post' && p.data && typeof (p.data.file) === 'string') {
// 			// 		// Convert the Data-URI to a Blob
// 			// 		p.data.file = hello.utils.toBlob(p.data.file);
// 			// 	}

// 			// 	return true;
// 			// },

// 			// // Special requirements for handling JSONP fallback
// 			// jsonp: function(p, qs) {
// 			// 	var m = p.method;
// 			// 	if (m !== 'get' && !hello.utils.hasBinary(p.data)) {
// 			// 		p.data.method = m;
// 			// 		p.method = 'get';
// 			// 	}
// 			// 	else if (p.method === 'delete') {
// 			// 		qs.method = 'delete';
// 			// 		p.method = 'post';
// 			// 	}
// 			// },

// 			// // Special requirements for iframe form hack
// 			// form: function(p) {
// 			// 	return {
// 			// 		// Fire the callback onload
// 			// 		callbackonload: true
// 			// 	};
// 			// }
// 		}
// 	});

// //	var base = 'https://graph.facebook.com/';

// 	// function formatUser(o) {
// 	// 	if (o.id) {
// 	// 		o.thumbnail = o.picture = 'https://graph.facebook.com/' + o.id + '/picture';
// 	// 	}

// 	// 	return o;
// 	// }

// 	// function formatFriends(o) {
// 	// 	if ('data' in o) {
// 	// 		o.data.forEach(formatUser);
// 	// 	}

// 	// 	return o;
// 	// }

// 	// function format(o, headers, req) {
// 	// 	if (typeof o === 'boolean') {
// 	// 		o = {success: o};
// 	// 	}

// 	// 	if (o && 'data' in o) {
// 	// 		var token = req.query.access_token;

// 	// 		if (!(o.data instanceof Array)) {
// 	// 			var data = o.data;
// 	// 			delete o.data;
// 	// 			o.data = [data];
// 	// 		}

// 	// 		o.data.forEach(function(d) {

// 	// 			if (d.picture) {
// 	// 				d.thumbnail = d.picture;
// 	// 			}

// 	// 			d.pictures = (d.images || [])
// 	// 				.sort(function(a, b) {
// 	// 					return a.width - b.width;
// 	// 				});

// 	// 			if (d.cover_photo && d.cover_photo.id) {
// 	// 				d.thumbnail = base + d.cover_photo.id + '/picture?access_token=' + token;
// 	// 			}

// 	// 			if (d.type === 'album') {
// 	// 				d.files = d.photos = base + d.id + '/photos';
// 	// 			}

// 	// 			if (d.can_upload) {
// 	// 				d.upload_location = base + d.id + '/photos';
// 	// 			}
// 	// 		});
// 	// 	}

// 	// 	return o;
// 	// }

// }

// function login_custom_oauth() {
// 	var oauth = hello('customoauth');
// 	var url = '/hellojs.html';
	
// 	oauth.login({display: 'popup', redirect_uri: url, scope: 'email'}, function(auth) {
		
// 		oauth.api('me').then(function(json) {
// 			window.location.href = window.location.pathname+"?"+$.param({"access_token": auth.authResponse.access_token, "network": auth.authResponse.network, "first_name": json.first_name, "last_name": json.last_name, "email": json.email});
// 		});
// 	});
// }


// Work globally with some objects in a context. Used globally in the first place,
// but also when content is being loaded partially
function processHtmlDocument(contextElement) {
	$('.popover', contextElement).webuiPopover({trigger:'hover', placement:'auto'});
	$('span.dictionaryEntry', contextElement).webuiPopover({trigger:'hover', placement:'auto-top'});

  $('textarea', contextElement).autosize();

	if ( ! (typeof JoelPurra === 'undefined') ) {
		$('input.clozeTextPlaceholder', contextElement).plusAsTab();
	}
}

// Scroll a given task title to the nice top position
function scrollToExerciseTask(taskTitleElement) {
	
	const navElement = $(taskTitleElement).closest('div.VIATocModuleExerciser').find('div.moduleNavigation').get(0);
	const rect = navElement.getBoundingClientRect();
	const targetPosition = rect.top + rect.height + 5;
	const elementPosition = $(taskTitleElement).offset().top;

//	console.log(targetPosition);
	
	window.scroll({behavior: 'smooth', top: (elementPosition - targetPosition) });

}


/* Haupt JS init */
$(document).ready(function(){

	if ( ! (typeof JoelPurra === 'undefined') ) {
		JoelPurra.PlusAsTab.setOptions({
			// Use the enter key as tab keys
			key: [13]
		});
	}

	processHtmlDocument(document);
	
	// Lazy load von Bildern installieren
	// Brauchen wir im Moment nicht im Frontend
	// setLazy();
	// lazyLoad();
	// $(window).on('scroll', lazyLoad);
	
});
