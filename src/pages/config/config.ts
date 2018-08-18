import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Ble } from '../../app/ble';
import { BleProvider } from '../../providers/ble/ble';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
  input: { uuid: string} = { uuid: 'B9407F30F5F8466EAFF925556B57FE6D'};
  ble: Ble;

  constructor(public navCtrl: NavController, private bleProvider: BleProvider) {
    this.init();
  }

  init(){
    console.log("init");
    this.ble = this.bleProvider.getBle();
  }

  set() {
    console.log("set");
    this.ble.restart(this.input.uuid);
  }
}
