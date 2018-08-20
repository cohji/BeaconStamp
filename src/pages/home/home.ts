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
  dataFile: FileIO;
  isstarted: boolean = false;
  uuid: string = '';
  data = [];

  constructor(public navCtrl: NavController, private bleProvider: BleProvider, private fileProvider: FileProvider) {
    console.log("init");
    this.configFile = this.fileProvider.getConfigFile();
    this.configFile.init(text => {
      console.log("config text: " + text);
      this.uuid = JSON.parse(text).uuid
      this.dataFile = this.fileProvider.getDataFile();
      this.dataFile.init(text => {
        console.log("data text: " + text);
        this.data = JSON.parse(text);
        console.log("data: " + JSON.stringify(this.data));
        this.ble = this.bleProvider.getBle();
        this.ble.init(
          (isStarted: boolean) => {
            console.log("isStarted: " + isStarted);
            this.isstarted = isStarted;
          }, 
          () => {
            console.log("enter callback is called");
            var addData = { date: 'test1', start: 'test1', end: 'test1' }
            if(!this.dataFile) {
              this.dataFile = this.fileProvider.getDataFile();
              this.dataFile.init(text => {
                this.data = JSON.parse(text);
                this.data.push(addData);
                this.dataFile.write(JSON.stringify(this.data), () => {}, false);
              });
            } else {
              this.data.push(addData);
              this.dataFile.write(JSON.stringify(this.data), () => {}, false);
            }
          },
          () => {
            console.log("exit callback is called");
            var addData = { date: 'test2', start: 'test2', end: 'test2' }
            if(!this.dataFile) {
              this.dataFile = this.fileProvider.getDataFile();
              this.dataFile.init(text => {
                this.data = JSON.parse(text);
                this.data.push(addData);
                this.dataFile.write(JSON.stringify(this.data), () => {}, false);
              });
            } else {
              this.data.push(addData);
              this.dataFile.write(JSON.stringify(this.data), () => {}, false);
            }
          }
        );
      })
    })
  }

  start() {
    if(this.isstarted) {
      return
    }
    this.ble.start(this.uuid, () => {
      this.isstarted = true;
    })
  }

  stop() {
    if(!this.isstarted) {
      return
    }
    this.ble.stop(this.uuid, () => {
      this.isstarted = false;
    })
  }

}
