import { IBeacon, Region } from '@ionic-native/ibeacon';

export class Ble {
  delegate:any;
  region:Region;
  isStarted: boolean = false;
  ibeacon: IBeacon = new IBeacon();

  constructor() {
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

  start(_region, _ibeacon, callback: () => void){
    console.log("start");
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

  stop(_region, _ibeacon, callback: () => void){
    console.log("stop");
    if(this.isStarted == false) {
      console.log("isStarted == false");
      callback();
      return;
    }

    _ibeacon.stopMonitoringForRegion(_region).then(
      () => {
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

  restart(uuid: string) {
    console.log("uuid:" + uuid);
    var uuid1 = uuid.slice(0,8);
    var uuid2 = uuid.slice(8,12);
    var uuid3 = uuid.slice(12,16);
    var uuid4 = uuid.slice(16,20);
    var uuid5 = uuid.slice(20,32);
    this.region = this.ibeacon.BeaconRegion('test.beacon',uuid1 + '-' + uuid2 + '-' + uuid3 + '-' + uuid4 + '-' + uuid5);

    this.stop(this.region, this.ibeacon, () => {
        this.start(this.region, this.ibeacon, () => {this.isStarted = true;});
      }
    );
  }
}
