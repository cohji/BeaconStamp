import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Ble } from '../../app/ble';
import { BleProvider } from '../../providers/ble/ble';
import { FileProvider } from '../../providers/file/file';
import { FileIO } from '../../app/fileio';
import * as moment from 'moment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private ble: Ble;
  private dataFile: FileIO;
  private configFile: FileIO;
  public isStarted: boolean = false;
  public data = [];

  constructor(public navCtrl: NavController, private readonly platform: Platform, private bleProvider: BleProvider, private fileProvider: FileProvider) {
  }

  ngOnInit() {
    console.log("ngOnInit");
    this.platform.ready().then(() => {
      this.init();
    });
  }

  init() {
    console.log("init");
    this.ble = this.bleProvider.getBle();
    this.ble.init(
      (isStarted: boolean) => {
        console.log("isStarted: " + isStarted);
        this.isStarted = this.ble.isStarted;
      }, 
      () => {
        console.log('enter callback is called');
        moment.locale('ja');
        var now = moment();
        var oprnDate = now.format('YYYY/MM/DD HH:mm');
        var ditectTime = now.format('HH:mm');
        var week = now.format('ddd')
        var _style = {color:'black'};
        if(week == '土' || week == '日') {
          _style = {color:'red'};
        }
        var addData = { date: oprnDate, week: week, style: _style, start: ditectTime, end: ditectTime}
        if(!this.dataFile) {
          this.dataFile = this.fileProvider.getDataFile();
          this.dataFile.init(text => {
            this.data = JSON.parse(text);
            this.data.unshift(addData);
            this.dataFile.write(JSON.stringify(this.data), () => {}, false);
          });
        } else {
          this.data.unshift(addData);
          this.dataFile.write(JSON.stringify(this.data), () => {}, false);
        }
      },
      () => {
        console.log('exit callback is called');
        moment.locale('ja');
        var now = moment();
        var oprnDate = now.format('YYYY/MM/DD HH:mm');
        var ditectTime = now.format('HH:mm');
        var week = now.format('ddd')
        var _style = {color:'black'};
        if(week == '土' || week == '日') {
          _style = {color:'red'};
        }
        var addData = { date: oprnDate, week: week, style: _style, start: ditectTime, end: ditectTime}
        if(!this.dataFile) {
          this.dataFile = this.fileProvider.getDataFile();
          this.dataFile.init(text => {
            this.data = JSON.parse(text);
            this.data.unshift(addData);
            this.dataFile.write(JSON.stringify(this.data), () => {}, false);
          });
        } else {
          this.data.unshift(addData);
          this.dataFile.write(JSON.stringify(this.data), () => {}, false);
        }
      }
    );

    this.dataFile = this.fileProvider.getDataFile();
    this.dataFile.init(text => {
      console.log("text: " + text);
      this.data = JSON.parse(text);
    })
    this.configFile = this.fileProvider.getConfigFile();
    this.configFile.init(text => {
      console.log("text: " + text);
      this.ble.uuid = JSON.parse(text).uuid
    })
  }

  start() {
    if(this.isStarted) {
      return
    }
    this.ble.start(() => {
      this.isStarted = true;
    })
  }

  stop() {
    if(!this.isStarted) {
      return
    }
    this.ble.stop(() => {
      this.isStarted = false;
    })
  }

  edit_data() {
    console.log("edit_data");
  }

  remove_data() {
    console.log("remove_data");
  }
}
