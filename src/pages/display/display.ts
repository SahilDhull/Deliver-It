import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';


// @ViewChild('myInput') myInput: ElementRef;
@IonicPage()
@Component({
  selector: 'page-display',
  templateUrl: 'display.html',
})
export class DisplayPage {
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
    console.log(this.note.items);
  }

  isReadonly() {
    return this.isReadonly;   //return true/false 
  }


// resize() {
//   this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
// }

}
