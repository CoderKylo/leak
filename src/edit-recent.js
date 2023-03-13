console.log('edit recent running')

document.addEventListener('submit', (event) => {
    console.log('target is ', event.target);
    if (event.target.className.includes('comment')) {
        if (window.location.href.includes('hypixel.net/members')) {
            postId = event.target.action.substring(14, 21);
            document.getElementsByClassName('last-posted-message')?.[0]?.classList.remove('last-posted-message');
            
            setTimeout(() => {
                getParent(event.target, 2).getElementsByClassName('comment')[getParent(event.target, 2).getElementsByClassName('comment').length - 2].classList.add ('last-posted-message');
                console.log(getParent(event.target, 2).getElementsByClassName('comment')[getParent(event.target, 2).getElementsByClassName('comment').length - 2]);//.classList.add("last-posted-message");
            }, 800);
        }
    }
}, true);

window.addEventListener('keydown', (event) => {
    if (event.key == "ArrowRight") {
        document.getElementsByClassName('last-posted-message')[0].getElementsByClassName('actionBar-action--edit')[0].click();
    }
});

function getParent(element, level) {
    for (let i = 0; i < level; i++) {
        element = element.parentElement;
    }
    return element
}