import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NdisplayPage } from './ndisplay';

@NgModule({
  declarations: [
    NdisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(NdisplayPage),
  ],
})
export class NdisplayPageModule {}
