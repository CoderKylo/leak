console.log('ready state: ', document.readyState);
Array.from(document.getElementsByClassName('bbCodeSpoiler-button')).forEach(element => {
    if (element.children[0].children[0].children.length) {
        element.children[0].children[0].childNodes[0].nodeValue = '';
    }
});

console.log('ready state: ', document.readyState);
