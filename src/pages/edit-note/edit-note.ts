import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    myloc: '',
    upn: '',
    dpn: ''
  };

  constructor(
    public navCtrl: NavController, private toast: ToastController,
    public navParams: NavParams,
    private noteListService: NoteListService) {
  }

  ionViewDidLoad() {
    this.note = this.navParams.get('note');
  }

  updateNote(note: Note) {
    if((note.items==null)||(note.upn==null)||(note.cost==null)){
      this.toast.create({
        message: 'Fill all details',
        duration: 2000
      }).present();
    }
    else{
      var number = /^[0-9]{10}$/.test(note.upn);
      if(!number){
        this.toast.create({
          message: 'Invalid Contact',
          duration: 2000
        }).present();
      }
      else{
        if(this.note.pbit==false){
          this.toast.create({
            message: 'Cannot Update, Order already accepted',
            duration: 2000
          }).present();
          this.navCtrl.setRoot('HomePage');
        }
        else{
          this.noteListService.updateNote(note).then(() => {
            this.navCtrl.setRoot('HomePage');
          })
        }
      }
    }
    
    
  }

  removeNote(note: Note) {
    if(this.note.pbit==false){
      this.toast.create({
        message: 'Cannot Update, Order already accepted',
        duration: 2000
      }).present();
      this.navCtrl.setRoot('HomePage');
    }
    else{
      this.noteListService.removeNote(note).then(() => {
        this.navCtrl.setRoot('HomePage');
      })
    }
  }

  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
