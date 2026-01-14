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
    let tempScore = 0;

    const anyPlayerWonOrIsInAdvantage = this.playerOneScore >= 4 || this.playerTwoScore >= 4;
    if (this.playerOneScore === this.playerTwoScore) {
      score = this.determineDrawScore(score);
    } else if (anyPlayerWonOrIsInAdvantage) {
      const playersScoreDifference: number = this.playerOneScore - this.playerTwoScore;

      score = this.calculateAdvantageAndWinner(playersScoreDifference, score);
    } else {
      for (let i = 1; i < 3; i++) {
        if (i === 1) {
          tempScore = this.playerOneScore;
        }
        else {
          score += '-';
          tempScore = this.playerTwoScore;
        }

        score = this.test(tempScore, score);
      }
    }

    return score;
  }

  private test(tempScore: number, score: string) {
    switch (tempScore) {
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

  private determineDrawScore(score: string) {
    switch (this.playerOneScore) {
      case 0:
        score = 'Love-All';
        break;
      case 1:
        score = 'Fifteen-All';
        break;
      case 2:
        score = 'Thirty-All';
        break;
      default:
        score = 'Deuce';
        break;
    }
    return score;
  }
}
