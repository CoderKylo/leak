setup()

function mutation (mutation) {
    console.log(mutation)
    let IDList = []
    mutation.forEach(element => {
        element.addedNodes.forEach(node => {
            if (node && node.children && node.children[0].id && node.children[0].length) {
                IDList.push(node.children[0].id)
            }
        });
    });
    chrome.runtime.sendMessage({
        type:"addedNodes", 
        data: IDList
    })
}

function setup() {
    let observer = new MutationObserver(mutation);
    document.querySelectorAll(".js-replyNewMessageContainer, .js-messageResponses").forEach((element) => {
        observer.observe(element, {childList: true});
    })
}