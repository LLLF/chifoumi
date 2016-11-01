import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { chifoumiPage } from './chifoumi-page';
import { fakeAsync, tick} from "@angular/core/testing/fake_async";

const GAME_ROCK = 0;
const PLAYER_DRAW = 2;
const COMPUTER_GAME_DELAY = 2000;
const LABEL_BUTTON_COMPUTER_VS_COMPUTER = "Computer vs computer";
const LABEL_BUTTON_STOP = "STOP";
const LABEL_GAME_RESULT_PLAY_THE_GAME = 'Play the game';
const LABEL_GAME_RESULT_DRAW = 'Draw';
const SRC_PIC_PLAYER2_GAME_ROCK = 'pic/rock_p2.jpg';
const SRC_PIC_PLAYER1_GAME_ROCK = 'pic/rock_p1.jpg';


let fixture: ComponentFixture<chifoumiPage> = null;
let instance: any = null;
let element: any = null;

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

  it('should create a computer vs computer game (ROCK,ROCK)', fakeAsync( () => {

    spyOn(instance.chifoumi, 'getRandomGame').and.returnValue(GAME_ROCK);
    spyOn(instance.chifoumi, 'resetGame');

    fixture.detectChanges();

    expect(instance.computerActionButtonLabel).toEqual(LABEL_BUTTON_COMPUTER_VS_COMPUTER);

    let button_c_vs_c_Element = element.querySelector('.button_computer_vs_computer');
    button_c_vs_c_Element.dispatchEvent(new Event('click'));

    expect(instance.gameResult).toEqual(-1);
    expect(instance.player1Game).toEqual(-1);
    expect(instance.player2Game).toEqual(-1);
    expect(instance.computerActionButtonLabel).toEqual(LABEL_BUTTON_STOP);

    tick(COMPUTER_GAME_DELAY);

    expect(instance.computerActionButtonLabel).toEqual(LABEL_BUTTON_STOP);
    expect(instance.chifoumi.resetGame).toHaveBeenCalledWith();
    expect(instance.gameResult).toEqual(PLAYER_DRAW);
    expect(instance.player1Game).toEqual(GAME_ROCK);
    expect(instance.player2Game).toEqual(GAME_ROCK);
    expect(instance.labelGameResult).toEqual('Draw');
    expect(instance.srcImgPlayer1Game).toEqual('../../assets/'+SRC_PIC_PLAYER1_GAME_ROCK);
    expect(instance.srcImgPlayer2Game).toEqual('../../assets/'+SRC_PIC_PLAYER2_GAME_ROCK);

    button_c_vs_c_Element.dispatchEvent(new Event('click'));  //stop get clicked !

    expect(instance.computerActionButtonLabel).toEqual(LABEL_BUTTON_COMPUTER_VS_COMPUTER);
    expect(instance.computerGameIntervalId).toEqual(null);
    expect(instance.chifoumi.resetGame).toHaveBeenCalledWith();
    expect(instance.labelGameResult).toEqual(LABEL_GAME_RESULT_PLAY_THE_GAME);
    expect(instance.gameResult).toEqual(-1);
    expect(instance.player1Game).toEqual(-1);
    expect(instance.player2Game).toEqual(-1);

  }));

  it('should call chifoumi.play(ROCK,ROCK) method after click on ROCK button', async(() => {

    spyOn(instance.chifoumi, 'play').and.returnValue(PLAYER_DRAW);
    spyOn(instance.chifoumi, 'getRandomGame').and.returnValue(GAME_ROCK);

    fixture.detectChanges();

    let imgRockElement = element.querySelector('.button_rock');
    imgRockElement.dispatchEvent(new Event('click'));

    expect(instance.chifoumi.getRandomGame).toHaveBeenCalledWith();
    expect(instance.labelGameResult).toEqual(LABEL_GAME_RESULT_DRAW);
    expect(instance.srcImgPlayer1Game).toEqual('../../assets/'+SRC_PIC_PLAYER1_GAME_ROCK);
    expect(instance.srcImgPlayer2Game).toEqual('../../assets/'+SRC_PIC_PLAYER2_GAME_ROCK);
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

});
