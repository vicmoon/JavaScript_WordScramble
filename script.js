const gameArea = document.querySelector('.gameArea');
const button = document.createElement('button');
button.textContent = 'Start!';
const output = document.createElement('div');
output.textContent = 'Click the button to start the game!';

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
};

// ADD to HTML page
gameArea.appendChild(button);
gameArea.appendChild(output);

// EVENT LISTENER
button.addEventListener('click', (e) => {
  console.log(e);

  // sort the array
  words.sort(() => {
    return 0.5 - Math.random();
  });

  game.selectedWord = words[0];
  game.scramble = sorter(game.selectedWord);
  output.textContent = `Unscramble the word: ${game.scramble}`;
});

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
