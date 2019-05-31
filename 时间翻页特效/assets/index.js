function main() {
	updateTime();
}

function updateTime() {
	var currentTime, seconds, minutes, hours, times, i;
	currentTime = new Date();
	times = {
		'second': currentTime.getSeconds(),
		'minute': currentTime.getMinutes(),
		'hour': currentTime.getHours()
	};
	for(type in times) {
		if(times.hasOwnProperty(type)) {
			setTimes(type, timeToString(times[type]));
		}
	}
	setTimeout(updateTime, 1000);
}

function timeToString(currentTime) {
	var t;
	t = currentTime.toString();
	if(t.length === 1) {
		return '0' + t;
	}
	return t;
}

function getPreviousTime(type) {
	return $('#' + type + '-top').text();
}

function setTimes(type, timeStr) {
	setTime(getPreviousTime(type + '-tens'),
		timeStr[0], type + '-tens');
	setTime(getPreviousTime(type + '-ones'),
		timeStr[1], type + '-ones');
}

function setTime(previousTime, newTime, type) {
	if(previousTime === newTime) {
		return;
	}
	setTimeout(function() {
		$('#' + type + '-top').text(newTime);
	}, 150);
	setTimeout(function() {
		$('.bottom-container',
			$('#' + type + '-bottom')).text(newTime);
	}, 365);
	animateTime(previousTime, newTime, type);
}

function animateTime(previousTime, newTime, type) {
	var top, bottom;
	top = $('#top-' + type + '-anim');
	bottom = $('#bottom-' + type + '-anim');
	$('.top-half-num', top).text(previousTime);
	$('.dropper', bottom).text(newTime);
	top.show();
	bottom.show();
	$('#top-' + type + '-anim').css('visibility', 'visible');
	$('#bottom-' + type + '-anim').css('visibility', 'visible');
	animateNumSwap(type);
	setTimeout(function() {
		hideNumSwap(type);
	}, 365);
}

function animateNumSwap(type) {
	$('#top-' + type + '-anim').toggleClass('up');
	$('#bottom-' + type + '-anim').toggleClass('down');
}

function hideNumSwap(type) {
	$('#top-' + type + '-anim').toggleClass('up');
	$('#bottom-' + type + '-anim').toggleClass('down');
	$('#top-' + type + '-anim').css('visibility', 'hidden');
	$('#bottom-' + type + '-anim').css('visibility', 'hidden');
}

$(document).ready(main);

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		}
})();