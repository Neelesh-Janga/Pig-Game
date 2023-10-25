'use strict';

const btnRoll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const playersScore = document.querySelectorAll('.score');
const currentScore = document.querySelectorAll('.current-score');
const btnNew = document.querySelector('.btn--new');

let score1 = 0;
let score2 = 0;
let gameOver = false;

// Randomly choosing which player to start first
let activePlayer = Math.trunc(Math.random() * 2) + 1;

if(activePlayer == 2){
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
}

// Reset Scores Function
const resetScores = () => {
    playersScore[0].textContent = 0;
    playersScore[1].textContent = 0;
    currentScore[0].textContent = 0;
    currentScore[1].textContent = 0;
};

// Resetting Scores to Zeros
resetScores();

// Hold Button Function
const hold = () => {
    if(gameOver) return;

    if(player1.classList.contains('player--active')){
        player1.classList.remove('player--active');
        player2.classList.add('player--active');
        playersScore[0].textContent = Number(playersScore[0].textContent) + Number(currentScore[0].textContent);
        currentScore[0].textContent = 0;
        score1 = 0;
        if(Number(playersScore[0].textContent) >= 100){
            player1.classList.add('player--winner');
            gameOver = true;
            dice.classList.add('hidden');
        }
    }else{
        player1.classList.add('player--active');
        player2.classList.remove('player--active');
        playersScore[1].textContent = Number(playersScore[1].textContent) + Number(currentScore[1].textContent);
        currentScore[1].textContent = 0;
        score2 = 0;
        if(Number(playersScore[1].textContent) >= 100){
            player2.classList.add('player--winner');
            gameOver = true;
            dice.classList.add('hidden');
        }
    }
};

// Roll Dice Script
btnRoll.addEventListener('click',
() => {
    if(gameOver) return;

    let randomNum = Math.trunc(Math.random() * 6) + 1;
    dice.src = `./dice-${randomNum}.png`;

    if(player1.classList.contains('player--active')){
        if(randomNum === 1){
            currentScore[0].textContent = 0;
            hold();
            score1 = 0;
        }else{
            score1 += randomNum;
            console.log(score1);
            currentScore[0].textContent = score1;
        }
    }else{
        if(randomNum === 1){
            currentScore[1].textContent = 0;
            hold();
            score2 = 0;
        }else{
            score2 += randomNum;
            currentScore[1].textContent = score2;
        }
    }
});

// Hold Button Event
btnHold.addEventListener('click', hold);


// New Game Script
btnNew.addEventListener('click', () => {
    resetScores();
    if (dice.classList.contains('hidden')) dice.classList.remove('hidden');
    gameOver = false;
    if(player1.classList.contains('player--winner')) player1.classList.remove('player--winner');
    if(player2.classList.contains('player--winner')) player2.classList.remove('player--winner');
});


