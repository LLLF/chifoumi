'use strict';

import { Component } from '@angular/core';
import {
    chifoumi, GAME_SCISSORS, GAME_ROCK, GAME_PAPER, PLAYER1_WIN, PLAYER2_WIN,
    PLAYER_DRAW
} from "../../services/chifoumi";
import {Platform} from "ionic-angular/index";
import Timer = NodeJS.Timer;
//import { MediaPlugin } from 'ionic-native';

@Component({
  templateUrl: 'chifoumi-page.html',
})

export class chifoumiPage {
  
  chifoumi: chifoumi;
  gameResult: number;
  player1Game: number;
  player2Game: number;

  //use for computer vs computer
  computerGameIntervalId: Timer;
  computerActionButtonLabel: string;

  constructor(private platform: Platform) {
    this.chifoumi = new chifoumi();
    this.computerGameIntervalId = null;
    this.computerActionButtonLabel = "Computer vs computer";
    this.resetEvent();
  }

  public title: string = 'Chifoumi';

  public onGainChange(): void {
    return;
  }

  scissorsEvent() {
    this.player1Game = GAME_SCISSORS;
    this.player2Game = this.chifoumi.getRandomGame();
    this.gameResult = this.chifoumi.play(GAME_SCISSORS, this.player2Game);
    this.computerActionButtonLabel = "Computer vs computer";
  }

  rockEvent() {
    this.player1Game = GAME_ROCK;
    this.player2Game = this.chifoumi.getRandomGame();
    this.gameResult = this.chifoumi.play(GAME_ROCK, this.player2Game);
  }

  paperEvent() {
    this.player1Game = GAME_PAPER;
    this.player2Game = this.chifoumi.getRandomGame();
    this.gameResult = this.chifoumi.play(GAME_PAPER, this.player2Game);
  }

  resetEvent() {
    this.chifoumi.resetGame();
    this.gameResult = -1;
    this.player1Game = -1;
    this.player2Game = -1;
  }

  getMediaURL(mediaPath) {
    if (this.platform.is('android')) {
      return "/android_asset/www/assets/" + mediaPath;
    }
    return "../../assets/" + mediaPath;
  }

  getLabelGameResult() {
    switch (this.gameResult) {
      case PLAYER1_WIN :
        //if (this.platform.is('android'))new MediaPlugin(this.getMediaURL('sound/win.wav')).play();
        return 'Player 1 win';
      case PLAYER2_WIN :
        //if (this.platform.is('android'))new MediaPlugin(this.getMediaURL('sound/loose.wav')).play();
        return 'Player 2 win';
      case PLAYER_DRAW :
        return 'Draw';
    }
    return 'Play the game';
  }

  getSrcImgPlayer1Game(playerGame: number) {
    switch (playerGame) {
      case GAME_SCISSORS :
        return this.getMediaURL('pic/scissors_p1.jpg');
      case GAME_PAPER :
        return this.getMediaURL('pic/paper_p1.jpg');
      case GAME_ROCK :
        return this.getMediaURL('pic/rock_p1.jpg');
    }
  }

  getSrcImgPlayer2Game(playerGame: number) {
    switch (playerGame) {
      case GAME_SCISSORS :
        return this.getMediaURL('pic/scissors_p2.jpg');
      case GAME_PAPER :
        return this.getMediaURL('pic/paper_p2.jpg');
      case GAME_ROCK :
        return this.getMediaURL('pic/rock_p2.jpg');
    }
  }

  getSrcImgRock() {
    return this.getMediaURL('pic/rock_button.jpg');
  }
  getSrcImgPaper() {
    return this.getMediaURL('pic/paper_button.jpg');
  }
  getSrcImgScissors() {
    return this.getMediaURL('pic/scissors_button.jpg');
  }

  /**
   * Start or Stop a computer vs computer game
   */
  computerEvent() {

    if (this.computerGameIntervalId == null) {  // Start game computer VS computer

      this.resetEvent();
      this.computerActionButtonLabel = "STOP";
      this.computerGameIntervalId = setInterval(() => {
        this.player1Game = this.chifoumi.getRandomGame();
        this.player2Game = this.chifoumi.getRandomGame();
        this.gameResult = this.chifoumi.play(this.player1Game, this.player2Game);
      }, 2000);

    } else {  // Stop the computer vs computer game
      clearInterval(this.computerGameIntervalId);
      this.computerGameIntervalId = null;
      this.computerActionButtonLabel = "Computer vs computer";
      this.resetEvent();
    }
  }
}
