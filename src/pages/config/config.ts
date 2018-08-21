import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Ble } from '../../app/ble';
import { BleProvider } from '../../providers/ble/ble';
import { FileProvider } from '../../providers/file/file';
import { FileIO } from '../../app/fileio';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
  public input: { uuid: string} = { uuid: ''};
  private ble: Ble;
  private configFile: FileIO;

  constructor(public navCtrl: NavController, private bleProvider: BleProvider, private fileProvider: FileProvider) {
  }

  ngOnInit() {
    console.log('ngOnInit ConfigPage');
    this.init();
  }

  init(){
    console.log("init");
    this.ble = this.bleProvider.getBle();
    this.configFile = this.fileProvider.getConfigFile();
    this.configFile.init(text => {
      console.log("text: " + text);
      this.input.uuid = JSON.parse(text).uuid
    })
  }

  set() {
    console.log("set");
    this.ble.uuid = this.input.uuid;
    this.ble.restart();
    this.configFile.write(JSON.stringify({ uuid: this.input.uuid }), 
    () => {
      this.configFile.read(text=>{
        console.log('read: ' + text);
      })
    }, false);
  }
}
