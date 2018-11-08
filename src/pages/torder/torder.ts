import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { NoteListService } from '../../services/note-list.service';
import { Observable, Subscription } from 'rxjs';
import { Note } from '../../model/note/note.model';
import firebase, { database } from 'firebase';


/**
 * Generated class for the TakeorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-torder',
  templateUrl: 'torder.html',
})
export class TorderPage {

  noteList: Observable<Note[]>
  myVar : Note[] = [];
  noteListSubscription: Subscription;
  currentdboi: string
  mylat: number;
  mylng: number;
  public items: Array<any> = [];
public itemRef: firebase.database.Reference = firebase.database().ref('/items');
  constructor(public menuCtrl: MenuController,
    private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, private noteListService: NoteListService,
    public navParams: NavParams,) {
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

      
      // console.log(this.noteList);
      
      

  }

  



  ionViewDidLoad() {
    console.log('ionViewDidLoad TakeorderPage');

     
       
  }

}
