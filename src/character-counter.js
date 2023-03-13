{
  let newDiv = document.createElement("div");
  newDiv.className = "character-count";
  newDiv.innerText = "0 characters";
  
  window.addEventListener("focus", (event) => {
      if ((event.target.className ?? "").includes('fr-element') && !event.target.parentElement.getElementsByClassName('character-count')[0]) {
        event.target.parentElement.append(newDiv);
      }
    }, true);

  window.addEventListener("keydown", (event) => {
    if (event.target.classList.contains('fr-element')) {
      event.target.parentElement.getElementsByClassName('character-count')[0].innerText = `${event.target.innerText.length} characters`;
    }
  }, true);
}