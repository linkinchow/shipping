import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from '../services/data.service';
const Web3 = require('web3');
const contract = require('truffle-contract');
const orderArtifact = require('../../../build/contracts/ShippingOrder.json');

@Injectable()
export class ContractAdminService {

  web3: any;
  shippingOrder: any;
  shippingContract: any;

  private accessDenied = new BehaviorSubject<string>(null);
  private roleSet = new BehaviorSubject<string>(null);

  checkAccessDenied = this.accessDenied.asObservable();
  checkRoleSet = this.roleSet.asObservable();

  constructor(private data: DataService) { 

    this.web3 = new Web3(new Web3.providers.HttpProvider(this.data.web3UrlAdmin));

    this.shippingOrder = contract(orderArtifact);
    this.shippingOrder.setProvider(this.web3.currentProvider);
    this.shippingOrder.defaults({gas: this.data.gas});

    this.shippingOrder.deployed().then(instance => {
      this.shippingContract = instance;
    });

    this.shippingOrder.deployed().then(instance => {
      instance.accessDenied().watch((err, res) => {
        this.accessDenied.next(res.args.role);
      });
    });

    this.shippingOrder.deployed().then(instance => {
      instance.roleSet().watch((err, res) => {
        this.roleSet.next(res.args.role);
      });
    });
  }

  setRole(addr: string, role: string, address: string) {
    return this.shippingContract.setRole(addr, role, {from: address}).then(result => {
      return result;
    });
  }

  getRole(addr: string, address: string) {
    return this.shippingContract.getRole(addr, {from: address}).then(result => {
      return result;
    });
  }
}
