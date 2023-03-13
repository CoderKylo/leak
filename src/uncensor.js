document.addEventListener('DOMContentLoaded', () => {
    Uncensor(Array.from(document.getElementsByClassName('message-userContent')));
});

function Uncensor(elements) {
    elements.forEach ((element) => {
        element.innerHTML = element.innerHTML.replaceAll('****post', "shitpost");
    })
}