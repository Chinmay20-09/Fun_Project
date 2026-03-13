let noButton = document.querySelector(".negative");
let yesButton = document.querySelector(".positive");
let card = document.querySelector(".card");

let yesSize = 1;

let emojis = ["😢","😭","🥺","💔","😔","😿"];

let homeX = 0;
let homeY = 0;

let posX = 0;
let posY = 0;

let cageSize = 120;

function showEmoji(){

let emoji = document.createElement("div");

emoji.innerText = emojis[Math.floor(Math.random()*emojis.length)];

emoji.style.position = "fixed";
emoji.style.left = "50%";
emoji.style.top = "50%";
emoji.style.transform = "translate(-50%, -50%)";
emoji.style.fontSize = "50px";
emoji.style.pointerEvents = "none";

document.body.appendChild(emoji);

setTimeout(() => {
emoji.remove();
},1000);

}

window.addEventListener("load", () => {

let rect = noButton.getBoundingClientRect();

homeX = rect.left;
homeY = rect.top;

posX = homeX;
posY = homeY;

});

function repelButton(cursorX, cursorY){

let rect = noButton.getBoundingClientRect();

let centerX = posX + rect.width/2;
let centerY = posY + rect.height/2;

let dx = centerX - cursorX;
let dy = centerY - cursorY;

let distance = Math.sqrt(dx*dx + dy*dy);

let safe = 140;

if(distance < safe){

let force = (safe - distance) / safe;

posX += dx * force * 0.4;
posY += dy * force * 0.4;

yesSize += 0.05;
yesButton.style.transform = `scale(${yesSize})`;

showEmoji();

}else{

posX += (homeX - posX) * 0.1;
posY += (homeY - posY) * 0.1;

}

let minX = homeX - cageSize;
let maxX = homeX + cageSize;
let minY = homeY - cageSize;
let maxY = homeY + cageSize;

posX = Math.max(minX, Math.min(posX, maxX));
posY = Math.max(minY, Math.min(posY, maxY));

noButton.style.position = "fixed";
noButton.style.left = posX + "px";
noButton.style.top = posY + "px";

}

/* Desktop */
document.addEventListener("mousemove", e => {
repelButton(e.clientX, e.clientY);
});

/* Mobile */
document.addEventListener("touchmove", e => {
let touch = e.touches[0];
repelButton(touch.clientX, touch.clientY);
});

/* Yes button */
yesButton.addEventListener("click", function(){

yesButton.style.transform = "scale(1)";

card.style.display = "none";

let newCard = document.createElement("div");
newCard.className = "card";

newCard.innerHTML = `
<h2>Thank you ❤️</h2>
<p>You made my day!</p>
`;

document.body.appendChild(newCard);

});
