var Letter = require("./letter.js");

function Word(answer) {
    
    this.lettersArr = [];
    
    for (var i = 0; i < answer.length; i++) {
        var letter = new Letter(answer[i]);
        this.lettersArr.push(letter);
    }
    
    this.log = function () {
        logAnswer = "";
        for (var i = 0; i < this.lettersArr.length; i++) {
            logAnswer += this.lettersArr[i] + " ";
        }
        console.log(logAnswer + "\n");
    }
    
    this.userGuess = function (input) {
        for (var i = 0; i < this.lettersArr.length; i++) {
            this.lettersArr[i].guess(input);
        }
    }
}

module.exports = Word;