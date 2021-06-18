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
