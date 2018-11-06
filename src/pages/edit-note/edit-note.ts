import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';

@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage {

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
    myloc: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private noteListService: NoteListService) {
  }

  ionViewDidLoad() {
    this.note = this.navParams.get('note');
  }

  updateNote(note: Note) {
    this.noteListService.updateNote(note).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

  removeNote(note: Note) {
    this.noteListService.removeNote(note).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }
}
