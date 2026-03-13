let homeX = 0;
let homeY = 0;

window.addEventListener("load", () => {
let rect = noButton.getBoundingClientRect();
homeX = rect.left;
homeY = rect.top;
});

function repelButton(cursorX, cursorY){

let rect = noButton.getBoundingClientRect();

let buttonX = rect.left + rect.width/2;
let buttonY = rect.top + rect.height/2;

let dx = buttonX - cursorX;
let dy = buttonY - cursorY;

let distance = Math.sqrt(dx*dx + dy*dy);

let safeDistance = 150;

let newX = rect.left;
let newY = rect.top;

if(distance < safeDistance){

let force = (safeDistance - distance) / safeDistance;

newX += dx * force * 2;
newY += dy * force * 2;

yesSize += 0.1;
yesButton.style.transform = `scale(${yesSize})`;

showEmoji();

}else{

/* return slowly to original position */

newX += (homeX - rect.left) * 0.05;
newY += (homeY - rect.top) * 0.05;

}

let maxX = window.innerWidth - rect.width;
let maxY = window.innerHeight - rect.height;

newX = Math.max(0, Math.min(newX, maxX));
newY = Math.max(0, Math.min(newY, maxY));

noButton.style.position = "fixed";
noButton.style.left = newX + "px";
noButton.style.top = newY + "px";

}
document.addEventListener("mousemove", e => {
repelButton(e.clientX, e.clientY);
});

document.addEventListener("touchmove", e => {
let touch = e.touches[0];
repelButton(touch.clientX, touch.clientY);
});
