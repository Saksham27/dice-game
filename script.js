/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll1, prevRoll2, inputVal;

init();

document.getElementById('input').addEventListener('click', function() {
	inputVal = document.getElementById('win-score').value;
	document.querySelector('.target').textContent = '' + inputVal;
	gamePlaying = true;
});

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		// 2.display the score
		var diceDOM = document.querySelector('.dice-1');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice1 + '.png';
		var diceDOM = document.querySelector('.dice-2');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice2 + '.png';

		// Update the prevRoll and compare if both same or not and if both 6
		if ((dice1 === 6 && dice1 === prevRoll) || (dice2 === 6 && dice2 === prevRoll)) {
			document.querySelector('.dice-1').style.display = 'initial';
			document.querySelector('.dice-2').style.display = 'initial';
			nextPlayer();
		} else {
			prevRoll1 = dice1;
			prevRoll2 = dice2;
		}

		// Update the round score if the rolled no is not 1
		if (dice1 !== 1 && dice2 !== 1) {
			// Add scores
			roundScore += dice1 + dice2;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// Add current score to global score
		scores[activePlayer - 1] += roundScore;

		// Update the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer - 1];

		//  Check if player won the game
		if (scores[activePlayer - 1] >= inputVal) {
			document.getElementById('name-' + activePlayer).textContent = 'Winner!!!';
			document.querySelector('.dice-1').style.display = 'none';
			document.querySelector('.dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
	activePlayer === 1 ? (activePlayer = 2) : (activePlayer = 1);
	roundScore = 0;
	document.getElementById('current-1').textContent = '0';
	document.getElementById('current-2').textContent = '0';

	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.player-2-panel').classList.toggle('active');
}

function init() {
	scores = [ 0, 0 ];
	activePlayer = 1;
	roundScore = 0;
	gamePlaying = false;
	prevRoll = 0;
	inputVal = undefined;
	document.getElementById('name-1').textContent = 'Player-1';
	document.getElementById('name-2').textContent = 'Player-2';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('score-2').textContent = '0';

	document.getElementById('current-1').textContent = '0';
	document.getElementById('current-2').textContent = '0';
	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';
	document.querySelector('.player-1-panel').classList.add('active');
	document.querySelector('.player-2-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-2-panel').classList.remove('winner');
	document.getElementById('win-score').value = 'unset';
	document.querySelector('.target').textContent = '';
}
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<s>' + dice + '</s>';

// var x = document.querySelector('#score-1').textContent;
// console.log(x);
