'use strict';

import { Component } from '@angular/core';
import {
    chifoumi, GAME_SCISSORS, GAME_ROCK, GAME_PAPER, PLAYER1_WIN, PLAYER2_WIN,
    PLAYER_DRAW
} from "../../services/chifoumi";
import {Platform} from "ionic-angular/index";
import Timer = NodeJS.Timer;
import { MediaPlugin } from 'ionic-native';

const COMPUTER_GAME_DELAY = 2000;
const LABEL_BUTTON_COMPUTER_VS_COMPUTER = "Computer vs computer";
const LABEL_BUTTON_STOP = "STOP";
const LABEL_GAME_RESULT_PLAY_THE_GAME = 'Play the game';
const LABEL_GAME_RESULT_PLAYER1_WIN = 'Player 1 win';
const LABEL_GAME_RESULT_PLAYER2_WIN = 'Player 2 win';
const LABEL_GAME_RESULT_DRAW = 'Draw';
const SRC_PIC_ROCK_BUTTON = 'pic/rock_button.jpg';
const SRC_PIC_PAPER_BUTTON = 'pic/paper_button.jpg';
const SRC_PIC_SCISSORS_BUTTON = 'pic/scissors_button.jpg';
const SRC_PIC_PLAYER2_GAME_SCISSORS = 'pic/scissors_p2.jpg';
const SRC_PIC_PLAYER2_GAME_PAPER = 'pic/paper_p2.jpg';
const SRC_PIC_PLAYER2_GAME_ROCK = 'pic/rock_p2.jpg';
const SRC_PIC_PLAYER1_GAME_SCISSORS = 'pic/scissors_p1.jpg';
const SRC_PIC_PLAYER1_GAME_PAPER = 'pic/paper_p1.jpg';
const SRC_PIC_PLAYER1_GAME_ROCK = 'pic/rock_p1.jpg';
const SRC_WAV_WIN = 'sound/win.wav';

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
  computerActionButtonLabel: string = LABEL_BUTTON_COMPUTER_VS_COMPUTER;

  constructor(private platform: Platform) {
    this.chifoumi = new chifoumi();
    if (this.platform.is('android')) {
      this.platform.ready().then(() => {
        this.mediaWinner = new MediaPlugin(this.getMediaURL(SRC_WAV_WIN));
      }).catch(err=> {
        console.log(err);
      });
    }
    
    this.srcImgRock = this.getMediaURL(SRC_PIC_ROCK_BUTTON);
    this.srcImgPaper = this.getMediaURL(SRC_PIC_PAPER_BUTTON);
    this.srcImgScissors = this.getMediaURL(SRC_PIC_SCISSORS_BUTTON);
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
    this.computerActionButtonLabel = LABEL_BUTTON_COMPUTER_VS_COMPUTER;
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
    this.labelGameResult = LABEL_GAME_RESULT_PLAY_THE_GAME;
    switch (this.gameResult) {
      case PLAYER1_WIN :
        this.labelGameResult = LABEL_GAME_RESULT_PLAYER1_WIN;
        break;
      case PLAYER2_WIN :
        this.labelGameResult = LABEL_GAME_RESULT_PLAYER2_WIN;
        break;
      case PLAYER_DRAW :
        this.labelGameResult = LABEL_GAME_RESULT_DRAW;
        break;
    }
  }

  /*
   * init path of player1 game
   */
  initSrcImgPlayer1Game() {
    switch (this.player1Game) {
      case GAME_SCISSORS :
        this.srcImgPlayer1Game = this.getMediaURL(SRC_PIC_PLAYER1_GAME_SCISSORS);
        break;
      case GAME_PAPER :
        this.srcImgPlayer1Game = this.getMediaURL(SRC_PIC_PLAYER1_GAME_PAPER);
        break;
      case GAME_ROCK :
        this.srcImgPlayer1Game = this.getMediaURL(SRC_PIC_PLAYER1_GAME_ROCK);
        break;
    }
  }

  /*
   * init path of player2 game
   */
  initSrcImgPlayer2Game() {
    switch (this.player2Game) {
      case GAME_SCISSORS :
        this.srcImgPlayer2Game = this.getMediaURL(SRC_PIC_PLAYER2_GAME_SCISSORS);
        break;
      case GAME_PAPER :
        this.srcImgPlayer2Game = this.getMediaURL(SRC_PIC_PLAYER2_GAME_PAPER);
        break;
      case GAME_ROCK :
        this.srcImgPlayer2Game = this.getMediaURL(SRC_PIC_PLAYER2_GAME_ROCK);
        break;
    }
  }


  /**
   * Start or Stop a computer vs computer game
   */
  computerEvent() {

    if (this.computerGameIntervalId == null) {  // Start game computer VS computer

      this.resetEvent();
      this.computerActionButtonLabel = LABEL_BUTTON_STOP;
      this.computerGameIntervalId = setInterval(() => {
        this.player1Game = this.chifoumi.getRandomGame();
        this.player2Game = this.chifoumi.getRandomGame();
        this.gameResult = this.chifoumi.play(this.player1Game, this.player2Game);
        this.initSrcImgPlayer1Game();
        this.initSrcImgPlayer2Game();
        this.initLabelGameResult();
      }, COMPUTER_GAME_DELAY);

    } else {  // Stop the computer vs computer game
      clearInterval(this.computerGameIntervalId);
      this.computerGameIntervalId = null;
      this.computerActionButtonLabel = LABEL_BUTTON_COMPUTER_VS_COMPUTER;
      this.resetEvent();
      this.initLabelGameResult();
    }
  }
}
