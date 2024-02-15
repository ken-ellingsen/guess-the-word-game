const guessedLetters = document.querySelector(`.guessed-letters`); // unordered list for player guesses
const button = document.querySelector('button'); // "Guess!" button
const input = document.querySelector('input'); // letter input
const wordInProgress = document.querySelector(".word-in-progress"); // word in progress paragraph
const remainingGuesses = document.querySelector(`.remaining`); // paragraph displaying remaining guesses message
const numberGuesses = document.querySelector('span'); // line indicating how many guesses are left
const guessMessage = document.querySelector(`.message`); // paragraph where messages appear after guessing a letter
const playAgainButton = document.querySelector(`.play-again`); // hidden "Play Again!" button

const word = `magnolia`; // Placeholder test word

const placeholder = function (word){
    const placeholderLetters = [];
    for (const letter of word){
        placeholderLetters.push(`●`)
    }
    wordInProgress.innerText = placeholderLetters.join("");
}

placeholder(word);

button.addEventListener("click", function(e){
    e.preventDefault();
    const inputLetter = input.value;
    input.value = '';
    console.log(inputLetter);
});