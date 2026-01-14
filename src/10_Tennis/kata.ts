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

      score = this.calculateAdvantageAndWinner(playersScoreDifference, score);
    } else {
      score = this.getPlayerScore(this.playerOneScore, score);
      score += '-';
      score = this.getPlayerScore(this.playerTwoScore, score);
    }

    return score;
  }

  private getPlayerScore(playerCurrentScore: number, score: string) {
    switch (playerCurrentScore) {
      case 0:
        score += 'Love';
        break;
      case 1:
        score += 'Fifteen';
        break;
      case 2:
        score += 'Thirty';
        break;
      case 3:
        score += 'Forty';
        break;
    }

    return score;
  }

  private calculateAdvantageAndWinner(playersScoreDifference: number, score: string) {
    if (playersScoreDifference === 1) {
      score = 'Advantage player1';
    }
    else if (playersScoreDifference === -1) {
      score = 'Advantage player2';
    }
    else if (playersScoreDifference >= 2) {
      score = 'Win for player1';
    }
    else {
      score = 'Win for player2';
    }
    return score;
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
