const gameArea = document.querySelector('.gameArea');
// Create the scoreboard
const scoreBoard = document.createElement('div');
scoreBoard.textContent = 'Score: 0';
scoreBoard.classList.add('scoreBoard');

//Button
const button = document.createElement('button');
button.textContent = 'Start!';
button.classList.add('button');
const output = document.createElement('div');
output.textContent = 'Click the button to start the game!';
output.style.textAlign = 'center';
output.style.letterSpacing = '0.5rem';

const input = document.createElement('input');
input.setAttribute('type', 'text');
input.placeholder = 'Type your answer here...';
input.classList.add('input');

// GAME START VALUES

const words = [
  'javascript',
  'python',
  'java',
  'ruby',
  'html',
  'css',
  'react',
  'nodejs',
  'angular',
  'vue',
];

const game = {
  selectedWord: '',
  scrambledWord: '',
  score: 0,
  wordsLeft: 0,
};

// ADD to HTML page
gameArea.appendChild(button);
gameArea.appendChild(output);
gameArea.appendChild(input);
gameArea.appendChild(scoreBoard);

// hide the scoreboard initially
scoreBoard.style.display = 'none';
input.style.display = 'none';
output.style.display = 'none';

// BUTTON EVENT LISTENER

button.addEventListener('click', (e) => {
  if (words.length <= 0) {
    output.textContent =
      'No more words left! Please refresh the page to play again.';
    gameArea.textContent = `Game Over! Your final score is: ${game.score}`;
    input.disabled = true;
    button.style.display = 'none';
    return;
  }

  button.style.display = 'none';
  scoreBoard.style.display = 'block';
  input.textContent = '';
  input.style.display = 'inline';
  output.style.display = 'block';
  input.disabled = false;

  // sort the array
  words.sort(() => {
    return 0.5 - Math.random();
  });

  game.selectedWord = words[0];
  game.selectedWord = words.shift();
  game.wordsLeft = words.length;

  game.scramble = sorter(game.selectedWord);
  output.style.fontSize = '3rem';
  input.setAttribute('maxlength', game.selectedWord.length);
  input.focus();
  output.textContent = `Unscramble the word: ${game.scramble}`;
});

// EVENT LISTENER FOR INPUT

input.addEventListener('keyup', (e) => {
  console.log(e);
  input.style.borderColor = '#eee';
  input.style.borderWidth = '2px';

  if (input.value.length === game.selectedWord.length || e.code === 'Enter') {
    checkAnswer();
    input.value = '';

    // check for the answer
  }

  function checkAnswer() {
    if (input.value === game.selectedWord) {
      output.textContent = `Correct! The word was: ${game.selectedWord}`;
      input.style.borderWidth = '6px';
      input.style.borderColor = '#06923E';
      input.disabled = true;
      button.style.display = 'block';
      button.textContent = 'Click for the Next Word';
      increaseScore();
      updateScore();
    } else {
      input.style.borderWidth = '6px';
      input.style.borderColor = '#ED3500';
      input.value = '';
      input.focus();
      decreaseScore();
      updateScore();
    }
  }
});

// FUNCTION TO UPDATE THE SCOREBOARD

function increaseScore() {
  game.score += 1;
}

function decreaseScore() {
  if (game.score > 0) {
    game.score -= 1;
    updateScore();
  }
}

function updateScore() {
  scoreBoard.textContent = `Score: ${game.score} and Words Left: ${game.wordsLeft}`;
}

// FUNCTION TO SCRAMBLE THE WORD

function sorter(word) {
  let temp = game.selectedWord.split('');
  temp.sort(() => {
    return 0.5 - Math.random();
  });

  temp = temp.join('');
  if (word === temp) {
    console.log(word, temp);
    return sorter(word);
  }
  return temp;
}
