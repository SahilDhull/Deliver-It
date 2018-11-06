import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../model/user";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor( private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad RegisterPage');
  // }

  async register(user: User){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,
      user.password)
      .then( res=>{
        let user = firebase.auth().currentUser;
        user.sendEmailVerification();
        this.navCtrl.setRoot('LoginPage');
      })
      console.log(result);
      // this.navCtrl.setRoot('LoginPage');
    }
    catch(e){
      console.error(e);
      this.toast.create({
        message: 'Invalid Email/Password',
        duration: 3000
      }).present();
    }
  }

}
