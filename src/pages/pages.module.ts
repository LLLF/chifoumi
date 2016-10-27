import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { chifoumiPage } from "./chifoumi-page/chifoumi-page";

@NgModule({
  declarations: [
    chifoumiPage,
  ],
  imports: [ IonicModule ],
  exports: [
    chifoumiPage,
  ],
  entryComponents: [],
  providers: [ ],
})

export class PagesModule {}
