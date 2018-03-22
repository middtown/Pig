/*
GAME RULES:

provided by wikipedia: https://en.wikipedia.org/wiki/Pig_(dice_game)

Each turn, a player repeatedly rolls a die until either a 1 is rolled or the player decides to "hold":

If the player rolls a 1, they score nothing and it becomes the next player's turn.
If the player rolls any other number, it is added to their turn total and the player's turn continues.
If a player chooses to "hold", their turn total is added to their score, and it becomes the next player's turn.
The first player to score 100 or more points wins.

For example, the first player, Anne, begins a turn with a roll of 5. Anne could
hold and score 5 points, but chooses to roll again. Anne rolls a 2, and could hold
with a turn total of 7 points, but chooses to roll again. Anne rolls a 1, and must
end her turn without scoring. The next player, Bob, rolls the sequence 4-5-3-5-5,
after which he chooses to hold, and adds his turn total of 22 points to his score.
*/

let scores, roundScore, activePlayer;

//initializing scores for new game
function gameInitialize() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  //grabs the dice and sets it initial view display to none
  document.querySelector('.dice').style.display = 'none';

  //set current and overall score to 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

gameInitialize();

//next player function
function nextplayer() {
  //next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  //reset player score to 0
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  //update active styling for current active player
  //toggle works better in this instance than add or remove
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //remove dice from view upon player swap
  document.querySelector('.dice').style.display = 'none';
}

//new game button
document.querySelector('.btn-new').addEventListener('click', gameInitialize);

document.querySelector('.btn-roll').addEventListener('click', function () {

  //1. create random number
  //provides a randon dice roll value between 1 and 6
  const dice = Math.floor(Math.random() * 6) + 1;

  //2. display result
  // - bring style of .dice to life
  let diceDom = document.querySelector('.dice');
  diceDom.style.display = 'block';
  diceDom.src = 'img/dice-' + dice + '.png';

  //3. update score if the roll value was not a 1
  if (dice !== 1) {
    //add score
    roundScore += dice; //adds dice numbered value score if not equal to 1

    //display roundscore with updated value
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //next player
    nextplayer();
  }
});

//hold button to add current score to player overall score
document.querySelector('.btn-hold').addEventListener('click', function () {
  //add score
  scores[activePlayer] += roundScore;

  //update the dom
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

  //check if player wins game
  if (scores[activePlayer] >= 100) {
    document.getElementById('name-' + activePlayer).textContent = 'Winner';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  } else {

    //next player
    nextplayer();
  }
});
