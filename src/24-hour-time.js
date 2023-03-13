
_24Hourify(Array.from(document.getElementsByClassName('u-dt')));

function _24Hourify (elements) {
    elements.forEach(element => {
        let text = element.innerText;
        if (text.match(/at \d{1,2}:\d{1,2} [PA]M/i)) {
            const hour = (/\d{1,2}:/i).exec(text)[0].match(/\d{1,2}/);
            const pm = (text.match(/at \d{1,2}:\d{1,2} PM/i) && hour != 12) ? true : false;
            text = text.replace(/ [PA]M/i, '');
            text = hour == 12 && !pm ?
                text.replace(/ \d{1,2}:/i, ` 0:`) :
                    pm ? 
                    text.replace(/ \d{1,2}:/i, ` ${+hour + 12}:`) : 
                    text;

            const newHour = (/\d{1,2}:/i).exec(text)[0].match(/\d{1,2}/);
            text = +newHour < 10 ? text.replace(/ \d{1,2}:/i, ` 0${newHour}:`) : text;
            element.innerText = text;
        }
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let elements = [];
    message.data.forEach(element => {
        const timeEl = document.getElementById(element).parentElement.getElementsByClassName("u-dt")[0]
        elements.push(timeEl)
    });
    _24Hourify(elements);
});
