import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConfigPage } from '../config/config';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConfigPage;
  tab3Root = ContactPage;

  constructor(public navCtrl: NavController) {
    this.navCtrl.setRoot(this.tab1Root);
  }
}
