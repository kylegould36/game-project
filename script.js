//Declare variables
var dealerSum = 0;
var yourSum = 0;
var dealerAceCount = 0;
var yourAceCount = 0;
var hidden;
var deck;
var canHit = true;

//Start up functions
window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

//Build arrays containing the card vaules: number/suits
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"];
    let suits = ["C", "D", "H", "S"];
    deck = [];

//Loop through arrays
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + suits[i]);
        }
    }
}

//Random cards
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while(dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);

}

//Function for hit
function hit() {
    if(!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if(reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
    }
}

//Function for stand
function stand() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src="./cards/" + hidden + ".png";

//Output results
    let message = "";
    if(yourSum > 21 && dealerSum <= 21) {
        message = "Bust! Dealer wins!";
    } else if(yourSum == 21 && dealerSum < yourSum) {
        message = "Blackjack! You win!";
    } else if(yourSum <= 21 && dealerSum < yourSum) {
        message = "Winner!";
    } else if(dealerSum <= 21 && yourSum > dealerSum) {
        message = "Loser! Dealer wins!";
    } else if(dealerSum == yourSum) {
        message = "Tie!";
    } else if(dealerSum == 21 && yourSum < dealerSum) {
        message = "Dealer has Blackjack! You lose!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

//Value of cards: values/suits
function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value)) {
        if(value == "A") {
            return 11;
        } else {
            return 10;
        }
    }

    return parseInt(value);
}

//Is card an ace
function checkAce(card) {
    if(card[0] == "A") {
        return 1;
    } else {
        return 0;
    }
}

//Calculating ace
function reduceAce(playerSum, playerAceCount) {
    while(playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

//Restart game
document.querySelector('#restart').addEventListener("click", function() {
    window.location.reload();
    return false;
});