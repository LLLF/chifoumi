'use strict';

import { Component } from '@angular/core';
import {
    chifoumi, GAME_SCISSORS, GAME_ROCK, GAME_PAPER, PLAYER1_WIN, PLAYER2_WIN,
    PLAYER_DRAW
} from "../../services/chifoumi";
import {Platform} from "ionic-angular/index";
import Timer = NodeJS.Timer;
import { MediaPlugin } from 'ionic-native';

const computerGameDelay: number = 2000;

@Component({
  templateUrl: 'chifoumi-page.html',
})

export class chifoumiPage {
  
  chifoumi: chifoumi;
  gameResult: number = -1;
  player1Game: number = -1;
  player2Game: number = -1;
  labelGameResult: string = '';
  mediaWinner: MediaPlugin = null;
  srcImgRock: string;
  srcImgPaper: string;
  srcImgScissors: string;
  srcImgPlayer1Game: string;
  srcImgPlayer2Game: string;

  //use for computer vs computer
  computerGameIntervalId: Timer = null;
  computerActionButtonLabel: string = "Computer vs computer";

  constructor(private platform: Platform) {
    this.chifoumi = new chifoumi();
    if (this.platform.is('android')) {
      this.platform.ready().then(() => {
        this.mediaWinner = new MediaPlugin(this.getMediaURL('sound/win.wav'));
        console.log('media ok');
      }).catch(err=> {
        console.log(err);
      });
    }
    this.srcImgRock = this.getMediaURL('pic/rock_button.jpg');
    this.srcImgPaper = this.getMediaURL('pic/paper_button.jpg');
    this.srcImgScissors = this.getMediaURL('pic/scissors_button.jpg');
    this.initLabelGameResult();
    this.resetEvent();
  }

  public title: string = 'Chifoumi';

  public onGainChange(): void {
    return;
  }

  playWinnerSound() {
    this.platform.ready().then(() => {
      this.mediaWinner.play();
    }).catch(err=> {
      console.log(err);
    });
  }

  scissorsEvent() {
    this.player1Game = GAME_SCISSORS;
    this.player2Game = this.chifoumi.getRandomGame();
    this.gameResult = this.chifoumi.play(GAME_SCISSORS, this.player2Game);
    this.initSrcImgPlayer1Game();
    this.initSrcImgPlayer2Game();
    this.initLabelGameResult();
    this.computerActionButtonLabel = "Computer vs computer";
    this.initLabelGameResult();
    if (this.platform.is('android') && (this.gameResult == PLAYER1_WIN) && (this.mediaWinner != null) ) {
      this.playWinnerSound();
    }
  }
  
  rockEvent() {
    this.player1Game = GAME_ROCK;
    this.player2Game = this.chifoumi.getRandomGame();
    this.gameResult = this.chifoumi.play(GAME_ROCK, this.player2Game);
    this.initSrcImgPlayer1Game();
    this.initSrcImgPlayer2Game();
    this.initLabelGameResult();
    if (this.platform.is('android') && (this.gameResult == PLAYER1_WIN) && (this.mediaWinner != null) ) {
      this.playWinnerSound();
    }
  }

  paperEvent() {
    this.player1Game = GAME_PAPER;
    this.player2Game = this.chifoumi.getRandomGame();
    this.gameResult = this.chifoumi.play(GAME_PAPER, this.player2Game);
    this.initSrcImgPlayer1Game();
    this.initSrcImgPlayer2Game();
    this.initLabelGameResult();
    if (this.platform.is('android') && (this.gameResult == PLAYER1_WIN) && (this.mediaWinner != null) ) {
      this.playWinnerSound();
    }
  }

  /*
   * resetEvent -> the game
   */
  resetEvent() {
    this.chifoumi.resetGame();
    this.gameResult = -1;
    this.player1Game = -1;
    this.player2Game = -1;
  }

  /*
   * set the media URL switch the platform
   */
  getMediaURL(mediaPath) {
    if (this.platform.is('android')) {
      return "/android_asset/www/assets/" + mediaPath;
    }
    return "../../assets/" + mediaPath;
  }

  /*
   * init the game label
   */
  initLabelGameResult() {
    this.labelGameResult = 'Play the game';
    switch (this.gameResult) {
      case PLAYER1_WIN :
        this.labelGameResult = 'Player 1 win';
        break;
      case PLAYER2_WIN :
        this.labelGameResult = 'Player 2 win';
        break;
      case PLAYER_DRAW :
        this.labelGameResult = 'Draw';
        break;
    }
  }

  /*
   * init path of player1 game
   */
  initSrcImgPlayer1Game() {
    switch (this.player1Game) {
      case GAME_SCISSORS :
        this.srcImgPlayer1Game = this.getMediaURL('pic/scissors_p1.jpg');
        break;
      case GAME_PAPER :
        this.srcImgPlayer1Game = this.getMediaURL('pic/paper_p1.jpg');
        break;
      case GAME_ROCK :
        this.srcImgPlayer1Game = this.getMediaURL('pic/rock_p1.jpg');
        break;
    }
  }

  /*
   * init path of player2 game
   */
  initSrcImgPlayer2Game() {
    switch (this.player2Game) {
      case GAME_SCISSORS :
        this.srcImgPlayer2Game = this.getMediaURL('pic/scissors_p1.jpg');
        break;
      case GAME_PAPER :
        this.srcImgPlayer2Game = this.getMediaURL('pic/paper_p1.jpg');
        break;
      case GAME_ROCK :
        this.srcImgPlayer2Game = this.getMediaURL('pic/rock_p1.jpg');
        break;
    }
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
        this.initSrcImgPlayer1Game();
        this.initSrcImgPlayer2Game();
        this.initLabelGameResult();
      }, computerGameDelay);

    } else {  // Stop the computer vs computer game
      clearInterval(this.computerGameIntervalId);
      this.computerGameIntervalId = null;
      this.computerActionButtonLabel = "Computer vs computer";
      this.resetEvent();
    }
  }
}
