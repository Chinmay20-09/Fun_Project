let noButton = document.querySelector(".negative");
let yesButton = document.querySelector(".positive");
let card = document.querySelector(".card");

let emojiCooldown = false;
let yesSize = 1;

let emojis = ["😢","😭","🥺","💔","😔","😿"];

let homeX = 0;
let homeY = 0;

let posX = 0;
let posY = 0;

let cage = 120;
let safe = 140;

/* emoji function */

function showEmoji(){

if(emojiCooldown) return;

emojiCooldown = true;

let emoji = document.createElement("div");

emoji.innerText = emojis[Math.floor(Math.random()*emojis.length)];

emoji.style.position = "fixed";
emoji.style.left = "50%";
emoji.style.top = "50%";
emoji.style.transform = "translate(-50%, -50%)";
emoji.style.fontSize = "50px";
emoji.style.pointerEvents = "none";

document.body.appendChild(emoji);

setTimeout(() => emoji.remove(),1000);

setTimeout(()=>{
emojiCooldown = false;
},2000);

}

/* store original button position */

window.addEventListener("load", ()=>{

let rect = noButton.getBoundingClientRect();

homeX = rect.left;
homeY = rect.top;

posX = homeX;
posY = homeY;

});

/* movement logic */

function update(cursorX,cursorY){

let rect = noButton.getBoundingClientRect();

let dx = posX + rect.width/2 - cursorX;
let dy = posY + rect.height/2 - cursorY;

let dist = Math.hypot(dx,dy);

if(dist < safe){

let force = (safe - dist)/safe;

posX += dx * force * 0.3;
posY += dy * force * 0.3;

yesSize += 0.05;
yesButton.style.transform = `scale(${yesSize})`;

showEmoji();

}else{

posX += (homeX - posX)*0.1;
posY += (homeY - posY)*0.1;

}

/* cage limits */

posX = Math.max(homeX-cage, Math.min(posX,homeX+cage));
posY = Math.max(homeY-cage, Math.min(posY,homeY+cage));

noButton.style.position="fixed";
noButton.style.left = posX+"px";
noButton.style.top = posY+"px";

}

/* desktop */

document.addEventListener("mousemove",e=>{
update(e.clientX,e.clientY);
});

/* mobile */

document.addEventListener("touchmove",e=>{
let t = e.touches[0];
update(t.clientX,t.clientY);
});

/* yes button */

yesButton.addEventListener("click",()=>{

yesButton.style.transform="scale(1)";

card.style.display="none";

let newCard=document.createElement("div");
newCard.className="card";

newCard.innerHTML=`
<h2>Thank you ❤️</h2>
<p>You made my day!</p>
`;

document.body.appendChild(newCard);

});
