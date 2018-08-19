import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Ble } from '../../app/ble';
import { BleProvider } from '../../providers/ble/ble';
import { FileProvider } from '../../providers/file/file';
import { FileIO } from '../../app/fileio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ble: Ble;
  configFile: FileIO;

  constructor(public navCtrl: NavController, private bleProvider: BleProvider, private fileProvider: FileProvider) {
    console.log("init");
    this.ble = this.bleProvider.getBle();
    this.ble.init();
  }
}
