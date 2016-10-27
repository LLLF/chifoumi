'use strict';

import { Component } from '@angular/core';
import {
    chifoumi, GAME_SCISSORS, GAME_ROCK, GAME_PAPER, PLAYER1_WIN, PLAYER2_WIN,
    PLAYER_DRAW
} from "../../services/chifoumi";
import {Platform} from "ionic-angular/index";
import { MediaPlugin } from 'ionic-native';

@Component({
  templateUrl: 'chifoumi-page.html',
})

export class chifoumiPage {
  
  chifoumi: chifoumi;
  gameResult: number;
  player1Game: number;
  player2Game: number;

  constructor(private platform: Platform) {
    this.chifoumi = new chifoumi();
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
        if (this.platform.is('android'))new MediaPlugin(this.getMediaURL('sound/win.wav')).play();
        return 'Player 1 win';
      case PLAYER2_WIN :
        if (this.platform.is('android'))new MediaPlugin(this.getMediaURL('sound/loose.wav')).play();
        return 'Player 2 win';
      case PLAYER_DRAW :
        return 'Draw';
    }
    return 'Play the game';
  }

  getLabelPlayerGame(playerGame: number) {
    switch (playerGame) {
      case GAME_SCISSORS :
        return 'SCISSORS';
      case GAME_PAPER :
        return 'PAPER';
      case GAME_ROCK :
        return 'ROCK';
    }
    return 'XXX';
  }
}
