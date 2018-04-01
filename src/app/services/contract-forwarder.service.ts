import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from '../services/data.service';
const Web3 = require('web3');
const contract = require('truffle-contract');
const orderArtifact = require('../../../build/contracts/ShippingOrder.json');

@Injectable()
export class ContractForwarderService {

  web3: any;
  shippingOrder: any;
  shippingContract: any;

  private orderIsCreated = new BehaviorSubject<string>(null);
  private accessDenied = new BehaviorSubject<string>(null);
  private createdOrder = new BehaviorSubject<string>(null);

  checkOrderIsCreated = this.orderIsCreated.asObservable();
  checkAccessDenied = this.accessDenied.asObservable();
  checkCreatedOrder = this.createdOrder.asObservable();

  constructor(private data: DataService) { 

    this.web3 = new Web3(new Web3.providers.HttpProvider(this.data.web3UrlForwarder));

    this.shippingOrder = contract(orderArtifact);
    this.shippingOrder.setProvider(this.web3.currentProvider);
    this.shippingOrder.defaults({gas: this.data.gas});

    this.shippingOrder.deployed().then(instance => {
      this.shippingContract = instance;
    });

    this.shippingOrder.deployed().then(instance => {
      instance.orderIsCreated().watch((err, res) => {
        this.orderIsCreated.next(res.args.order_id);
      });
    });

    this.shippingOrder.deployed().then(instance => {
      instance.accessDenied().watch((err, res) => {
        this.accessDenied.next(res.args.role);
      });
    });

    this.shippingOrder.deployed().then(instance => {
      instance.createdOrder().watch((err, res) => {
        this.createdOrder.next(res.args.order_id);
      });
    });
  }

  createOrder(order_id: string, container_no: string, commodity: string, order_filename: string, order_timestamp: string, address: string) {
    return this.shippingContract.createOrder(order_id, container_no, commodity, order_filename, order_timestamp, {from: address}).then(result => {
      return result;
    });
  }
}
