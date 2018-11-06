import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';
import 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  noteList: Observable<Note[]>
  currentdboi: string
  constructor(public menuCtrl: MenuController,
    private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, private noteListService: NoteListService) {
    this.noteList = this.noteListService.getNoteList()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });

      this.afAuth.authState.subscribe(data => {
        this.currentdboi = data.email;

        console.log(this.currentdboi);
      })
  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        console.log(data.email);
        // this.toast.create({
        //   message: 'Welcome to the App',
        //   duration: 3000
        // }).present();
      }
      else{
        this.toast.create({
          message: 'Could not find Authentication Details',
          duration: 3000
        }).present();
      }
    })
  }

  openMenu(){
    this.menuCtrl.open();
  }
}
