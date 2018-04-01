import { Component, OnInit, ViewChild } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import { ContractForwarderService } from '../services/contract-forwarder.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-forwarder',
  templateUrl: './forwarder.component.html',
  styleUrls: ['./forwarder.component.css']
})
export class ForwarderComponent implements OnInit {

  @ViewChild('address') address: any;
  @ViewChild('orderId') orderId: any;
  @ViewChild('containerNo') containerNo: any;
  @ViewChild('commodity') commodity: any;
  @ViewChild('filename') filename: any;

  constructor(private ipfs: IpfsService, private contract: ContractForwarderService, private data: DataService) { }

  ngOnInit() {
    this.address.nativeElement.value = this.data.address;

    this.contract.checkAccessDenied.subscribe(result => {
      if (result == 'Forwarder') {
        alert("Error: Access denied! " + result + " role is needed!");
      }
    });

    this.contract.checkOrderIsCreated.subscribe(result => {
      if (result != null) {
        alert("Error: Order " + result + " exists!");
      }
    });

    this.contract.checkCreatedOrder.subscribe(result => {
      if (result != null) {
        alert("Created order " + result + " successfully!");
      }
    });
  }

  fileChange(event: any) {
    event.stopPropagation();
    event.preventDefault();

    this.ipfs.uploadFile(event.target.files[0], this.filename);
  }

  onSubmit(event: any) {
    event.stopPropagation();
    event.preventDefault();

    /*console.log(this.orderId.nativeElement.value);
    console.log(this.containerNo.nativeElement.value);
    console.log(this.commodity.nativeElement.value);
    console.log(this.filename.nativeElement.value);
    console.log(new Date());*/

    console.log("Create order");

    this.contract.createOrder(
      this.orderId.nativeElement.value,
      this.containerNo.nativeElement.value,
      this.commodity.nativeElement.value,
      this.filename.nativeElement.value,
      new Date().toString(),
      this.address.nativeElement.value
    ).then(result => {
      console.log(result);
      console.log(result.tx);
      //alert("Created order successfully!");
    }).catch(err => {
      console.log(err);
      //alert("Error: Order exists!");
    });
  }
}
