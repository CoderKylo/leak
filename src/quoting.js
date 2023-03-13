console.log("quoting script loaded");
var quoting = true;

addQuoteButtons(Array.from(document.getElementsByClassName("actionBar")));

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("actionBar-action--quote")) {
        const quotedElement = event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('bbWrapper')[0];
        let quoteText = quotedElement.innerText;

        Array.from(quotedElement.getElementsByTagName("blockquote")).forEach(element => {
            console.log(element);
            quoteText = quoteText.replace(element.innerText, '');
        })

        const user = event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('username')[0].innerText
        console.log(quoteText);
        
        let focusedField;
        if (!document.getElementsByClassName('focused-field').length) {
            let topEl = parentEl(event.target, 10)
            topEl.getElementsByClassName('input')[0].click();
            console.log('top el', topEl);
            focusedField = topEl.getElementsByClassName("fr-element")[0];
            console.log('automatically focused', focusedField);
        } else {
            focusedField = document.getElementsByClassName('focused-field')[0];
        }
        focusedField.children[focusedField.children.length - 1].innerText += `\n[quote=${user}]\n${quoteText}\n[/quote]\n`.trim();
        focusedField.focus()
    }
    if (event.target.innerText == "View previous comments…") {
        const parentEl = event.target.parentElement.parentElement;
        setTimeout(() => {
            addQuoteButtons(Array.from(parentEl.getElementsByClassName('actionBar')));
        }, 250)
    }
}, true)

document.addEventListener('focusin', (event) => {
    if (event.target.classList.contains("fr-element")) {
        document.getElementsByClassName("focused-field")[0]?.classList.remove('focused-field');
        event.target.classList.add("focused-field");
    }
}, true)

function addQuoteButtons(elements) {
    if (!Array.isArray(elements)) {
        const oldEl = elements;
        elements = [];
        elements.push(oldEl);
    }
    elements.forEach(element => {
        if (quoting && !element.getElementsByClassName('actionBar-action--quote').length) {
            let div = document.createElement("a");
            div.innerText = "Quote";
            div.className = "actionBar-action actionBar-action--quote";
    
            element.getElementsByClassName('actionBar-set--internal')[0].appendChild(div);
        }
    });
}

function parentEl (element, depth) {
    for (let i = 0; i < depth; i++) {
        element = element.parentElement;
    }
    return element;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let actionBars = [];
    message.data.forEach(element => {
        const bar = document.getElementById(element).parentElement.getElementsByClassName("actionBar")[0]
        actionBars.push(bar)
    });
    console.log(actionBars)
    addQuoteButtons(actionBars);
});
