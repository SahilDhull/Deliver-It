import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TorderPage } from './torder';

@NgModule({
  declarations: [
    TorderPage,
  ],
  imports: [
    IonicPageModule.forChild(TorderPage),
  ],
})
export class TorderPageModule {}
