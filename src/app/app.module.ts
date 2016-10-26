import { NgModule }                        from '@angular/core';
import { IonicApp, IonicModule }           from 'ionic-angular';
import { ClickerApp }                      from './app.component';
import { PagesModule, Page2 }              from '../pages';

@NgModule({
  declarations: [
    ClickerApp,
  ],
  imports: [
    PagesModule,
    IonicModule.forRoot(ClickerApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ClickerApp,
    Page2,
  ],
  providers: [ ],
})

export class AppModule {}
