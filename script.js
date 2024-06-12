let humanScore = 0;
let computerScore = 0;
let round = 0;
let timeLeft = 10;
let countdown;

const roundDisplay = document.getElementById("roundDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const playerHealth = document.getElementById("playerHealth");
const computerHealth = document.getElementById("computerHealth");

const rockButton = document.getElementById("rockBtn");
const paperButton = document.getElementById("paperBtn");
const scissorButton = document.getElementById("scissorBtn");
const resetButton = document.getElementById("resetBtn");

rockButton.addEventListener("click", function () {
  animateChoice(rockButton);
  playGame("rock");
});

paperButton.addEventListener("click", function () {
  animateChoice(paperButton);
  playGame("paper");
});

scissorButton.addEventListener("click", function () {
  animateChoice(scissorButton);
  playGame("scissor");
});

resetButton.addEventListener("click", function () {
  clearInterval(countdown);
  restartGame();
});

function updateTimer() {
  timerDisplay.textContent = `${timeLeft}`;
  if (timeLeft === 0) {
    clearInterval(countdown);
    timerDisplay.textContent = `Time's up, you didn't make a choice!`;
    disableButtons();
    selectRandomChoice();

    return;
  }

  timeLeft--;
}

function startCountdown() {
  clearInterval(countdown);
  timeLeft = 10;
  updateTimer();
  countdown = setInterval(updateTimer, 1000);
}

function selectRandomChoice() {
  clearInterval(countdown);
  const randomChoice = getComputerChoice();
  if (randomChoice === "rock") {
    rockButton.click();
  } else if (randomChoice === "paper") {
    paperButton.click();
  } else if (randomChoice === "scissor") {
    scissorButton.click();
  }
}

function animateChoice(button) {
  button.classList.add("move");
  setTimeout(function () {
    button.classList.remove("move");
  }, 800); // 1000ms is the duration of the animation
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  const random = choices[Math.floor(Math.random() * choices.length)];
  return random;
}

function playRound(humanChoice, computerChoice) {
  startCountdown();
  round++;
  enableButtons();
  roundDisplay.textContent = `${round}`;

  resultDisplay.classList.remove("result-win", "result-lose", "result-tie");

  const outcomes = {
    paper: { rock: "You win!", scissor: "You lose!" },
    rock: { scissor: "You win!", paper: "You lose!" },
    scissor: { paper: "You win!", rock: "You lose!" },
  };

  if (humanChoice === computerChoice) {
    resultDisplay.textContent = `It's a tie!`;
    resultDisplay.classList.add("result-tie");
  } else {
    const result = outcomes[humanChoice][computerChoice];
    resultDisplay.textContent = `${result} You picked ${humanChoice}, computer picked ${computerChoice}.`;
    console.log(`You picked: `, humanChoice);
    console.log(`Computer picked: `, computerChoice);
    console.log(result);

    if (result === "You win!") {
      resultDisplay.classList.add("result-win");
      humanScore++;
      playerDisplay.textContent = `Player Score: ${humanScore}`;
    } else if (result === "You lose!") {
      resultDisplay.classList.add("result-lose");
      computerScore++;
      computerDisplay.textContent = `Computer Score: ${computerScore}`;
    }
  }
  console.log(`Your score: `, humanScore);
  console.log(`Computer score: `, computerScore);
}

function updateHealthScore() {
  const maxScore = 5;
  const playerHealthPercent = (humanScore / maxScore) * 100;
  const computerHealthPercent = (computerScore / maxScore) * 100;
  playerHealth.style.width = `${playerHealthPercent}%`;
  computerHealth.style.width = `${computerHealthPercent}%`;
}

function playGame(humanSelection) {
  const computerSelection = getComputerChoice();
  playRound(humanSelection, computerSelection);

  updateHealthScore();

  if (humanScore === 5 || computerScore === 5) {
    alert("Game Over");
    clearInterval(countdown);
    restartGame();
  }
}

function restartGame() {
  round = 0;
  computerScore = 0;
  humanScore = 0;

  roundDisplay.textContent = `${round}`;
  playerDisplay.textContent = `Player Score: ${humanScore}`;
  computerDisplay.textContent = `Computer Score: ${computerScore}`;
  resultDisplay.textContent = `First to 5 wins!`;
  playerHealth.style.width = "0%";
  computerHealth.style.width = "0%";
  timerDisplay.textContent = 10;
  enableButtons();
}

function disableButtons() {
  const buttons = document.querySelectorAll(".choice-image");
  buttons.forEach((button) => (button.style.pointerEvents = "none"));
}
function enableButtons() {
  const buttons = document.querySelectorAll(".choice-image");
  buttons.forEach((button) => (button.style.pointerEvents = "auto"));
}
