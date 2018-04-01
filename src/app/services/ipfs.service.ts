import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
const ipfsAPI = require('ipfs-api');

@Injectable()
export class IpfsService {

  ipfs: any;

  constructor(private data: DataService) { 
    this.ipfs = ipfsAPI(this.data.ipfsApiUrl);
  }  

  uploadFile(file, filename) {
    let reader = new FileReader();
    reader.onloadend = () => this.saveToIpfs(reader, filename);
    reader.readAsArrayBuffer(file);
  }

  saveToIpfs(reader, filename) {
    const buffer = Buffer.from(reader.result);
    this.ipfs.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response);
        console.log(response[0].hash);
        filename.nativeElement.value = response[0].hash;
      }).catch((err) => {
        console.error(err);
      });
  }
}
