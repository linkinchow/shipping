import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractShipperService } from '../services/contract-shipper.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {

  @ViewChild('address') address: any;
  @ViewChild('orderId') orderId: any;
  @ViewChild('confirmFile') confirmFile: any;
  @ViewChild('timestamp') timestamp: any;
  @ViewChild('shipperName') shipperName: any;
  @ViewChild('invoiceNo') invoiceNo: any;
  @ViewChild('bank') bank: any;
  @ViewChild('accountNo') accountNo: any;

  constructor(private contract: ContractShipperService, private data: DataService) { }

  ngOnInit() {
    this.address.nativeElement.value = this.data.address;

    this.contract.checkAccessDenied.subscribe(result => {
      if (result == 'Shipper') {
        alert("Error: Access denied! " + result + " role is needed!");
      }
    });

    this.contract.checkOrderIsNotConfirmed.subscribe(result => {
      if (result != null) {
        alert("Error: Order " + result + " does not exist or is not confirmed!");
      }
    });

    this.contract.checkOrderIsSubmitted.subscribe(result => {
      if (result != null) {
        alert("Error: Order " + result + " is already submitted!");
      }
    });

    this.contract.checkSubmittedOrder.subscribe(result => {
      if (result != null) {
        alert("Submitted order " + result + " successfully!");
      }
    });
  }

  onRetrieve(event: any) {
    event.stopPropagation();
    event.preventDefault();

    console.log("Retrieve");
    
    this.contract.getConfirmation(
      this.orderId.nativeElement.value,
      this.address.nativeElement.value
    ).then(result => {
      console.log(result);

      if (result[1] == '') {
        alert("Error: Order " + this.orderId.nativeElement.value + " does not exist or is not confirmed!");
        return;
      }

      this.confirmFile.nativeElement.textContent = result[0];
      this.confirmFile.nativeElement.href = this.data.ipfsGatewayUrl + result[0];
      this.timestamp.nativeElement.value = result[1];
    }).catch(err => {
      console.log(err);
      //alert("Error: Order does not exist or is not confirmed!");
    });
  }

  onSubmit(event: any) {
    event.stopPropagation();
    event.preventDefault();

    console.log("Submit");

    this.contract.submitInstruction(
      this.orderId.nativeElement.value,
      this.shipperName.nativeElement.value,
      this.invoiceNo.nativeElement.value,
      this.bank.nativeElement.value,
      this.accountNo.nativeElement.value,
      this.address.nativeElement.value
    ).then(result => {
      console.log(result);
      console.log(result.tx);
      //alert("Submitted successfully!");
    }).catch(err => {
      console.log(err);
      //alert("Error: Order does not exist or is not confirmed or is already submitted!");
    });
  }
}
