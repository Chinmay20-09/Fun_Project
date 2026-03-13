let noButton = document.querySelector(".negative");
let yesButton = document.querySelector(".positive");
let card = document.querySelector(".card");

let yesSize = 1;

let emojis = ["😢","😭","🥺","💔","😔","😿"];

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

let moving = false;

function moveNoButton(){

if(moving) return;
moving = true;

noButton.style.pointerEvents = "none";

let maxX = window.innerWidth - noButton.offsetWidth;
let maxY = window.innerHeight - noButton.offsetHeight;

let x = Math.random() * maxX;
let y = Math.random() * maxY;

noButton.style.position = "fixed";
noButton.style.left = x + "px";
noButton.style.top = y + "px";

yesSize += 0.2;
yesButton.style.transform = `scale(${yesSize})`;

showEmoji();

setTimeout(() => {
moving = false;
noButton.style.pointerEvents = "auto";
}, 250);  // match transition time
}

// Desktop escape
noButton.addEventListener("mouseover", moveNoButton);
//Mobile escape
document.addEventListener("touchmove", function(e){

let touch = e.touches[0];
let rect = noButton.getBoundingClientRect();

let dx = Math.abs(touch.clientX - rect.left);
let dy = Math.abs(touch.clientY - rect.top);

if(dx < 120 && dy < 120){
moveNoButton();
}

});

// Yes button logic
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
