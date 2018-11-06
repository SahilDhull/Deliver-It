import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { NoteListService } from '../services/note-list.service';


@NgModule({
  declarations: [
    MyApp,
    // RegisterPage,
    // MapPage,
    // LoginPage,
    // AddNotePage
    // HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // RegisterPage,
    // MapPage,
    // LoginPage,
    // AddNotePage
    // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NoteListService
  ]
})
export class AppModule { }
