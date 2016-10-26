const GAME_ROCK = 0;
const GAME_SCISSORS = 1;
const GAME_PAPER = 2;
const PLAYER1_WIN = 0;
const PLAYER2_WIN = 1;
const PLAYER_DRAW = 2;

export class chifoumi {

  score1: number; //score player 1
  score2: number; //score player 2

  constructor() {
    this.resetGame();
  }


  /**
   * player 2 play a game, score is calculated
   * @param game =
   * GAME_ROCK
   * GAME_SCISSORS
   * GAME_PAPER
   *
   * @return =
   *  PLAYER1_WIN
   *  PLAYER2_WIN
   *  PLAYER3_WIN
   */
  play(gamePlayer1: number, gamePlayer2: number): number {
    if ((gamePlayer1 == GAME_ROCK) && (gamePlayer2 == GAME_PAPER)) {
      this.score2++;
      return PLAYER2_WIN;
    }
    if ((gamePlayer1 == GAME_ROCK) && (gamePlayer2 == GAME_SCISSORS)) {
      this.score1++;
      return PLAYER1_WIN;
    }
    if ((gamePlayer1 == GAME_ROCK) && (gamePlayer2 == GAME_ROCK)) {
      return PLAYER_DRAW;
    }
    if ((gamePlayer1 == GAME_SCISSORS) && (gamePlayer2 == GAME_PAPER)) {
      this.score1++;
      return PLAYER1_WIN;
    }
    if ((gamePlayer1 == GAME_SCISSORS) && (gamePlayer2 == GAME_SCISSORS)) {
      return PLAYER_DRAW;
    }
    if ((gamePlayer1 == GAME_SCISSORS) && (gamePlayer2 == GAME_ROCK)) {
      this.score2++;
      return PLAYER2_WIN;
    }
    if ((gamePlayer1 == GAME_PAPER) && (gamePlayer2 == GAME_PAPER)) {
      return PLAYER_DRAW;
    }
    if ((gamePlayer1 == GAME_PAPER) && (gamePlayer2 == GAME_SCISSORS)) {
      this.score2++;
      return PLAYER2_WIN;
    }
    if ((gamePlayer1 == GAME_PAPER) && (gamePlayer2 == GAME_ROCK)) {
      this.score1++;
      return PLAYER1_WIN;
    }
  }

  /**
   * reset the score
   */
  resetGame() {
    this.score1 = 0;
    this.score2 = 0;
  }

  /**
   * get random integer
   * @param min
   * @param max
   * @returns {any}
     */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * get a random game
   * @returns {number}
   * GAME_ROCK
   * GAME_SCISSORS
   * GAME_PAPER
     */
  getRandomGame() : number {
    return this.getRandomInt(0,2);
  }

}
