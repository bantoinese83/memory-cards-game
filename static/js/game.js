
let score = 0;
let moves = 0;
let misses = 0;
let remainingMoves = 20;
let bestRecord = localStorage.getItem('best-record') || '--';
let timer;
let timeLeft = 60;
let currentPlayer = 1;
let playerScores = [0, 0];

const cardsContainer = document.getElementById('cards-container');
const scoreDisplay = document.getElementById('score');
const movesDisplay = document.getElementById('moves');
const missesDisplay = document.getElementById('misses');
const remainingDisplay = document.getElementById('remaining');
const bestRecordDisplay = document.getElementById('best-record');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart');
const hintButton = document.getElementById('hint');
const startGameButton = document.getElementById('start-game');
const themeSelect = document.getElementById('theme');
const difficultySelect = document.getElementById('difficulty');
const gameOverScreen = document.getElementById('game-over-screen');
const gameOverMessage = document.getElementById('game-over-message');

// Initialize game state
bestRecordDisplay.textContent = bestRecord;

const themes = {
    emojis: ['😀', '😀', '😎', '😎', '🤓', '🤓', '😜', '😜', '😇', '😇', '🤠', '🤠'],
    animals: ['🐶', '🐶', '🐱', '🐱', '🐭', '🐭', '🐹', '🐹', '🐰', '🐰', '🦊', '🦊'],
    fruits: ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', '🍓', '🍓', '🍒', '🍒']
};

let cardValues = themes.emojis;
let firstCard = null;
let secondCard = null;
let flippedCards = [];

const flipSound = new Audio('static/sounds/flip.mp3');
const matchSound = new Audio('static/sounds/match.mp3');
const missSound = new Audio('static/sounds/miss.mp3');

function playSound(sound) {
    sound.play().catch(error => {
        console.error('Error playing sound:', error);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cardValues);
    cardsContainer.innerHTML = '';
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front');

        const backFace = document.createElement('div');
        backFace.classList.add('back');
        backFace.textContent = value;

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener('click', onCardClick);
        cardsContainer.appendChild(card);
    });

    // Show all cards for 2 seconds, then hide them
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('flipped');
        });
    }, 2000);
}

function onCardClick(e) {
    const card = e.currentTarget;
    if (card.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }
    card.classList.add('flipped');
    playSound(flipSound);
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        score += 10;
        playerScores[currentPlayer - 1] += 10;
        playSound(matchSound);
        setTimeout(() => {
            card1.classList.add('hidden');
            card2.classList.add('hidden');
        }, 1000);
        card1.classList.add('match');
        card2.classList.add('match');
    } else {
        misses++;
        playSound(missSound);
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    moves++;
    remainingMoves--;

    updateStats();
    flippedCards = [];
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function updateStats() {
    scoreDisplay.textContent = score;
    movesDisplay.textContent = moves;
    missesDisplay.textContent = misses;
    remainingDisplay.textContent = remainingMoves;

    if (remainingMoves === 0 || document.querySelectorAll('.card:not(.hidden)').length === 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    if (score > bestRecord || bestRecord === '--') {
        bestRecord = score;
        localStorage.setItem('best-record', bestRecord);
    }
    bestRecordDisplay.textContent = bestRecord;
    gameOverMessage.textContent = `Game Over! Player 1: ${playerScores[0]} - Player 2: ${playerScores[1]}`;
    gameOverScreen.style.display = 'block';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function resetGame() {
    score = 0;
    moves = 0;
    misses = 0;
    remainingMoves = 20;
    flippedCards = [];
    timeLeft = 60;
    playerScores = [0, 0];
    updateStats();
    createBoard();
    startTimer();
    gameOverScreen.style.display = 'none';
}

function showHint() {
    const hiddenCards = document.querySelectorAll('.card:not(.flipped):not(.hidden)');
    if (hiddenCards.length >= 2) {
        const [card1, card2] = [hiddenCards[0], hiddenCards[1]];
        card1.classList.add('flipped');
        card2.classList.add('flipped');
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
}

startGameButton.addEventListener('click', () => {
    const selectedTheme = themeSelect.value;
    const selectedDifficulty = difficultySelect.value;

    cardValues = themes[selectedTheme];
    if (selectedDifficulty === 'easy') {
        cardValues = cardValues.slice(0, 6);
    } else if (selectedDifficulty === 'medium') {
        cardValues = cardValues.slice(0, 8);
    } else if (selectedDifficulty === 'hard') {
        cardValues = cardValues.slice(0, 12);
    }


    resetGame();
});

restartButton.addEventListener('click', resetGame);
hintButton.addEventListener('click', showHint);

 createBoard();
updateStats();
startTimer();