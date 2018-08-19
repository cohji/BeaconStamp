import { Injectable } from '@angular/core';
import { Ble } from '../../app/ble';

/*
  Generated class for the BleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BleProvider {
  private ble: Ble = new Ble();
  
  getBle(): Ble {
    return this.ble;
  }
}
