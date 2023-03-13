let jumpButton = document.createElement('a');
jumpButton.className = 'button--link button';
jumpButton.href = `/goto/post?id=${document.getElementsByClassName('message-attribution-opposite')[1].lastElementChild.firstElementChild.href.substring(document.getElementsByClassName('message-attribution-opposite')[1].lastElementChild.firstElementChild.href.length-8, document.getElementsByClassName('message-attribution-opposite')[1].lastElementChild.firstElementChild.href.length)}`;
jumpButton.setAttribute('data-xf-click', "attribution");
jumpButton.setAttribute("data-content-selector", `#post-${document.getElementsByClassName('message-attribution-opposite')[1].lastElementChild.firstElementChild.href.substring(document.getElementsByClassName('message-attribution-opposite')[1].lastElementChild.firstElementChild.href.length-8, document.getElementsByClassName('message-attribution-opposite')[1].lastElementChild.firstElementChild.href.length)}`)

let child = document.createElement("span");
child.textContent = ' Jump to replies ';
child.className = 'button-text';
jumpButton.appendChild(child);

document.getElementsByClassName("buttonGroup")[0].prepend(jumpButton);