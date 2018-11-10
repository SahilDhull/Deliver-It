import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(public menuCtrl: MenuController,
    private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams,) {
      this.menuCtrl.enable(false,'mymenu');
  }

  async login(user: User){
    try{
      // const result = 
      this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(user.email,user.password).then( data => {
        let user = firebase.auth().currentUser;
        if(user.emailVerified){
          this.navCtrl.setRoot('HomePage');
        }
        else{
          this.toast.create({
            message: 'Verify Email',
            duration: 3000
          }).present();
        }
      })
      .catch( error =>{
        // this.alert(error.message);
        console.log("Got an error");
        this.toast.create({
          message: 'Invalid Email/Password',
          duration: 3000
        }).present();
      })
      // console.log(result);
      // if(result){
      //   this.navCtrl.setRoot('HomePage');
      // }
    }
    catch(e){
      console.error(e);
    }
  }

  // register(){
  //   this.navCtrl.push('RegisterPage');
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
