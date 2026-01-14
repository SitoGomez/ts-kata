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

    if (this.playerOneScore === this.playerTwoScore) {
      score = this.determineDrawScore(score);
    } else if (this.playerOneScore >= 4 || this.playerTwoScore >= 4) {
      const minusResult: number = this.playerOneScore - this.playerTwoScore;

      if (minusResult === 1) {
        score = 'Advantage player1'
      }
      else if (minusResult === -1) {
        score = 'Advantage player2';
      }
      else if (minusResult >= 2) {
        score = 'Win for player1';
      }
      else {
        score = 'Win for player2';
      }
    } else {
      for (let i = 1; i < 3; i++) {
        if (i === 1) {
          tempScore = this.playerOneScore;
        }
        else {
          score += '-';
          tempScore = this.playerTwoScore;
        }

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
      }
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
