import { getDiv, getImg } from "./element.js";

const option = getDiv("option");
const disk = getImg("icon");
const selector = getImg("selector");

function toBoot() {
    option.style.display = "none";
    setTimeout(() => {
        window.location = "./?nowait=true";
    }, 750);
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        toBoot();
    }
});

disk.addEventListener("click", toBoot);
selector.addEventListener("click", toBoot);