export class Bowling {
    private rolls: number[];

    constructor(rolls: number[]) {
        this.rolls = rolls
    }

    public score() {
        let score = 0;
        
        for (let rollIndex = 0; rollIndex < this.rolls.length; rollIndex++) {
            if (this.isSpare(rollIndex)) {
                score += 10 + this.rolls[rollIndex+2]
                rollIndex += 1
            } else if (this.isStrike(rollIndex)) {
                score += 10 + this.rolls[rollIndex+1] + this.rolls[rollIndex+2] || 0
            } else {
                if (rollIndex <= 19) score += this.rolls[rollIndex]; // Does not count bonus throw as it was already calculated in spare/strike
            }
        }

        return score;
    }

    private isSpare(rollIndex: number) {
        return this.rolls[rollIndex] + this.rolls[rollIndex+1] === 10
    }

    private isStrike(rollIndex: number) {
        return this.rolls[rollIndex] === 10
    }
}