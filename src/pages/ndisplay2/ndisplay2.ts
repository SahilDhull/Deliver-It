import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';


/**
 * Generated class for the Ndisplay2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ndisplay2',
  templateUrl: 'ndisplay2.html',
})
export class Ndisplay2Page {
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
    console.log('ionViewDidLoad Ndisplay2Page');
  }

  updateNote(note: Note) {
    note.ibit = false;
    this.noteListService.updateNote(note).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

}
