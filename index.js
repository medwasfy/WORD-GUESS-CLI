var Word = require("./word.js");
var inquirer = require("inquirer");

// calling all the letters
var letterArray = "abcdefghijklmnopqrstuvwxyz";

// List of words to choose from
var worldCupTeams = ["morocco", "russia", "france", "uruguay", "brazil", "argentina", "croatia", "england", "costa rica", "mexico", "sweden", "nigeria", "tunisia", "australia", "egypt", "saudi arabia", "spain", "portugal", "iceland", "peru", "denmark", "serbia"];

// pick Random word from worldCupTeams array
var randomIndex = Math.floor(Math.random() * worldCupTeams.length);
var randomWord = worldCupTeams[randomIndex];

// pass random word through Word constructor
computerWord = new Word(randomWord);

// prevent new word generation default
var requireNewWord = false;

// array for guessed letters
var wrongLetters = [];
var correctLetters = [];

// guesses left
var guessesLeft = 10;

function game() {
    console.log("You are Guessing the NAME of a COUNTRY who's team played in the World Cup 2018")
    // generates new word for Word constructor if true
    if (requireNewWord) {
        // selects random worldCupTeams array
        var randomIndex = Math.floor(Math.random() * worldCupTeams.length);
        var randomWord = worldCupTeams[randomIndex];

        // passes random word through the Word constructor
        computerWord = new Word(randomWord);

        
        requireNewWord = false;
    }


    // test if a letter guessed is correct
    var wordComplete = [];
    computerWord.lettersArr.forEach(completeCheck);

    // letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z!",
                    name: "userinput"
                }
            ])
            .then(function (input) {

               
                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nPlease try again!\n");
                    game();
                } else {

                   
                    if (wrongLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        game();
                    } else {

                        // check if guess is correct
                        var wordCheckArray = [];

                        
                        computerWord.userGuess(input.userinput);

                        // checks if guess is correct
                        computerWord.lettersArr.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                           
                            wrongLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                           
                            correctLetters.push(input.userinput);
                        }

                        
                        computerWord.log();

                        // alert user about guesses left
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        // alert user about letters guessed already
                        console.log("Letters Guessed: " + wrongLetters.join(" ") + "\n");

                        // guesses left correction
                        if (guessesLeft > 0) {
                            game();
                        } else {
                            console.log("YOU LOSE, TRY AGAIN!\n");

                            restartGame();
                        }


                        
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("CONGRATS, YOU WIN!\n");

        restartGame();
    }

   
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                wrongLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                game();
            } else {
                return
            }
        })
}

game();
