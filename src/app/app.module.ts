import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PagesModule } from '../pages';
import { chifoumiPage } from "../pages/chifoumi-page/chifoumi-page";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    PagesModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    chifoumiPage,
  ],
  providers: [ ],
})

export class AppModule {}
