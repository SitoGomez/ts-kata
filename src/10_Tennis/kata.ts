/* eslint-disable */

export interface ITennisGame {
  wonPoint(playerName: string): void;
  getScore(): string;
}

export class TennisGame implements ITennisGame {
  private playerOneScore = 0;
  private playerTwoScore = 0;
  //@ts-ignore
  private playerOneName: string;
  //@ts-ignore
  private playerTwoName: string;

  constructor(playerOneName: string, playerTwoName: string) {
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
  }

  public wonPoint(playerName: string): void {
    if (playerName === 'player1') {
      this.playerOneScore += 1;
    }
    else {
      this.playerTwoScore += 1;
    }
  }

  public getScore(): string {
    let score = '';

    const anyPlayerWonOrIsInAdvantage = this.playerOneScore >= 4 || this.playerTwoScore >= 4;
    if (this.playerOneScore === this.playerTwoScore) {
      score = this.determineDrawScore();
    } else if (anyPlayerWonOrIsInAdvantage) {
      const playersScoreDifference: number = this.playerOneScore - this.playerTwoScore;

      score = this.calculateAdvantageAndWinner(playersScoreDifference);
    } else {
      score += this.getPlayerScore(this.playerOneScore);
      score += '-';
      score += this.getPlayerScore(this.playerTwoScore);
    }

    return score;
  }

  private getPlayerScore(playerCurrentScore: number) {
    switch (playerCurrentScore) {
      case 0:
        return 'Love';
      case 1:
        return 'Fifteen';
      case 2:
        return 'Thirty';
      case 3:
        return 'Forty';
    }
  }

  private calculateAdvantageAndWinner(playersScoreDifference: number) {
    if (playersScoreDifference === 1) {
      return 'Advantage player1';
    }
    else if (playersScoreDifference === -1) {
      return 'Advantage player2';
    }
    else if (playersScoreDifference >= 2) {
      return 'Win for player1';
    }
    else {
      return 'Win for player2';
    }
  }

  private determineDrawScore() {
    switch (this.playerOneScore) {
      case 0:
        return 'Love-All';
      case 1:
        return 'Fifteen-All';
      case 2:
        return 'Thirty-All';
      default:
        return 'Deuce'; 
    }
  }
}
