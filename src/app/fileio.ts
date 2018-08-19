import { File } from '@ionic-native/file';

export class FileIO {
  file:File = new File();
  filename:string;
  filedata:object;

  constructor(filename: string, filedata: object) {
    this.filename = filename;
    this.filedata = filedata;
  }

  init(callback: (text: string) => void) {
    console.log("init");
    console.log("filename: " + this.filename);
    console.log("dataDirectory: " + this.file.dataDirectory);
    this.file.checkFile(this.file.dataDirectory, this.filename)
    .then(
      _ => {
        console.log(this.filename + ' exists')
        this.read(text => {
          callback(text)
        })
      }
    )
    .catch(
      err => {
        console.log(this.filename + ' doesn\'t exist')
        this.file.createFile(this.file.dataDirectory, this.filename, true)
        .then(
          _ => {
            console.log(this.filename + ' is created')
            console.log('filedata: ' + JSON.stringify(this.filedata))
            this.write(JSON.stringify(this.filedata), ()=>{
              console.log('initialize is done')
              this.read(text => {
                callback(text)
              })
            }, false)
          }
        )
        .catch(
          err => console.log(this.filename + ' isn\'t created')
        )
      }
    );
  }

  write(str: string, callback: () => void, isAppend: boolean) {
    console.log("write");
    console.log("str: " + str);
    this.file.writeFile(this.file.dataDirectory, this.filename, str, {append: isAppend, replace: !isAppend})
    .then(
      _ => callback()
    )
    .catch(
      err => console.log('Fail to write text')
    );
  }

  read(callback: (text: string) => void) {
    console.log("read");
    return this.file.readAsText(this.file.dataDirectory, this.filename)
    .then(
      text => callback(text)
    )
    .catch(
      err => console.log('Fail to read text')
    );
  }
}