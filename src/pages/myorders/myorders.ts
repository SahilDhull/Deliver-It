import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';
import 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the MyordersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html',
})
export class MyordersPage {

  noteList: Observable<Note[]>
  currentuboi: string 
  
  public aColor: string = "#fff";
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
        this.currentuboi = data.email;

        console.log(this.currentuboi);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyordersPage');
  }

}
