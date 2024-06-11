let humanScore = 0;
let computerScore = 0;
let round = 0;
let timeLeft = 30;
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

function updateTimer() {
  timerDisplay.textContent = `Times left ${timeLeft} seconds`;
  if (timeLeft === 0) {
    clearInterval(countdown);
    resultDisplay.textContent = `Time's up, you didn't make a choice!`;
    disableButtons();
    selectRandomChoice();
  }
  timeLeft--;
}

function startCountdown() {
  clearInterval(countdown);
  countdown = setInterval(updateTimer, 1000);
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
  roundDisplay.textContent = `Round: ${round}`;

  const outcomes = {
    paper: { rock: "You win!", scissor: "You lose!" },
    rock: { scissor: "You win!", paper: "You lose!" },
    scissor: { paper: "You win!", rock: "You lose!" },
  };

  if (humanChoice === computerChoice) {
    resultDisplay.textContent = `It's a tie!`;
    // console.log(`It's a tie!`);
  } else {
    const result = outcomes[humanChoice][computerChoice];
    resultDisplay.textContent = `${result} You picked ${humanChoice}, computer picked ${computerChoice}.`;
    console.log(`You picked: `, humanChoice);
    console.log(`Computer picked: `, computerChoice);
    console.log(result);

    if (result === "You win!") {
      humanScore++;
      playerDisplay.textContent = `Player Score: ${humanScore}`;
    } else if (result === "You lose!") {
      computerScore++;
      computerDisplay.textContent = `Computer Score: ${computerScore}`;
    }
  }
  console.log(`Your score: `, humanScore);
  console.log(`Computer score: `, computerScore);
}

function updateHealthScore() {
  const maxScore = 5;
  const playerHealthPercent = ((maxScore - humanScore) / maxScore) * 100;
  const computerHealthPercent = ((maxScore - computerScore) / maxScore) * 100;
  playerHealth.style.width = `${playerHealthPercent}%`;
  computerHealth.style.width = `${computerHealthPercent}%`;
}

function playGame(humanSelection) {
  const computerSelection = getComputerChoice();
  playRound(humanSelection, computerSelection);

  updateHealthScore();

  if (humanScore === 5 || computerScore === 5) {
    alert("Game Over");
    restartGame();
  }
}

function restartGame() {
  round = 0;
  computerScore = 0;
  humanScore = 0;
  roundDisplay.textContent = `Round: ${round}`;
  playerDisplay.textContent = `Player Score: ${humanScore}`;
  computerDisplay.textContent = `Computer Score: ${computerScore}`;
  resultDisplay.textContent = `First to 5 wins!`;
  disableButtons();
  //   playerHealth.style.width = "100%";
  //   computerHealth.style.width = "100%";
}

function disableButtons() {
  const buttons = document.querySelectorAll(".choice-image");
  buttons.forEach((button) => (button.style.pointerEvents = "none"));
}
