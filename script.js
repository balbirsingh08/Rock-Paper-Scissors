document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const userScoreElem = document.getElementById('user-score');
    const computerScoreElem = document.getElementById('computer-score');
    const resultTextElem = document.getElementById('result-text');
    const gameTextElem = document.getElementById('game-text');
    const playAgainBtn = document.getElementById('play-again');
    const userChoiceElem = document.getElementById('user-choice');
    const computerChoiceElem = document.getElementById('computer-choice');
    const roundResultElem = document.getElementById('round-result');
    const choices = document.querySelectorAll('.choice');
    
    // Game variables
    let userScore = 0;
    let computerScore = 0;
    let round = 0;
    let gameOver = false;
    
    // Choice icons mapping
    const choiceIcons = {
        'rock': '<i class="fa-solid fa-hand-fist"></i>',
        'paper': '<i class="fa-solid fa-hand"></i>',
        'scissors': '<i class="fa-solid fa-hand-scissors"></i>'
    };
    
    // Result icons mapping
    const resultIcons = {
        'win': '<i class="fa-solid fa-trophy win"></i>',
        'lose': '<i class="fa-solid fa-xmark lose"></i>',
        'draw': '<i class="fa-solid fa-equals draw"></i>'
    };
    
    // Initialize game
    function initGame() {
        userScore = 0;
        computerScore = 0;
        round = 0;
        gameOver = false;
        
        userScoreElem.textContent = userScore;
        computerScoreElem.textContent = computerScore;
        resultTextElem.textContent = 'Choose your weapon!';
        gameTextElem.textContent = 'First to 5 wins the game!';
        userChoiceElem.innerHTML = '-';
        computerChoiceElem.innerHTML = '-';
        roundResultElem.innerHTML = '-';
        
        playAgainBtn.style.display = 'none';
        
        // Remove selected class from all choices
        choices.forEach(choice => {
            choice.classList.remove('selected');
        });
    }
    
    // Computer random choice
    function computerPlay() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }
    
    // Play a round
    function playRound(userSelection) {
        if (gameOver) return;
        
        // Remove selected class from all choices
        choices.forEach(choice => {
            choice.classList.remove('selected');
        });
        
        // Add selected class to user's choice
        document.getElementById(userSelection).classList.add('selected');
        
        const computerSelection = computerPlay();
        round++;
        
        // Display choices
        userChoiceElem.innerHTML = choiceIcons[userSelection];
        computerChoiceElem.innerHTML = choiceIcons[computerSelection];
        
        // Determine winner
        if (userSelection === computerSelection) {
            resultTextElem.textContent = "It's a draw!";
            roundResultElem.innerHTML = resultIcons['draw'];
            gameTextElem.textContent = `Both chose ${userSelection}`;
        } else if (
            (userSelection === 'rock' && computerSelection === 'scissors') ||
            (userSelection === 'paper' && computerSelection === 'rock') ||
            (userSelection === 'scissors' && computerSelection === 'paper')
        ) {
            userScore++;
            userScoreElem.textContent = userScore;
            resultTextElem.textContent = "You win!";
            roundResultElem.innerHTML = resultIcons['win'];
            gameTextElem.textContent = `${userSelection} beats ${computerSelection}`;
        } else {
            computerScore++;
            computerScoreElem.textContent = computerScore;
            resultTextElem.textContent = "You lose!";
            roundResultElem.innerHTML = resultIcons['lose'];
            gameTextElem.textContent = `${computerSelection} beats ${userSelection}`;
        }
        
        // Check for game over
        if (userScore === 5 || computerScore === 5) {
            gameOver = true;
            if (userScore > computerScore) {
                resultTextElem.textContent = "You won the game! 🎉";
            } else {
                resultTextElem.textContent = "Computer won the game! 😢";
            }
            gameTextElem.textContent = `Final score: ${userScore}-${computerScore}`;
            playAgainBtn.style.display = 'inline-block';
        }
    }
    
    // Event listeners
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            if (!gameOver) {
                playRound(choice.id);
            }
        });
    });
    
    playAgainBtn.addEventListener('click', initGame);
    
    // Initialize the game
    initGame();
});