import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { AboutPage } from '../pages/about/about';
import { ConfigPage } from '../pages/config/config';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { IBeacon } from '@ionic-native/ibeacon';
import { BleProvider } from '../providers/ble/ble';
import { FileProvider } from '../providers/file/file';

import { OrderByPipe } from './orderby.pipe';

@NgModule({
  declarations: [
    MyApp,
    ConfigPage,
    ContactPage,
    HomePage,
    TabsPage,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConfigPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BleProvider,
    FileProvider
  ]
})
export class AppModule {}
