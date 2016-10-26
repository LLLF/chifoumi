import { ClickerApp }                      from './app.component';
import { MenuMock, NavMock, PlatformMock } from '../mocks';
import { Page2 }                           from '../pages';

let instance: ClickerApp = null;

describe('ClickerApp', () => {

  beforeEach(() => {
    instance = new ClickerApp((<any> new PlatformMock), (<any> new MenuMock));
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

});
