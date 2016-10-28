import { MyApp } from './app.component';
import { MenuMock, NavMock, PlatformMock } from '../mocks';
import { chifoumiPage } from "../pages/chifoumi-page/chifoumi-page";

let instance: MyApp = null;

describe('MyApp', () => {

  beforeEach(() => {
    instance = new MyApp((<any> new PlatformMock), (<any> new MenuMock));
    instance['nav'] = (<any>new NavMock());
  });

  it('initialises with two possible pages', () => {
    expect(instance['pages'].length).toEqual(1);
  });

  it('initialises with a root page', () => {
    expect(instance['rootPage']).not.toBe(null);
  });

  it('initialises with an app', () => {
    expect(instance['app']).not.toBe(null);
  });

  it('opens a page', () => {
    spyOn(instance['menu'], 'close');
    spyOn(instance['nav'], 'setRoot');
    instance.openPage(instance['pages'][0]);
    expect(instance['menu']['close']).toHaveBeenCalled();
    expect(instance['nav'].setRoot).toHaveBeenCalledWith(chifoumiPage);
  });

});
