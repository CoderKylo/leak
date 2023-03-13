{
    let extraReactions = [];
    const reactionIDs = ['', 'like', '', 'funny', 'creative', 'dislike', '', 'agree', 'disagree', 'useful', '', 'hype'];
    const reactionsDB = ['agree', "funny", "useful", "creative", "hype", "dislike", "disagree"];

    chrome.storage.local.get(["storage"], (result) => {
        console.log(result);
        extraReactions = result.storage.reactions;
        console.log(extraReactions);
        addReactions(Array.from(document.getElementsByClassName("sv-rate-menu")));
    });

    function addReactions (elements) {
        if (Array.isArray(elements)) {
            elements.forEach(element => {
                if (element.innerText != "Remove") {
                    for (let i = 0; i < extraReactions.length; i++) {
                        if (extraReactions[i] && !element.getElementsByClassName(`sv-rating-type-icon${reactionIDs.indexOf(reactionsDB[i])}`).length) {
                            let reactionID = reactionIDs.indexOf(reactionsDB[i]);
                            let reactionDiv = element.querySelector(`.actionBar-action--sv-rate`).cloneNode(true);
                            reactionDiv.classList.add('custom-extra-reaction');
                            reactionDiv.getElementsByClassName('sv-rating-type-icon')[0].className = `sv-rating-type-icon  sv-rating-type-icon${reactionID} sv-rating-type-icon--sprite sv-rating-type-icon--sprite${reactionID}  sv-rating-type--large`
                            reactionDiv.href = reactionDiv.href.substring(0, reactionDiv.href.length - 1) + reactionID;
                            element.prepend(reactionDiv);                            
                        }
                    }
                }
            });
        } else {
            element = elements;
            if (element.innerText != "Remove") {
                for (let i = 0; i < extraReactions.length; i++) {
                    if (extraReactions[i] && !element.getElementsByClassName(`sv-rating-type-icon${reactionIDs.indexOf(reactionsDB[i])}`).length) {
                        let reactionID = reactionIDs.indexOf(reactionsDB[i]);
                        let reactionDiv = element.querySelector(`.actionBar-action--sv-rate`).cloneNode(true);
                        reactionDiv.getElementsByClassName('sv-rating-type-icon')[0].className = `sv-rating-type-icon  sv-rating-type-icon${reactionID} sv-rating-type-icon--sprite sv-rating-type-icon--sprite${reactionID}  sv-rating-type--large`
                        reactionDiv.href = reactionDiv.href.substring(0, reactionDiv.href.length - 1) + reactionID;
                        element.prepend(reactionDiv);                        
                    }
                }
            }
        }
    }

    const qu = 'querySelector';
    const queryParent = (s, p) => {
    const q = (x) => document[qu](x);
    const qa = (y) => document[`${qu}All`](y);
    const pa = qa(p);
    (typeof s === 'string') && (s = q(s));
    return [...pa].filter((n) => {
        return (n.contains(s)) ? n : false;
    }).pop();
    };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let elements = [];
    message.data.forEach(element => {
        const el = document.getElementById(element).parentElement.getElementsByClassName("sv-rate-menu")[0]
        if (el) { elements.push(el) }
    });
    console.log(elements)
    addReactions(elements);
});
