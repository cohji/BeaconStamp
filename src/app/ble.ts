import { IBeacon, Region } from '@ionic-native/ibeacon';

export class Ble {
  private delegate:any;
  private region:Region;
  public isStarted: boolean = false;
  private ibeacon: IBeacon = new IBeacon();
  public uuid: string;

  init(initCallback: (isStarted: boolean) => void, enterCallback: () => void, exitCallback: () => void) {
    console.log("init");
    this.ibeacon.requestAlwaysAuthorization(); //OK
    // this.ibeacon.requestWhenInUseAuthorization(); //OK
    this.ibeacon.getMonitoredRegions() //OK
    .then(
      region => {
        console.log("region: " + JSON.stringify(region))
        if(region.length == 0) {
          console.log("region.length == 0")
          this.isStarted = false;
          this.initializeProc(enterCallback, exitCallback);
        } else { // aready initialized
          console.log("region.length != 0")
          this.isStarted = true;
        }
        initCallback(this.isStarted)
      }
    )
    .catch(
      err => console.log("err: " + err)
    )
  }

  private initializeProc(enterCallback: () => void, exitCallback: () => void) {
    console.log("initializeProc")
    this.delegate = this.ibeacon.Delegate()
    this.delegate.didChangeAuthorizationStatus().subscribe(data=>console.log('didChangeAuthorizationStatus has completed', JSON.stringify(data)))
    this.delegate.didStartMonitoringForRegion().subscribe(data=>console.log('didStartMonitoringForRegion:',JSON.stringify(data),error=>console.log(error)))
    this.delegate.didEnterRegion().subscribe(
      data => {
        console.log('didEnterRegion: ', data);
        enterCallback();
      }
    );

    this.delegate.didExitRegion().subscribe(
      data => {
        console.log('didExitRegion: ', data);
        exitCallback();
      }
    );
  }

  start(callback: () => void){
    console.log("start");

    if(this.isStarted == true) {
      console.log("isStarted == true");
      return;
    }
    console.log("uuid: " + this.uuid);
    var prop = this.getProperty(this.uuid);

    prop.ibeacon.startMonitoringForRegion(prop.region).then( 
      () => {
        console.log('Native layer recieved the request to monitoring:',JSON.stringify(prop.region));
        this.isStarted = true;
        callback();
      },
      error => {
        console.log('Native layer failed to begin monitoring: ' + error);
      }
    );

  }

  stop(callback: () => void){
    console.log("stop");

    this.ibeacon.getMonitoredRegions()
    .then(
      Region => {
        console.log("Region: " + Region)
      }
    )
    .catch(
      err => console.log("err: " + err)
    )

    if(this.isStarted == false) {
      console.log("isStarted == false");
      callback();
      return;
    }

    var prop = this.getProperty(this.uuid);

    prop.ibeacon.stopMonitoringForRegion(prop.region).then(
      () => {
        console.log('Native layer recieved the request to stop monitoring:',JSON.stringify(prop.region));
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
    console.log("uuid:" + this.uuid);
    this.stop(() => {
        this.start(() => {});
      }
    );
  }

  private getProperty(uuid: string) {
    var uuid1 = uuid.slice(0,8);
    var uuid2 = uuid.slice(8,12);
    var uuid3 = uuid.slice(12,16);
    var uuid4 = uuid.slice(16,20);
    var uuid5 = uuid.slice(20,32);
    this.region = this.ibeacon.BeaconRegion('beacon.' + uuid, uuid1 + '-' + uuid2 + '-' + uuid3 + '-' + uuid4 + '-' + uuid5);
    return {region: this.region, ibeacon: this.ibeacon}
  }
}
