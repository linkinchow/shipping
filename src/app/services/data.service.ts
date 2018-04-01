import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  ipfsApiUrl = '/ip4/127.0.0.1/tcp/5001';
  ipfsGatewayUrl = 'http://localhost:8080/ipfs/';
  web3UrlAdmin = 'http://localhost:7545';
  web3UrlForwarder = 'http://localhost:7545';
  web3UrlCarrier = 'http://localhost:7545';
  web3UrlShipper = 'http://localhost:7545';

  gas = 4600000;

  owner = '<OWNER_ADDRESS>';

  address: any;

  constructor() { }

}
