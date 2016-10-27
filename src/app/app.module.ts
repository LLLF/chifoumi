import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { ClickerApp } from './app.component';
import { PagesModule } from '../pages';
import { chifoumiPage } from "../pages/chifoumi-page/chifoumi-page";

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
    chifoumiPage,
  ],
  providers: [ ],
})

export class AppModule {}
