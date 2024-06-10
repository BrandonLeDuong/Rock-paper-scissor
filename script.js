let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  const random = choices[Math.floor(Math.random() * choices.length)];
  //   console.log(random);
  return random;
}

function getHumanChoice() {
  const input = prompt(
    "Pick between rock, paper, or scissor!"
  ).toLocaleLowerCase();
  //   console.log(input);
  return input;
}

function playRound(humanChoice, computerChoice) {
  const outcomes = {
    paper: { rock: "You win!", scissor: "You lose!" },
    rock: { scissor: "You win!", paper: "You lose!" },
    scissor: { paper: "You win!", rock: "You lose!" },
  };

  if (humanChoice === computerChoice) {
    console.log(`It's a tie!`);
  } else {
    console.log(`You picked: `, humanChoice);
    console.log(`Computer picked: `, computerChoice);
    const result = outcomes[humanChoice][computerChoice];
    console.log(result);

    if (result === "You win!") {
      humanScore++;
    } else if (result === "You lose!") {
      computerScore++;
    }
  }
  console.log(`Your score: `, humanScore);
  console.log(`Computer score: `, computerScore);
}

function playGame() {
  let i = 0;
  while (i < 5) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
    i++;
  }
}

playGame();
