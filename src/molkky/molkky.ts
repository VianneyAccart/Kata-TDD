export default class Molkky {
    private throws: number[][] = [[]]
    private hasWonTheGame = false;
    private hasLoseTheGame = false;
    private playerScore = 0;
    private consecutiveMissedCount = 0;

    constructor(throws: number[][]) {
        this.throws = throws;
    }

    public score() {
        for (let throwIndex = 0; throwIndex < this.throws.length; throwIndex++) {
            if (this.isMissedThrow(throwIndex)) {
                this.incrementMissedThrowsCount()
            } else if (this.multipleFallenPins(throwIndex)) {
                this.incrementScore(this.throws[throwIndex].length)
                this.resetMissedThrowsCount()
                this.bringPlayerScoreTo25IfGreaterThan50() 
            } else if (this.oneFallenPin(throwIndex)) {
                this.incrementScore(this.throws[throwIndex][0])
                this.resetMissedThrowsCount()
                this.bringPlayerScoreTo25IfGreaterThan50() 
            } 

            if (this.hasReachThreeConsecutiveMissedThrows()) {
                this.setGameAsLose()
                break
            }
        }

        this.winTheGameIfScore50()
        return this.playerScore
    }

    public hasWon(): boolean {
        return this.hasWonTheGame;
    }

    public hasLose(): boolean {
        return this.hasLoseTheGame;
    }

    private setGameAsLose() {
        this.hasLoseTheGame = true
    }

    private isMissedThrow(throwIndex: number): boolean {
        return this.throws[throwIndex].length === 0
    }

    private incrementMissedThrowsCount() {
        this.consecutiveMissedCount++
    }

    private resetMissedThrowsCount() {
        this.consecutiveMissedCount = 0
    }

    private multipleFallenPins(throwIndex: number): boolean {
        return this.throws[throwIndex].length > 1;
    }

    private oneFallenPin(throwIndex: number) {
        return this.throws[throwIndex].length === 1
    }

    private bringPlayerScoreTo25IfGreaterThan50() {
        if (this.playerScore > 50) this.playerScore = 25
    }

    private hasReachThreeConsecutiveMissedThrows() {
        return this.consecutiveMissedCount === 3
    }

    private incrementScore(score: number) {
        this.playerScore += score;
    }

    private winTheGameIfScore50() {
        this.playerScore === 50 ? this.hasWonTheGame = true : this.hasWonTheGame = false;
    }
}