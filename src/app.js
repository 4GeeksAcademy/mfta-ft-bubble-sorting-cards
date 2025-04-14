// Importamos Bootstrap y el archivo de estilos CSS
import "bootstrap";
import "./style.css";

// Definimos los rangos de las cartas (A, 2, 3, ..., K) y sus valores
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

// Definimos los palos de las cartas (♦, ♥, ♣, ♠) y sus colores
const suits = [
  { symbol: "♦", color: "red" },
  { symbol: "♥", color: "red" },
  { symbol: "♣", color: "black" },
  { symbol: "♠", color: "black" }
];

// Seleccionamos los elementos del DOM necesarios
const cardsQuantityInput = document.querySelector("#cards-quantity");
const drawButton = document.querySelector("#draw-btn");
const sortButton = document.querySelector("#sort-btn");
const originalCardsContainer = document.querySelector("#original-cards-container");
const bubbleLogContainer = document.querySelector("#bubble-log-container");

// Variables para almacenar las cartas originales, ordenadas y el registro del proceso de ordenamiento
let originalCardsValues = [];
let originalCardsElements = [];
let sortedCardsValues = [];
let sortedCardsElements = [];
let bubbleLog = [];

// Función para generar una carta aleatoria
const randomCard = () => {
  const randomRank = Math.floor(Math.random() * ranks.length); // Elegimos un rango aleatorio
  const randomSuit = Math.floor(Math.random() * suits.length); // Elegimos un palo aleatorio

  return {
    rank: ranks[randomRank],
    suit: suits[randomSuit]
  };
};

// Función para crear un elemento HTML que represente una carta
const createCardElement = (card) => {
  const cardElement = document.createElement("div"); // Creamos un div para la carta
  cardElement.className = "card"; // Asignamos la clase CSS "card"
  cardElement.innerHTML = `${card.rank.name} ${card.suit.symbol}`; // Mostramos el rango y el palo
  return cardElement;
};

// Función para dibujar cartas aleatorias en el contenedor
const drawCards = () => {
  const cardsQuantity = parseInt(cardsQuantityInput.value); // Obtenemos la cantidad de cartas a dibujar
  originalCardsValues = []; // Reiniciamos las cartas originales
  originalCardsElements = [];
  originalCardsContainer.innerHTML = ""; // Limpiamos el contenedor

  for (let i = 0; i < cardsQuantity; i++) {
    const card = randomCard(); // Generamos una carta aleatoria
    originalCardsValues.push(card); // Guardamos la carta en el arreglo
    const cardElement = createCardElement(card); // Creamos el elemento HTML de la carta
    originalCardsElements.push(cardElement); // Guardamos el elemento HTML
    originalCardsContainer.appendChild(cardElement); // Agregamos la carta al contenedor
  }
};

// Función para renderizar el registro del proceso de ordenamiento
const renderBubbleLog = () => {
  bubbleLogContainer.innerHTML = ""; // Limpiamos el contenedor del registro
  console.log("bubbleLog", bubbleLog); // Mostramos el registro en la consola para depuración

  bubbleLog.forEach((log, index) => {
    const logElement = document.createElement("div"); // Creamos un div para cada paso
    logElement.className = "d-flex gap-1"; // Asignamos clases CSS para el diseño
    logElement.innerHTML = `<strong>Step ${index + 1}:</strong>`; // Mostramos el número del paso
    log.forEach(cardElement => {
      const clonedCardElement = cardElement.cloneNode(true); // Clonamos el elemento de la carta
      logElement.appendChild(clonedCardElement); // Agregamos la carta al paso
    });
    bubbleLogContainer.appendChild(logElement); // Agregamos el paso al contenedor
  });
};

// Función para ordenar las cartas usando el algoritmo de burbuja
const sortCards = () => {
  sortedCardsValues = [...originalCardsValues]; // Copiamos las cartas originales
  sortedCardsElements = [...originalCardsElements];
  bubbleLog = []; // Reiniciamos el registro
  bubbleLogContainer.innerHTML = ""; // Limpiamos el contenedor del registro

  let n = sortedCardsValues.length;
  let swapped;

  do {
    bubbleLog.push([...sortedCardsElements]); // Guardamos el estado actual en el registro
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      // Comparamos los valores de las cartas adyacentes
      if (sortedCardsValues[i].rank.value > sortedCardsValues[i + 1].rank.value) {
        // Intercambiamos las cartas si están en el orden incorrecto
        [sortedCardsValues[i], sortedCardsValues[i + 1]] = [sortedCardsValues[i + 1], sortedCardsValues[i]];
        [sortedCardsElements[i], sortedCardsElements[i + 1]] = [sortedCardsElements[i + 1], sortedCardsElements[i]];
        bubbleLog.push([...sortedCardsElements]); // Guardamos el estado después del intercambio
        swapped = true;
      }
    }
    n--; // Reducimos el rango de comparación
    renderBubbleLog(); // Mostramos el registro actualizado
  } while (swapped);
};

// Configuramos los eventos al cargar la página
window.onload = function() {
  drawButton?.addEventListener("click", drawCards); // Evento para dibujar cartas
  sortButton?.addEventListener("click", sortCards); // Evento para ordenar cartas
};
