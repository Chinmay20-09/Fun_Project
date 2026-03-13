let noButton = document.querySelector(".negative");
let yesButton = document.querySelector(".positive");
let card = document.querySelector(".card");

let yesSize = 1;
let moving = false;

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

function repelButton(cursorX, cursorY){

    if(moving) return;

    let rect = noButton.getBoundingClientRect();

    let buttonX = rect.left + rect.width / 2;
    let buttonY = rect.top + rect.height / 2;

    let dx = buttonX - cursorX;
    let dy = buttonY - cursorY;

    let distance = Math.sqrt(dx*dx + dy*dy);

    let safeDistance = 150;

    if(distance < safeDistance){

        moving = true;

        let force = (safeDistance - distance) / safeDistance;

        let moveX = dx * force * 2;
        let moveY = dy * force * 2;

        let newX = rect.left + moveX;
        let newY = rect.top + moveY;

        let maxX = window.innerWidth - rect.width;
        let maxY = window.innerHeight - rect.height;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        noButton.style.position = "fixed";
        noButton.style.left = newX + "px";
        noButton.style.top = newY + "px";

        yesSize += 0.15;
        yesButton.style.transform = `scale(${yesSize})`;

        showEmoji();

        setTimeout(() => {
            moving = false;
        },150);
    }
}

/* Desktop */
document.addEventListener("mousemove", function(e){
    repelButton(e.clientX, e.clientY);
});

/* Mobile */
document.addEventListener("touchmove", function(e){
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
