import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Ble } from '../../app/ble';
import { BleProvider } from '../../providers/ble/ble';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ble: Ble;

  constructor(public navCtrl: NavController, private bleProvider: BleProvider) {
    console.log("init");
    this.ble = this.bleProvider.getBle();
    this.ble.init();
  }
}
