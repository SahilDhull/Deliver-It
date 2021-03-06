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

     if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition(position=> {
        console.log('using navigator');
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        this.mylat = position.coords.latitude;
        this.mylng = position.coords.longitude;

        var j = 0;
        this.noteList.subscribe(notes => {
          
          for(var i=0;i<notes.length;i++){
            var mylocation = L.latLng(this.mylat,this.mylng);
            var location = L.latLng(notes[i].lat,notes[i].lng);
            var distance = L.latLng(mylocation).distanceTo(location);
            if(distance<100){
              this.myVar[j] = notes[i];
              j++;
            }
            
          }
        });



      }, error => {
        console.log(error);
      }, options);
    }

  }

}
