import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IBeacon, Region } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
  input: { uuid: string} = { uuid: 'B9407F30F5F8466EAFF925556B57FE6D'};
  delegate:any;
  region:Region;
  isStarted: boolean = false;

  constructor(public navCtrl: NavController, private ibeacon: IBeacon) {
    this.init();
  }

  init(){
    console.log("init");
    this.ibeacon.requestAlwaysAuthorization()
    this.ibeacon.requestWhenInUseAuthorization()
    
    this.delegate = this.ibeacon.Delegate()
    this.delegate.didChangeAuthorizationStatus().subscribe(data=>console.log('didChangeAuthorizationStatus has completed', JSON.stringify(data)))
    this.delegate.didStartMonitoringForRegion().subscribe(data=>console.log('didStartMonitoringForRegion:',JSON.stringify(data),error=>console.log(error)))
    this.delegate.didEnterRegion().subscribe(
      data => {
        console.log('didEnterRegion: ', data);
      }
    );

    this.delegate.didExitRegion().subscribe(
      data => {
        console.log('didExitRegion: ', data);
      }
    );
  }

  startMonitoring(_region, _ibeacon, callback: () => void){
    console.log("startMonitoring");
    if(this.isStarted == true) {
      console.log("isStarted == true");
      return;
    }
    _ibeacon.startMonitoringForRegion(_region).then( 
      () => {
        console.log('Native layer recieved the request to monitoring:',JSON.stringify(_region));
        callback();
      },
      error => {
        console.log('Native layer failed to begin monitoring: ' + error);
      }
    );
  }

  stopMonitoring(_region, _ibeacon, callback: () => void){
    console.log("stopMonitoring");
    if(this.isStarted == false) {
      console.log("isStarted == false");
      callback();
      return;
    }

    console.log("stopMonitoring2");
    _ibeacon.stopMonitoringForRegion(_region).then(
      () => {
        console.log("stopMonitoring3");
        console.log('Native layer recieved the request to stop monitoring:',JSON.stringify(_region));
        this.isStarted = false;
        console.log("stopMonitoring4");
        callback();
      },
      error => {
        console.log('Native layer failed to begin stop monitoring: ' + error);
      }
    )
  }

  restart() {
    console.log("uuid:" + this.input.uuid);
    var uuid1 = this.input.uuid.slice(0,8);
    var uuid2 = this.input.uuid.slice(8,12);
    var uuid3 = this.input.uuid.slice(12,16);
    var uuid4 = this.input.uuid.slice(16,20);
    var uuid5 = this.input.uuid.slice(20,32);
    this.region = this.ibeacon.BeaconRegion('test.beacon',uuid1 + '-' + uuid2 + '-' + uuid3 + '-' + uuid4 + '-' + uuid5);

    this.stopMonitoring(this.region, this.ibeacon, () => {
        this.startMonitoring(this.region, this.ibeacon, () => {this.isStarted = true;});
      }
    );
  }
}
