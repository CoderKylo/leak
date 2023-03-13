{
    chrome.storage.session.get(['go-to-reply'], function(items) {
        if (!items["go-to-reply"]) {return}
        const reply = items["go-to-reply"]
        chrome.storage.session.set({"go-to-reply":null})
        window.location.href = "https://hypixel.net/goto/post?id=" + document.getElementsByClassName("message-attribution-opposite")[(reply % 20) - 1].lastElementChild.firstElementChild.href.match(/(?<=post-)\d+/)[0]
    });
  
    let bodyObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                console.log(node);
                if (!node.classList.contains("menu--pageJump") || node.classList.contains("menu-go-to-reply")) { return }
                node.classList.add("menu-go-to-reply")
                node.appendChild(node.lastElementChild.cloneNode(true));
                const el = node.lastElementChild
                el.style = "border-top: 1px solid #5b5b5b;"
                el.querySelector(".menu-header").innerText = "Go to reply"
                el.querySelectorAll(".inputNumber-button").forEach(element => { element.remove() });
                el.querySelector(".inputNumber").appendChild(document.createElement("div"))
                el.querySelector(".js-pageJumpGo").addEventListener("click", () => {
                    chrome.storage.session.set({"go-to-reply":el.querySelector(".js-numberBoxTextInput").value})
                    window.location.href = node.querySelector(".menu-row").getAttribute("data-page-url").replace("%page%", Math.floor(el.querySelector(".js-numberBoxTextInput").value / 20 + 1))
                })
                el.querySelector(".js-pageJumpGo").className = "button"
                
                console.log("done");
            })
        });
    })
    bodyObserver.observe(document.body, {childList:true});
}