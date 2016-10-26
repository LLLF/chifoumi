import {chifoumi} from "./chifoumi";
const GAME_ROCK = 0;
const GAME_SCISSORS = 1;
const GAME_PAPER = 2;
const PLAYER1_WIN = 0;
const PLAYER2_WIN = 1;
const PLAYER_DRAW = 2;

describe('Chifoumi', function() {

  it('should test chifoumi games', () => {
      let _chifoumi = new chifoumi();
      expect(_chifoumi.play(GAME_ROCK, GAME_PAPER)).toEqual(PLAYER2_WIN);
      expect(_chifoumi.score1).toEqual(0);
      expect(_chifoumi.score2).toEqual(1);
      expect(_chifoumi.play(GAME_ROCK, GAME_SCISSORS)).toEqual(PLAYER1_WIN);
      expect(_chifoumi.score2).toEqual(1);
      expect(_chifoumi.score1).toEqual(1);
      expect(_chifoumi.play(GAME_ROCK, GAME_ROCK)).toEqual(PLAYER_DRAW);
      expect(_chifoumi.score2).toEqual(1);
      expect(_chifoumi.score1).toEqual(1);

      expect(_chifoumi.play(GAME_SCISSORS, GAME_SCISSORS)).toEqual(PLAYER_DRAW);
      expect(_chifoumi.score2).toEqual(1);
      expect(_chifoumi.score1).toEqual(1);
      expect(_chifoumi.play(GAME_SCISSORS, GAME_PAPER)).toEqual(PLAYER1_WIN);
      expect(_chifoumi.score1).toEqual(2);
      expect(_chifoumi.score2).toEqual(1);
      expect(_chifoumi.play(GAME_SCISSORS, GAME_ROCK)).toEqual(PLAYER2_WIN);
      expect(_chifoumi.score1).toEqual(2);
      expect(_chifoumi.score2).toEqual(2);

      expect(_chifoumi.play(GAME_PAPER, GAME_PAPER)).toEqual(PLAYER_DRAW);
      expect(_chifoumi.score2).toEqual(2);
      expect(_chifoumi.score1).toEqual(2);
      expect(_chifoumi.play(GAME_PAPER, GAME_SCISSORS)).toEqual(PLAYER2_WIN);
      expect(_chifoumi.score1).toEqual(2);
      expect(_chifoumi.score2).toEqual(3);
      expect(_chifoumi.play(GAME_PAPER, GAME_ROCK)).toEqual(PLAYER1_WIN);
      expect(_chifoumi.score1).toEqual(3);
      expect(_chifoumi.score2).toEqual(3);

      for (let i = 0; i < 50; i++) {
        let nb=_chifoumi.getRandomGame();
        expect((nb == GAME_PAPER) || (nb == GAME_ROCK) || (nb == GAME_SCISSORS) ).toBeTruthy();
      }

  });
});
