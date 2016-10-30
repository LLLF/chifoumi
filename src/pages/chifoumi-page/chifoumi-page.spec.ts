import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { chifoumiPage } from './chifoumi-page';
import { fakeAsync, tick} from "@angular/core/testing/fake_async";

const GAME_ROCK = 0;
const GAME_SCISSORS = 1;
const GAME_PAPER = 2;
const PLAYER1_WIN = 0;
const PLAYER2_WIN = 1;
const PLAYER_DRAW = 2;

let fixture: ComponentFixture<chifoumiPage> = null;
let instance: any = null;
let element: any = null;
let timerCallback;

describe('Pages: chifoumiPage', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([chifoumiPage]);
    fixture = TestBed.createComponent(chifoumiPage);
    instance = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
  });

  it('should create chifoumiPage', async(() => {
    expect(instance).toBeTruthy();
  }));

  it('should call chifoumi.play(ROCK,ROCK) method after click on ROCK button', async(() => {

    spyOn(instance.chifoumi, 'play').and.returnValue(PLAYER_DRAW);
    spyOn(instance.chifoumi, 'getRandomGame').and.returnValue(GAME_ROCK);

    fixture.detectChanges();

    let imgRockElement = element.querySelector('.button_rock');
    imgRockElement.dispatchEvent(new Event('click'));

    expect(instance.chifoumi.getRandomGame).toHaveBeenCalledWith();
    expect(instance.chifoumi.play).toHaveBeenCalledWith(GAME_ROCK, GAME_ROCK);
    expect(instance.gameResult).toEqual(PLAYER_DRAW);
    expect(instance.player1Game).toEqual(GAME_ROCK);
    expect(instance.player2Game).toEqual(GAME_ROCK);

  }));

  it('should reset for a new game', async(() => {

    spyOn(instance.chifoumi, 'resetGame');

    fixture.detectChanges();
 
    let buttonNewGameElement = element.querySelector('.button_new_game');
    buttonNewGameElement.dispatchEvent(new Event('click'));

    expect(instance.chifoumi.resetGame).toHaveBeenCalledWith();
    expect(instance.gameResult).toEqual(-1);
    expect(instance.player1Game).toEqual(-1);
    expect(instance.player2Game).toEqual(-1);
  }));
  

  it('should create a computer vs computer game (ROCK,ROCK)', fakeAsync( () => {

    spyOn(instance.chifoumi, 'getRandomGame').and.returnValue(GAME_ROCK);
    spyOn(instance.chifoumi, 'resetGame');

    fixture.detectChanges();

    expect(instance.computerActionButtonLabel).toEqual("Computer vs computer");

    let button_c_vs_c_Element = element.querySelector('.button_computer_vs_computer');
    button_c_vs_c_Element.dispatchEvent(new Event('click'));

    expect(instance.gameResult).toEqual(-1);
    expect(instance.player1Game).toEqual(-1);
    expect(instance.player2Game).toEqual(-1);
    expect(instance.computerActionButtonLabel).toEqual("STOP");

    tick(2000);

    expect(instance.computerActionButtonLabel).toEqual("STOP");
    expect(instance.chifoumi.resetGame).toHaveBeenCalledWith();
    expect(instance.gameResult).toEqual(PLAYER_DRAW);
    expect(instance.player1Game).toEqual(GAME_ROCK);
    expect(instance.player2Game).toEqual(GAME_ROCK);

    button_c_vs_c_Element.dispatchEvent(new Event('click'));

    expect(instance.computerActionButtonLabel).toEqual("Computer vs computer");
    expect(instance.computerGameIntervalId).toEqual(null);
    expect(instance.chifoumi.resetGame).toHaveBeenCalledWith();
    expect(instance.gameResult).toEqual(-1);
    expect(instance.player1Game).toEqual(-1);
    expect(instance.player2Game).toEqual(-1);
  }));


  it('should create a computer vs computer game (ROCK,ROCK)', fakeAsync( () => {

    spyOn(instance.chifoumi, 'getRandomGame').and.returnValue(GAME_ROCK);
    spyOn(instance.chifoumi, 'resetGame');

    fixture.detectChanges();

    expect(instance.computerActionButtonLabel).toEqual("Computer vs computer");

    let button_c_vs_c_Element = element.querySelector('.button_computer_vs_computer');
    button_c_vs_c_Element.dispatchEvent(new Event('click'));

    expect(instance.gameResult).toEqual(-1);
    expect(instance.player1Game).toEqual(-1);
    expect(instance.player2Game).toEqual(-1);
    expect(instance.computerActionButtonLabel).toEqual("STOP");

    tick(2000);

    expect(instance.computerActionButtonLabel).toEqual("STOP");
    expect(instance.chifoumi.resetGame).toHaveBeenCalledWith();
    expect(instance.gameResult).toEqual(PLAYER_DRAW);
    expect(instance.player1Game).toEqual(GAME_ROCK);
    expect(instance.player2Game).toEqual(GAME_ROCK);

    button_c_vs_c_Element.dispatchEvent(new Event('click'));

    expect(instance.computerActionButtonLabel).toEqual("Computer vs computer");
    expect(instance.computerGameIntervalId).toEqual(null);
    expect(instance.chifoumi.resetGame).toHaveBeenCalledWith();
    expect(instance.gameResult).toEqual(-1);
    expect(instance.player1Game).toEqual(-1);
    expect(instance.player2Game).toEqual(-1);
  }));


});
