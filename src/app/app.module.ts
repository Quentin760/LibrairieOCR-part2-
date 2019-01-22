import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Service } from '../services/service';
import { BookListPage } from '../pages/book-list/book-list';
import { CdListPage } from '../pages/cd-list/cd-list';
import { SettingsPage } from '../pages/settings/settings';
import { LendBookPage } from '../pages/lend-book/lend-book';
import { LendCdPage } from '../pages/lend-cd/lend-cd';
import { TabsPage } from '../pages/tabs/tabs';
import { authService } from '../services/AuthService';
import { AuthPage } from '../pages/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookListPage,
    CdListPage,
    SettingsPage,
    LendBookPage,
    LendCdPage,
    TabsPage,
    AuthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookListPage,
    CdListPage,
    SettingsPage,
    LendBookPage,
    LendCdPage,
    TabsPage,
    AuthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Service,
    authService
  ]
})
export class AppModule {}
