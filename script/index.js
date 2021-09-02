// Global game variables
const gameOptions = ['rock', 'paper', 'scissors']
let numberOfRounds = 0
let humanWins = 0
let computerWins = 0
let gameOver = false
let winner = null

// Generate computer choice randomly
function computerPlay() {
    return gameOptions[Math.floor(Math.random() * gameOptions.length)]
}

// Play Single game of RPS
function playRPS(humanInput, computerInput) {

    // Converting human input and checking if valid move
    humanInput = humanInput.toLowerCase()
    
    if (!gameOptions.includes(humanInput)) {
        return "That's not a valid move! We are playing Rock, Paper, Scissors, right?!"
    }

    const winningChoices = {
        'rock' : {      // Rock beats Scissors
            'scissors': 1,
            'paper': -1,
        },
        'paper' : {     // Paper beats Rock
            'rock': 1,
            'scissors': -1,
        },
        'scissors' : {   // Scissors beats Paper
            'paper': 1,
            'rock': -1,
        },
    }

    // Keep track of rounds
    numberOfRounds++

    // Check for a draw
    if (humanInput === computerInput) {
        return "No one wins! It's a draw :("
    }

    // Check which combination has taken place and find winner accordingly
    if (winningChoices[humanInput][computerInput] > 0) {
        humanWins++
        return `You win! ${humanInput} beats ${computerInput} :D`
    } else {
        computerWins++
        return `You lose! ${computerInput} beats ${humanInput} :'(`
    }
}

// Main Game Loop
function game() {
    // Introductory messages
    alert('Welcome to a challenging game of Rock, Paper and Scissors!')
    alert("Let's get started, shall we? First to 5 rounds wins!")

    // Reset game if restarting
    numberOfRounds = 0
    humanWins = 0
    computerWins = 0
    gameOver = false
    winner = null

    // Run RPS on loop till someone reaches score of 5
    while (!gameOver) {
        // Get human input and play game
        const humanInput = prompt('Select between: Rock, Paper and Scissors!')
        const result = playRPS(humanInput, computerPlay())
        alert(`${result}\n\nHuman Wins: ${humanWins}\nComputer Wins: ${computerWins}\nTotal Rounds Played: ${numberOfRounds}`)

        // Check for winner to stop loop
        if (humanWins === 5 || computerWins === 5) {
            gameOver = true
            if (humanWins === 5) {
                winner = 'Congratulations, you! That was some great playing!'
            } else {
                winner = 'Tough Luck! You played pretty well!'
            }
        }
    }

    // Ask player for replaying of game or not
    alert(winner)    
    const playDecision = prompt("Type 'Yes' if you want to start again and anything else to stop.")

    if (playDecision.toLowerCase() === 'yes') {
        game()
    } else {
        alert(`Thank you for playing!`)    
    }
}

// Add game play functionality to button in DOM
document.querySelector('button').addEventListener('click', () => game())