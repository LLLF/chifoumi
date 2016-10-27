import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TestUtils }                        from '../../test';
import { chifoumiPage }                            from './chifoumi-page';

let fixture: ComponentFixture<chifoumiPage> = null;
let instance: any = null;

describe('Pages: chifoumiPage', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([chifoumiPage]);
    fixture = TestBed.createComponent(chifoumiPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should create chifoumiPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
