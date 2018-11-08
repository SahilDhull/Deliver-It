import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the AcceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accept',
  templateUrl: 'accept.html',
})
export class AcceptPage {

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

  currentdboi: string

  constructor(private afAuth: AngularFireAuth,private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams,
    private noteListService: NoteListService) {
      this.afAuth.authState.subscribe(data => {
        this.currentdboi = data.email;

        console.log(this.currentdboi);
      })
  }

  ionViewDidLoad() {
    this.note = this.navParams.get('note');
    console.log("-------------------------------");
    console.log(this.note.items);
  }

  isReadonly() {
    return this.isReadonly;   //return true/false 
  }

  accept(note : Note){
    console.log("coming here");
    if(this.note.dpn==null){
      this.toast.create({
        message: 'Fill in Contact Details',
        duration: 2000
      }).present();
    }
    else{
      var number = /^[0-9]{10}$/.test(note.dpn);
      if(!number){
        this.toast.create({
          message: 'Invalid Contact',
          duration: 2000
        }).present();
      }
      else{
        this.note.dboi = this.currentdboi;
        this.note.pbit = false;
        this.noteListService.updateNote(note).then(() => {
          this.navCtrl.setRoot('HomePage');
        })
      }
    }
    
  }

}
