// script that logs the searched English word.

const KEY_CODE_E = 69;
const KEY_CODE_R = 82;
const KEY_CODE_T = 84;
const POPUP_MSEC = 1000;

var popup = undefined;
var rawWord = getWordFromURL(location.href);

// is English word?
if (rawWord && !rawWord.match(/[^a-zA-Z\.\-\+]+/)) {
	rawWord = rawWord.replace(/\+/g, ' ');
	chrome.extension.sendRequest('add:' + rawWord);
}

document.addEventListener('keydown', keyDownListener);
var commandStarted = false;

function getWordFromURL(url) {
	if (url.search('eow.alc.co.jp/search?') > 0) {
		return getParameter('q');
	} else if (url.search('eow.alc') > 0) {
		return url.split('/')[3];
	} else if (url.search('weblio.jp') > 0) {
		return url.split('/')[4];
	} else if (url.search('dictionary.goo') > 0) {
		return url.split('/')[5];
	} else if (url.search('ldoceonline') > 0) {
		return getParameter('q');
	} else if (url.search('excite.co.jp') > 0) {
		return getParameter('search');
	}
	return null;
}

function getParameter(key) {
	var query = window.location.search.substring(1);
	var params = query.split('&');
	for (var i=0; i<params.length; i++) {
		var getParam = params[i].split('=');
		if (getParam[0] == key) {
			return getParam[1];
		}
	}
	return null;
}

function keyDownListener(event) {
	if (!commandStarted) {
		if (event.keyCode == KEY_CODE_E && event.ctrlKey && event.shiftKey) {
			console.log("command start");
			commandStarted = true;
			showPopupItem("Dict history loggerコマンド一覧");
			event.preventDefault();
		}
	} else {
		if (event.keyCode == KEY_CODE_R) {
			var rawWord = getWordFromURL(location.href);
			if (rawWord && !rawWord.match(/[^a-zA-Z\.\-\+]+/)) {
				rawWord = rawWord.replace(/\+/g, ' ');
				chrome.extension.sendRequest('remove:' + rawWord);
				showPopupItem("'" + rawWord + "' がログから取り除かれました．");
			} else {
				dismissPopupItem();
			}
		} else if (event.keyCode == KEY_CODE_T){
			// TODO: register as test.
		} else {
			dismissPopupItem();
		}
		commandStarted = false;
		event.preventDefault();
	}
}

function showPopupItem(message, durationInMillis) {
	if (typeof popup == 'undefined') {
		popup = document.createElement('div');
		popup.width = '200px';
		popup.height = '500px';
		popup.style['background-color'] = '#cfcfdf';
		popup.style['z-index'] = 10;
		popup.style.border = '3px solid #bfbfcf';
		popup.style.position = 'absolute';
		popup.style.top = 0;
		popup.style.right = 0;
		popup.style.padding = '0.8em';
		document.body.appendChild(popup);
		
		if (popup.timer) {
			clearTimeout(popup.timer);
		}
		
	} else {
		popup.style.display = 'block';
	}
	
	if (durationInMillis > 0) {
		popup.timer = setTimeout(dismissPopupItem, durationInMillis);
	}

	popup.innerHTML = message;
}

function dismissPopupItem() {
	popup.timer = undefined;
	popup.style.display = 'none';
}