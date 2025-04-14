import "bootstrap";
import "./style.css";

const ranks = [
  { name: "A", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "J", value: 11 },
  { name: "Q", value: 12 },
  { name: "K", value: 13 }
];

const suits = [
  { symbol: "♦", color: "red" },
  { symbol: "♥", color: "red" },
  { symbol: "♣", color: "black" },
  { symbol: "♠", color: "black" }
];

const cardsQuantityInput = document.querySelector("#cards-quantity");
const drawButton = document.querySelector("#draw-btn");
const sortButton = document.querySelector("#sort-btn");
const originalCardsContainer = document.querySelector("#original-cards-container");
const bubbleLogContainer = document.querySelector("#bubble-log-container");

let originalCardsValues = [];
let originalCardsElements = [];
let sortedCardsValues = [];
let sortedCardsElements = [];
let bubbleLog = [];

const randomCard = () => {
  const randomRank = Math.floor(Math.random() * ranks.length);
  const randomSuit = Math.floor(Math.random() * suits.length);

  return {
    rank: ranks[randomRank],
    suit: suits[randomSuit]
  };
}

const createCardElement = (card) => {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.innerHTML = `${card.rank.name} ${card.suit.symbol}`;
  return cardElement;
}

const drawCards = () => {
  const cardsQuantity = parseInt(cardsQuantityInput.value);
  originalCardsValues = [];
  originalCardsElements = [];
  originalCardsContainer.innerHTML = "";

  for (let i = 0; i < cardsQuantity; i++) {
    const card = randomCard();
    originalCardsValues.push(card);
    const cardElement = createCardElement(card);
    originalCardsElements.push(cardElement);
    originalCardsContainer.appendChild(cardElement);
  }
}

const renderBubbleLog = () => {
  bubbleLogContainer.innerHTML = "";
  console.log("bubbleLog", bubbleLog);
  
  bubbleLog.forEach((log, index) => {
    const logElement = document.createElement("div");
    logElement.className = "d-flex gap-1";
    logElement.innerHTML = `<strong>Step ${index + 1}:</strong>`;
    log.forEach(cardElement => {
      const clonedCardElement = cardElement.cloneNode(true);
      logElement.appendChild(clonedCardElement);
    });
    bubbleLogContainer.appendChild(logElement);
  });
}

const sortCards = () => {
  sortedCardsValues = [...originalCardsValues];
  sortedCardsElements = [...originalCardsElements];
  bubbleLog = [];
  bubbleLogContainer.innerHTML = "";

  let n = sortedCardsValues.length;
  let swapped;

  do {
    bubbleLog.push([...sortedCardsElements]);
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (sortedCardsValues[i].rank.value > sortedCardsValues[i + 1].rank.value) { 
        [sortedCardsValues[i], sortedCardsValues[i + 1]] = [sortedCardsValues[i + 1], sortedCardsValues[i]];
        [sortedCardsElements[i], sortedCardsElements[i + 1]] = [sortedCardsElements[i + 1], sortedCardsElements[i]];
        bubbleLog.push([...sortedCardsElements]);
        swapped = true;
      }
    }
    n--;
    renderBubbleLog();
  } while (swapped);
}




window.onload = function() {
  //write your code here
  drawButton?.addEventListener("click", drawCards);
  sortButton?.addEventListener("click", sortCards);
};
