console.log('background starting');
let storage;
let injected;
chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
chrome.webNavigation.onCommitted.addListener(function(details) {
	console.log("storage", storage);
	if (!details.url.match('hypixel.net') || details.parentFrameId != -1) {
		return;
	}
    
	let scripts = ["mutationObserver.js", "message-listener.js", "report-button-hover-menu.js", "go-to-reply.js"];
	let styles = [];

	const postingLocation = details.url.match("hypixel.net/threads/") || details.url.match("hypixel.net/members") || details.url.match("hypixel.net/whats-new/profile-posts") || details.url.match("hypixel.net/conversations/") ? true : false;

	if (storage._24Hour) {
		scripts.push("24-hour-time.js");
	}
	if (details.url.match("hypixel.net/threads/") && storage.hideRelatedThreads) {
		styles.push('styles/hide-related-threads.css');
	}
	if (postingLocation) {
		scripts.push('remove-spoiler-watermark.js');
	}
	if ( (details.url.match("hypixel.net/threads/")) && !details.url.match(/\/page\-[0-9]/)) {
		scripts.push('jump-to-replies.js');
	}
	if (storage.quoting && ( details.url.match("hypixel.net/members") || details.url.match("hypixel.net/whats-new/profile-posts") )) {
		scripts.push('quoting.js');
		
	}
	if (storage.characterCounter) {
		scripts.push('character-counter.js');
	}
	if (storage.hideRankBorders) {
    	styles.push('styles/rank-border-remover.css');
	}
	if (storage.reactions.filter(Boolean).length) {
		scripts.push('extraReactions.js')
	}
	if (storage.hideInGameDetails && ( details.url.match("hypixel.net/threads/") || details.url.match("hypixel.net/conversations/")) ) {
		styles.push("styles/hide-ign.css");
	}
	if (scripts.length) {
		chrome.scripting.executeScript({
			target: {
				tabId: details.tabId
			},
			files: scripts,
		});
	}
	if (styles.length) {
		chrome.scripting.insertCSS({
			target: {
				tabId: details.tabId
			},
			files: styles,
		});
	}

	injected = true;
		
  
	console.log('inserted scripts');
	console.log("ip grabbed trolololol LMAOOOOOOOOOOOOOOOOOOOOOOOOOO (joke ily)")
});

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.get(["storage"], (result) => {
		if (result.storage) {
			return;
		}

		const storage = {
			reactions: [false, false, false, false, false, true, false],
			quoting: true,
			hideRankBorders: true,
			characterCounter: true,
			uncensor: false,
			hideRelatedThreads: true,
			_24Hour: false,
			hideInGameDetails: false
		};

		chrome.storage.local.set({storage: storage});
	})
})

/* chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: {
			tabId: tab.id,
		},
		files: ["upload-image.js"],
	});
	//chrome.runtime.openOptionsPage();
}); */

chrome.storage.local.get(["storage"], (result) => {
	storage = result.storage;
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	chrome.tabs.sendMessage(sender.tab.id, message)
});
