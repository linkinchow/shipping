import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from '../services/data.service';
const Web3 = require('web3');
const contract = require('truffle-contract');
const orderArtifact = require('../../../build/contracts/ShippingOrder.json');

@Injectable()
export class ContractCarrierService {

  web3: any;
  shippingOrder: any;
  shippingContract: any;

  private orderIsNotCreated = new BehaviorSubject<string>(null);
  private orderIsConfirmed = new BehaviorSubject<string>(null);
  private accessDenied = new BehaviorSubject<string>(null);
  private confirmedOrder = new BehaviorSubject<string>(null);

  checkOrderIsNotCreated = this.orderIsNotCreated.asObservable();
  checkOrderIsConfirmed = this.orderIsConfirmed.asObservable();
  checkAccessDenied = this.accessDenied.asObservable();
  checkConfirmedOrder = this.confirmedOrder.asObservable();

  constructor(private data: DataService) { 

    this.web3 = new Web3(new Web3.providers.HttpProvider(this.data.web3UrlCarrier));

    this.shippingOrder = contract(orderArtifact);
    this.shippingOrder.setProvider(this.web3.currentProvider);
    this.shippingOrder.defaults({gas: this.data.gas});

    this.shippingOrder.deployed().then(instance => {
      this.shippingContract = instance;
    });

    this.shippingOrder.deployed().then(instance => {
      instance.orderIsNotCreated().watch((err, res) => {
        this.orderIsNotCreated.next(res.args.order_id);
      });
    });

    this.shippingOrder.deployed().then(instance => {
      instance.orderIsConfirmed().watch((err, res) => {
        this.orderIsConfirmed.next(res.args.order_id);
      });
    });

    this.shippingOrder.deployed().then(instance => {
      instance.accessDenied().watch((err, res) => {
        this.accessDenied.next(res.args.role);
      });
    });

    this.shippingOrder.deployed().then(instance => {
      instance.confirmedOrder().watch((err, res) => {
        this.confirmedOrder.next(res.args.order_id);
      });
    });
  }

  confirmOrder(order_id: string, confirmation_filename: string, confirmation_timestamp: string, address: string) {
    return this.shippingContract.confirmOrder(order_id, confirmation_filename, confirmation_timestamp, {from: address}).then(result => {
      return result;
    });
  }

  getOrder(order_id: string, address: string) {
    return this.shippingContract.getOrder(order_id, {from: address}).then(result => {
      return result;
    });
  }
}
