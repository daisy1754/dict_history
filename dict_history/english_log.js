// script that logs the searched English word.

console.log(location.href);

var url = location.href;
var rawWord = '';
if (url.search('eow.alc') > 0) {
	rawWord = url.split('/')[3];
} else if (url.search('weblio.jp') > 0) {
	rawWord = url.split('/')[4];
} else if (url.search('dictionary.goo') > 0) {
	rawWord = url.split('/')[5];
} else if (url.search('ldoceonline') > 0) {
	var query = window.location.search.substring(1);
	var params = query.split('&');
	for (var i=0; i<params.length; i++) {
		var getParam = params[i].split('=');
		if (getParam[0] == 'q') {
			rawWord = getParam[1];
			break;
		}
	}
} else if (url.search('excite.co.jp') > 0) {
	var query = window.location.search.substring(1);
	var params = query.split('&');
	for (var i=0; i<params.length; i++) {
		var getParam = params[i].split('=');
		if (getParam[0] == 'search') {
			rawWord = getParam[1];
			break;
		}
	}
}

// is English word?
if (!rawWord.match(/[^a-zA-Z\.\-\+]+/)) {
	rawWord = rawWord.replace(/\+/g, ' ');
	chrome.extension.sendRequest(rawWord);
}