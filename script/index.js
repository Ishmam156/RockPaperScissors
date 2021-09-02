// Global game variables
const gameOptions = ['rock', 'paper', 'scissors']
let humanWins = 0
let computerWins = 0
let gameover = false

// Generate computer choice randomly
function computerPlay() {
    return gameOptions[Math.floor(Math.random() * gameOptions.length)]
}

// Modify the DOM based on whether we have a winner
function winnerCheck() {
    
    if (humanWins === 5 || computerWins === 5) {
        
        // Clear game playing DOM elements
        gameover = true
        let winner = null
        document.getElementById('gameOptions').innerHTML = ''
        document.getElementById('result').innerHTML = ''
        
        if (humanWins === 5) {
            winner = 'Congratulations, you! That was some great playing!'
            document.getElementById('humanScoreMain').style.background = 'rgb(127, 127, 127)'
        
        } else {
            winner = 'Tough Luck! You played pretty well!'
            document.getElementById('computerScoreMain').style.background = 'rgb(127, 127, 127)'
        }
        
        // Display winner and reset button
        document.getElementById('mainInstruction').innerText = winner
        document.getElementById('display').classList.toggle('show')
    }   
}

// Play Single game of RPS
function playRPS(humanInput, computerInput) {

    // Converting human input and checking if valid move
    humanInput = humanInput.toLowerCase()
    
    if (!gameOptions.includes(humanInput)) {
        return "That's not a valid move! We are playing Rock, Paper, Scissors, right?!"
    }

    // Add computer move to DOM
    const computerMoveDisplay = document.getElementById('computerMove')
    computerMoveDisplay.innerText = computerInput
    computerMoveDisplay.style.color = 'white'
    computerMoveDisplay.style.fontWeight = '900'

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

    // Check for a draw
    if (humanInput === computerInput) {
        return "No one wins! It's a draw :("
    }

    let winnerText

    // Check which combination has taken place and find winner accordingly
    if (winningChoices[humanInput][computerInput] > 0) {
        humanWins++
        document.getElementById('humanScore').innerText = humanWins
        winnerText = `You win! ${humanInput} beats ${computerInput} :D`
    } else {
        computerWins++
        document.getElementById('computerScore').innerText = computerWins
        winnerText = `You lose! ${computerInput} beats ${humanInput} :'(`
    }

    winnerCheck()

    return winnerText
}

// Add game play functionality to button in DOM looping over gameoptions
gameOptions.forEach(option => {
    
    document.getElementById(option).addEventListener('click', () => {
        const result = playRPS(option, computerPlay())

        if (!gameover) {
            const gameResult = document.getElementById('gameResult')
            gameResult.innerText = result
        
            if (!gameResult.style.backgroundColor) {
                document.getElementById('gameResult').style.backgroundColor = 'rgb(127, 127, 127)'
            }
        }
    })
    
})

// Adding Reset Button to game
document.getElementById('resetGame').addEventListener('click', () => window.location.reload())