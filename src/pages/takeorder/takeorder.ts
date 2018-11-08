import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { NoteListService } from '../../services/note-list.service';
import { Observable, Subscription } from 'rxjs';
import { Note } from '../../model/note/note.model';
import firebase, { database } from 'firebase';
import 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';
import L, { LatLngExpression } from 'leaflet';

/**
 * Generated class for the TakeorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-takeorder',
  templateUrl: 'takeorder.html',
})
export class TakeorderPage {

  noteList: Observable<Note[]>
  myVar : Note[] = [];
  noteListSubscription: Subscription;
  currentdboi: string
  mylat: number;
  mylng: number;
  public items: Array<any> = [];
public itemRef: firebase.database.Reference = firebase.database().ref('/items');
  constructor(public menuCtrl: MenuController,private geolocation: Geolocation,
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

      
      // console.log(this.noteList);
      
      this.noteList.subscribe(notes => {
        for(var i=0;i<notes.length;i++){
          this.myVar[i] = notes[i];
        }
      });

  }

  



  ionViewDidLoad() {
    console.log('ionViewDidLoad TakeorderPage');
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      this.mylat = resp.coords.latitude
      this.mylng = resp.coords.longitude
      console.log("===>>" + resp.coords.latitude);
      console.log("===>>" + resp.coords.longitude);
      console.log("===>>" +this.mylng);
     })
     .catch((error) => {
       console.log('Error getting location', error);
     });

     if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition(position=> {
        console.log('using navigator');
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      }, error => {
        console.log(error);
      }, options);
    }
  }

}
