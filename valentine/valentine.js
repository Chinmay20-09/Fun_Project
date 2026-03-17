let noButton = document.querySelector(".negative");
let yesButton = document.querySelector(".positive");
let card = document.querySelector(".card");

let speed = 1;
let yesSize = 1;

let emojis = ["😢","😭","🥺","💔","😔","😿","😤"];

function showEmoji(){

    let emoji = document.createElement("div");

    emoji.innerText = emojis[Math.floor(Math.random()*emojis.length)];

    emoji.style.position = "fixed";
    emoji.style.left = "50%";
    emoji.style.top = "50%";
    emoji.style.transform = "translate(-50%, -50%)";
    emoji.style.fontSize = "50px";

    document.body.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    },1000);
}

noButton.addEventListener("click", function(){

  let x = Math.random() * (window.innerWidth - noButton.offsetWidth);
  let y = Math.random() * (window.innerHeight - noButton.offsetHeight);

    noButton.style.position = "absolute";
    noButton.style.left = x + "px";
    noButton.style.top = y + "px";

    yesSize += 0.2;
    yesButton.style.transform = `scale(${yesSize})`;

    showEmoji();
});

yesButton.addEventListener("click", function(){

    yesButton.style.transform = "scale(1)";

    card.style.display = "none";

    let newCard = document.createElement("div");
    newCard.className = "card";

    newCard.innerHTML = `
        <h2>Thank you ❤️</h2>
        <p>Call me 📞 😉</p>
    `;

    document.body.appendChild(newCard);
});