import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from '../services/data.service';
const Web3 = require('web3');
const contract = require('truffle-contract');
const orderArtifact = require('../../../build/contracts/ShippingOrder.json');

@Injectable()
export class ContractShipperService {

  web3: any;
  shippingOrder: any;
  shippingContract: any;

  private orderIsNotConfirmed = new BehaviorSubject<string>(null);
  private orderIsSubmitted = new BehaviorSubject<string>(null);
  private accessDenied = new BehaviorSubject<string>(null);
  private submittedOrder = new BehaviorSubject<string>(null);

  checkOrderIsNotConfirmed = this.orderIsNotConfirmed.asObservable();
  checkOrderIsSubmitted = this.orderIsSubmitted.asObservable();
  checkAccessDenied = this.accessDenied.asObservable();
  checkSubmittedOrder = this.submittedOrder.asObservable();

  constructor(private data: DataService) { 
    
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.data.web3UrlShipper));

    this.shippingOrder = contract(orderArtifact);
    this.shippingOrder.setProvider(this.web3.currentProvider);
    this.shippingOrder.defaults({gas: this.data.gas});

    this.shippingOrder.deployed().then(instance => {
      this.shippingContract = instance;
    });

    this.shippingOrder.deployed().then(instance => {
      instance.orderIsNotConfirmed().watch((err, res) => {
        this.orderIsNotConfirmed.next(res.args.order_id);
      });
    });

    this.shippingOrder.deployed().then(instance => {
      instance.orderIsSubmitted().watch((err, res) => {
        this.orderIsSubmitted.next(res.args.order_id);
      });
    });

    this.shippingOrder.deployed().then(instance => {
      instance.accessDenied().watch((err, res) => {
        this.accessDenied.next(res.args.role);
      });
    });

    this.shippingOrder.deployed().then(instance => {
      instance.submittedOrder().watch((err, res) => {
        this.submittedOrder.next(res.args.order_id);
      });
    });
  }

  submitInstruction(order_id: string, shipper_name: string, invoice_no: string, bank: string, account_no: string, address: string) {
    return this.shippingContract.submitInstruction(order_id, shipper_name, invoice_no, bank, account_no, {from: address}).then(result => {
      return result;
    });
  }

  getConfirmation(order_id: string, address: string) {
    return this.shippingContract.getConfirmation(order_id, {from: address}).then(result => {
      return result;
    });
  }
}
