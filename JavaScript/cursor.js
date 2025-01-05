const cursor = document.createElement("img");
cursor.src = "../Image/Cursor.svg";
cursor.style.width = "256px";
cursor.style.height = "256px";
cursor.style.transition = "transform 0.2s ease";
cursor.style.position = "fixed";
cursor.style.top = "10px";
cursor.style.left = "10px";
cursor.style.transformOrigin = "left top";
cursor.style.transform = "scale(0.1)";
cursor.style.pointerEvents = "none";
cursor.style.zIndex = 2048;

let lastX;
let lastY;
let lastTime;
let idleTimer;

window.addEventListener("mousemove", (e) => {
    const currentX = e.clientX;
    const currentY = e.clientY;
    const currentTime = new Date().getTime();

    if (lastTime > 0) {
        const distance = Math.sqrt((currentX - lastX) ** 2 + (currentY - lastY) ** 2);
        const timeDiff = currentTime - lastTime;
        speed = distance / timeDiff;

        if (speed > 10) {
            cursor.style.transform = "scale(0.5)";
        }
    }

    lastX = currentX;
    lastY = currentY;
    lastTime = currentTime;

    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";

    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        cursor.style.transform = "scale(0.1)";
    }, 200);
});

document.body.appendChild(cursor);