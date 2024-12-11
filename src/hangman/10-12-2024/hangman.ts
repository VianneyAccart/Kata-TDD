interface GameState {
    state: "In progress" | "Win" | "Loose";
    mistakes: number
    guessResult: string
}

export default class Hangman {

    private guessResult = ""
    private mistakes = 0;

    constructor(private wordToGuess: string) {
        this.guessResult = "#".repeat(wordToGuess.length)
    }

    gameState(): GameState {
        if (this.mistakes === 10) {
            return {
                state: "Loose",
                mistakes: this.mistakes,
                guessResult: this.guessResult
            }
        }
        if (!this.guessResult.includes("#")) {
            return {
                state: "Win",
                mistakes: this.mistakes,
                guessResult: this.guessResult
            }
        }
            
        return {
            state: "In progress",
            mistakes: this.mistakes,
            guessResult: this.guessResult
        }
    }

    mistakeCount() {
        return this.mistakes;
    }

    guess(letter: string) {
        if (!this.wordToGuess.includes(letter)) this.mistakes++

        let indexes: number[] = []

        this.wordToGuess.split("").map((char: string, index: number) => {
            if (char === letter) {
                indexes.push(index);
            }
        })

        const splitted = this.guessResult.split("");

        indexes.map(index => {
            splitted[index] = letter
        })

        const joined = splitted.join("")
        this.guessResult = joined
    }
}