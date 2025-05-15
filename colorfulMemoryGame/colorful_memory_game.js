//Initialization of arrays and variables using given code
const colors = ["red", "blue", "green", "purple", "orange", "pink", "red", "blue", "green", "purple", "orange", "pink"];
let cards = shuffle(colors.concat(colors));
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;
//dom selection
const startbtn = document.getElementById("startbtn");
const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
/*Create the generateCards() function responsible for dynamically creating the card elements 
within the game container based on the 'cards' array that holds color values for the cards.
 This function creates the card elements dynamically within the game-container div. 
 Include given code in javaScript file after previous code. */
function generateCards() {
  for (const color of cards) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.color = color;
    card.textContent = "?";
    gameContainer.appendChild(card);
  }
}
/*The shuffle() Function is responsible for shuffling the elements of an array in random order. 
 It uses the Fisher-Yates shuffle algorithm, 
 a common method for randomizing the order of elements in an array. Include given code after generateCards() function. */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
//The handleCardClick(event) function manages the logic when a user clicks the card in the memory match game.
function handleCardClick(event) {
  const card = event.target;
  if (!card.classList.contains("card") || card.classList.contains("matched")) {
    return;
  }
  card.textContent = card.dataset.color;
  card.style.backgroundColor = card.dataset.color;
  selectedCards.push(card);
  if (selectedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}
//The checkMatch() function evaluates whether the two selected cards match each other in the memory match game.
// Include given code after handleCardClick() function.
function checkMatch() {
  const [card1, card2] = selectedCards;
  if (card1.dataset.color === card2.dataset.color) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    score += 2;
    scoreElement.textContent = `Score: ${score}`;
  } else {
    card1.textContent = "?";
    card2.textContent = "?";
    card1.style.backgroundColor = "#ddd";
    card2.style.backgroundColor = "#ddd";
  }
  selectedCards = [];
}
//The startGame() Function is a pivotal part of initializing and starting the memory match game.
// Include given code after checkMatch() function.
function startGame() {
  let timeLeft = 30;
  startbtn.disabled = true;
  score = 0; // Reset score to zero
  scoreElement.textContent = `Score: ${score}`;
  startGameTimer(timeLeft);
  cards = shuffle(colors.concat(colors));
  selectedCards = [];
  gameContainer.innerHTML = "";
  generateCards();
  gameContainer.addEventListener("click", handleCardClick);
}
/*The startGameTimer(timeLeft) function manages the game timer, 
updating the displayed time and handling the end of the game when the timer reaches zero. 
Include after startGame() Function. */
function startGameTimer(timeLeft) {
  timerElement.textContent = `Time Left: ${timeLeft}`;
  gameInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(gameInterval);
      let timeLeft = 30;
      alert("Game Over!");
      startbtn.disabled = false;
    }
  }, 1000);
}
startbtn.addEventListener("click", startGame);
