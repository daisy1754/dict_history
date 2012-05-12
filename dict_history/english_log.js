// script that logs the searched English word.

var rawWord = getWordFromURL(location.href);

// is English word?
if (rawWord && !rawWord.match(/[^a-zA-Z\.\-\+]+/)) {
	rawWord = rawWord.replace(/\+/g, ' ');
	chrome.extension.sendRequest(rawWord);
}

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