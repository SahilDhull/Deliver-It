import { Component, ViewChild  } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MyordersPage } from '../pages/myorders/myorders';
import { TakeorderPage } from '../pages/takeorder/takeorder';
import { TorderPage } from '../pages/torder/torder';
import { DetailsPage } from '../pages/details/details';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: string = 'LoginPage';
  pages: Array<{title: string, component: any}>;



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private gl: Geolocation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.gl.getCurrentPosition()
      .then((res) => {
        console.log(res);
      })
      this.pages = [
        {title: 'Home', component: HomePage},
        {title: 'My Orders',component: MyordersPage},
        {title: 'Take Order by location', component: TakeorderPage},
        {title: 'Take any Order', component: TorderPage},
        {title: 'Info', component: DetailsPage},
        {title: 'SignOut', component: LoginPage},
        
      ];
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  open(page){
    this.nav.setRoot(page);
  }
}

