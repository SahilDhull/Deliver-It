import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';

/**
 * Generated class for the NdisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ndisplay',
  templateUrl: 'ndisplay.html',
})
export class NdisplayPage {
  note: Note = {
    items: '',
    uboi: '',
    cost: undefined,
    loc: '',
    lat: undefined,
    lng: undefined,
    pbit: true,
    ibit: true,
    dboi: '',
    myloc: '',
    upn: '',
    dpn: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private noteListService: NoteListService) {
  }

  ionViewDidLoad() {
    this.note = this.navParams.get('note');
    console.log('ionViewDidLoad NdisplayPage');
  }

}
