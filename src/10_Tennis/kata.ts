export interface ITennisGame {
  incrementScoreToPlayer(playerName: string): void;
  getScore(): string;
}

export class TennisGame implements ITennisGame {
  private readonly PLAYER_ONE_NAME: string = 'player1';
  private readonly PLAYER_TWO_NAME: string = 'player2';

  private playerOneScore = 0;
  private playerTwoScore = 0;

  public incrementScoreToPlayer(playerName: string): void {
    if (playerName === this.PLAYER_ONE_NAME) {
      this.playerOneScore += 1;
    }

    if (playerName === this.PLAYER_TWO_NAME) {
      this.playerTwoScore += 1;
    }
  }

  public getScore(): string {
    const anyPlayerWonOrIsInAdvantage = this.playerOneScore >= 4 || this.playerTwoScore >= 4;
    if (this.playerOneScore === this.playerTwoScore) {
      return this.determineDrawScore();
    } else if (anyPlayerWonOrIsInAdvantage) {
      const playersScoreDifference: number = this.playerOneScore - this.playerTwoScore;

      return this.calculateAdvantageAndWinner(playersScoreDifference);
    } else {
      return `${this.getPlayerScore(this.playerOneScore)}-${this.getPlayerScore(this.playerTwoScore)}`;
    }
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
      default:
        return '';
    }
  }

  private calculateAdvantageAndWinner(playersScoreDifference: number) {
    if (playersScoreDifference === 1) {
      return 'Advantage player1';
    } else if (playersScoreDifference === -1) {
      return 'Advantage player2';
    } else if (playersScoreDifference >= 2) {
      return 'Win for player1';
    } else {
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
