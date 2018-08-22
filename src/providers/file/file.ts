import { Injectable } from '@angular/core';
import { FileIO } from '../../app/fileio';

/*
  Generated class for the FileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileProvider {
  // dataInit = [{ date: 'DATE', start: 'START', end: 'END' }];
  dataInit = [];
  configInit = { uuid: 'B9407F30F5F8466EAFF925556B57FE6D' }
  private fileIoData:FileIO = new FileIO('data.txt', this.dataInit);
  private fileIoConfig:FileIO = new FileIO('config.txt', this.configInit);

  getDataFile() {
    return this.fileIoData;
  }

  getConfigFile() {
    return this.fileIoConfig;
  }
}
