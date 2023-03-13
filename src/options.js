
const reactionsDB = ['agree', "funny", "useful", "creative", "hype", "dislike", "disagree"];
let storage = {};

function saveOptions(e) {
    console.log('saving options');
    
    e.preventDefault();
    reactions = [];
    for (let i = 0; i < document.getElementsByClassName('extra-reaction').length; i++) {
        reactions.push(document.getElementsByClassName('extra-reaction')[i].checked);
    }
    storage.reactions = reactions;

    storage.quoting = document.getElementById('profile-quoting').checked;
    storage.hideRankBorders = document.getElementById("hide-rank-borders").checked;
    storage.characterCounter = document.getElementById("character-counter").checked;
    storage.uncensor = document.getElementById("uncensor").checked;
    storage.hideRelatedThreads = document.getElementById("hide-related").checked;
    storage._24Hour = document.getElementById('24-hour').checked;
    storage.hideInGameDetails = document.getElementById("hide-ign").checked;

    chrome.storage.local.set({
        storage: storage
    });
  }
  
  function restoreOptions() {
    function setCurrentChoice(result) {
        console.log(result);
        
        for (let i = 0; i < document.getElementsByClassName('extra-reaction').length; i++) {
            document.getElementsByClassName('extra-reaction')[i].checked = result.storage.reactions[i];
        }

        document.getElementById('profile-quoting').checked = result.storage.quoting;
        document.getElementById('hide-rank-borders').checked = result.storage.hideRankBorders;
        document.getElementById('character-counter').checked = result.storage.characterCounter;
        document.getElementById('uncensor').checked = result.storage.uncensor;
        document.getElementById('hide-related').checked = result.storage.hideRelatedThreads;
        document.getElementById('24-hour').checked = result.storage._24Hour;
        document.getElementById('hide-ign').checked = result.storage.hideInGameDetails;
    }
    
    //chrome.storage.local.get("reactions").then(setCurrentChoice);
    chrome.storage.local.get(["storage"], setCurrentChoice);
  }

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

