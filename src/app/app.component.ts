import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AuthPage } from '../pages/auth/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  tabsPage: any = TabsPage;
  settingsPage:any = SettingsPage;
  isAuth: boolean;
  authPage: any = AuthPage;
  @ViewChild('content') content: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      let config = {
        apiKey: "AIzaSyDyFQbTIvZ_NJ69Qz-Rb3_WglCqXVpfVC8",
        authDomain: "librairieocr-aabd6.firebaseapp.com",
        databaseURL: "https://librairieocr-aabd6.firebaseio.com",
        projectId: "librairieocr-aabd6",
        storageBucket: "librairieocr-aabd6.appspot.com",
        messagingSenderId: "138890075440"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(TabsPage);
          } else {
            this.isAuth = false;
            this.content.setRoot(AuthPage, {mode: 'connect'});
          }
        }
      );
    });
  }

  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data: null);
    this.menuCtrl.close();
  }

  onDisconnect() { 
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}

