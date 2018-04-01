import { Component, OnInit, ViewChild } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import { ContractCarrierService } from '../services/contract-carrier.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css']
})
export class CarrierComponent implements OnInit {

  @ViewChild('address') address: any;
  @ViewChild('orderId') orderId: any;
  @ViewChild('containerNo') containerNo: any;
  @ViewChild('commodity') commodity: any;
  @ViewChild('orderFile') orderFile: any;
  @ViewChild('timestamp') timestamp: any;
  @ViewChild('filename') filename: any;

  constructor(private ipfs: IpfsService, private contract: ContractCarrierService, private data: DataService) { }

  ngOnInit() {
    this.address.nativeElement.value = this.data.address;

    this.contract.checkAccessDenied.subscribe(result => {
      if (result == 'Carrier') {
        alert("Error: Access denied! " + result + " role is needed!");
      }
    });

    this.contract.checkOrderIsNotCreated.subscribe(result => {
      if (result != null) {
        alert("Error: Order " + result + " does not exist!");
      }
    });

    this.contract.checkOrderIsConfirmed.subscribe(result => {
      if (result != null) {
        alert("Error: Order " + result + " is already confirmed!");
      }
    });

    this.contract.checkConfirmedOrder.subscribe(result => {
      if (result != null) {
        alert("Confirmed order " + result + " successfully!");
      }
    });
  }

  onRetrieve(event: any) {
    event.stopPropagation();
    event.preventDefault();

    console.log("Retrieve");
    
    this.contract.getOrder(
      this.orderId.nativeElement.value,
      this.address.nativeElement.value
    ).then(result => {
      console.log(result);

      if (result[3] == '') {
        alert("Error: Order " + this.orderId.nativeElement.value + " does not exist!");
        return;
      }

      this.containerNo.nativeElement.value = result[0];
      this.commodity.nativeElement.value = result[1];
      this.orderFile.nativeElement.textContent = result[2];
      this.orderFile.nativeElement.href = this.data.ipfsGatewayUrl + result[2];
      this.timestamp.nativeElement.value = result[3];
    }).catch(err => {
      console.log(err);
      //alert("Error: Order does not exist!");
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

    console.log("Confirm");

    this.contract.confirmOrder(
      this.orderId.nativeElement.value,
      this.filename.nativeElement.value,
      new Date().toString(),
      this.address.nativeElement.value
    ).then(result => {
      console.log(result);
      console.log(result.tx);
      //alert("Confirmed successfully!");
    }).catch(err => {
      console.log(err);
      //alert("Error: Order does not exist or is already confirmed!");
    });
  }
}
