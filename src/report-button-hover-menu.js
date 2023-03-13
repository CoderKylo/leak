function addReportButton(tooltip) {
    const actions = tooltip.querySelector(".memberTooltip-actions");
    actions.append(actions.lastElementChild.cloneNode(true))
    actions.lastElementChild.getElementsByClassName("button--link")[0].href = tooltip.getElementsByClassName("username")[0].href + "report"
    actions.lastElementChild.getElementsByClassName("button-text")[0].innerText = "Report"
}

let bodyObserver = new MutationObserver((mutations) => {
    mutations[0].addedNodes.forEach((tooltip) => {
        console.log(tooltip);
        if (!tooltip.className.includes("tooltip")) { return }
        if (tooltip.getElementsByClassName("memberTooltip-headerAction")[0]) { return }
        else if (tooltip.getElementsByClassName("memberTooltip-actions")[0]) {
            addReportButton(tooltip)
        } else {
            let tooltipObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach(() => {
                        if (tooltip.getElementsByClassName("memberTooltip-headerAction")[0]) { return }
                        addReportButton(mutation.target.parentElement)
                    })
                })
            })
            tooltipObserver.observe(tooltip.getElementsByClassName("tooltip-content")[0], {childList:true})
        }
    });
})

bodyObserver.observe(document.body, {childList:true});