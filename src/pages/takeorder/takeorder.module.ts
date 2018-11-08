import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakeorderPage } from './takeorder';

@NgModule({
  declarations: [
    TakeorderPage,
  ],
  imports: [
    IonicPageModule.forChild(TakeorderPage),
  ],
})
export class TakeorderPageModule {}
