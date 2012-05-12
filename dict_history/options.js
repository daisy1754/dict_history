const KEY_TO_NUMBER_OF_WORDS_TO_REMEMBER = 'number_of_words_to_remember';
const KEY_TO_IF_DO_TEST = 'if_do_test';

function onload() {
	var settings = getCurrentSettings();
	displaySettings(settings);
	
	var bg = chrome.extension.getBackgroundPage();
	var wordList = bg.localStorage;
	console.log(wordList['index']);
}

function getCurrentSettings() {
	return {
		KEY_TO_NUMBER_OF_WORDS_TO_REMEMBER: localStorage[KEY_TO_NUMBER_OF_WORDS_TO_REMEMBER],
		KEY_TO_IF_DO_TEST: localStorage[KEY_TO_IF_DO_TEST]
	};
}

function displaySettings(settings){
	document.getElementById(KEY_TO_NUMBER_OF_WORDS_TO_REMEMBER).text
		= settings[KEY_TO_NUMBER_OF_WORDS_TO_REMEMBER];
	if (settings[KEY_TO_IF_DO_TEST]){
		document.getElementById('radio_do_test').checked = true;
	} else {
		document.getElementById('radio_do_test_no').checked = true;
	}
}