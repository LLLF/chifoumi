import { MyApp } from './app.component';
import { MenuMock, NavMock, PlatformMock } from '../mocks';
import { chifoumiPage } from "../pages/chifoumi-page/chifoumi-page";

let myApp: MyApp = null;

describe('MyApp', () => {

  beforeEach(() => {
    myApp = new MyApp((<any> new PlatformMock), (<any> new MenuMock));
    myApp['nav'] = (<any>new NavMock());
  });

  it('initialises with two possible pages', () => {
    expect(myApp['pages'].length).toEqual(1);
  });

  it('initialises with a root page', () => {
    expect(myApp['rootPage']).not.toBe(null);
  });

  it('initialises with an app', () => {
    expect(myApp['app']).not.toBe(null);
  });

  it('opens chifoumiPage', () => {
    spyOn(myApp['menu'], 'close');
    spyOn(myApp['nav'], 'setRoot');
    myApp.openPage(myApp['pages'][0]);
    expect(myApp['menu']['close']).toHaveBeenCalled();
    expect(myApp['nav'].setRoot).toHaveBeenCalledWith(chifoumiPage);
  });

});
