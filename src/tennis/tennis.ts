export default class TennisGame {
    private pointMap: {[key: number]: string} = {
        0: "0",
        1: "15",
        2: "30",
        3: "40"
    }

    private playerAScore: string[] = ["A","0","0","0","0","0","0"]
    private playerBScore: string[] = ["B","0","0","0","0","0","0"]

    private pointsA = 0
    private pointsB = 0
    private gamesA = 0
    private gamesB = 0
    
    constructor(private playerScores: string[]) {}

    score(): string[][] {
        this.computeScore()
        this.displayPoints()
        this.displayGames()
        return [this.playerAScore, this.playerBScore]
    }

    private displayPoints() {
        this.playerAScore[6] = this.pointMap[this.pointsA]
        this.playerBScore[6] = this.pointMap[this.pointsB]
    }

    private displayGames() {
        this.playerAScore[1] = this.gamesA.toString()
        this.playerBScore[1] = this.gamesB.toString()
    }

    private resetPoints() {
        this.pointsA = 0
        this.pointsB = 0
    }

    private computeScore() {
        this.playerScores.forEach(score => {
            if (score === "A") {
                this.pointsA++
            } else {
                this.pointsB++
            }
    
            if (this.pointsA > 3 && this.pointsB < 3) { // regular
                this.resetPoints()
                this.gamesA++
            } else if (this.pointsA > 3 && this.pointsB === 3) { // advantage
                this.setAdvantage(this.playerAScore)
            }
        });  
    }

    private setAdvantage(player: string[]) {
        player[6] = "advantage"
    }
}