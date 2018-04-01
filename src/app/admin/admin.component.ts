import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractAdminService } from '../services/contract-admin.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('address') address: any;
  @ViewChild('addr1') addr1: any;
  @ViewChild('role1') role1: any;
  @ViewChild('addr2') addr2: any;
  @ViewChild('role2') role2: any;

  constructor(private contract: ContractAdminService, private data: DataService) { }

  ngOnInit() {
    this.address.nativeElement.value = this.data.address;

    this.contract.checkAccessDenied.subscribe(result => {
      if (result == 'Admin') {
        alert("Error: Access denied! " + result + " role is needed!");
      }
    });

    this.contract.checkRoleSet.subscribe(result => {
      if (result != null) {
        alert("Set role " + result + " successfully!");
      }
    });
  }

  getRole(event: any) {
    event.stopPropagation();
    event.preventDefault();

    console.log("Get role");
    
    this.contract.getRole(
      this.addr1.nativeElement.value,
      this.address.nativeElement.value
    ).then(result => {
      console.log(result);
      this.role1.nativeElement.value = result;
    }).catch(err => {
      console.log(err);
      //alert("Error: Access denied!");
    });
  }

  setRole(event: any) {
    event.stopPropagation();
    event.preventDefault();

    console.log("Set role " + this.role2.nativeElement.value);

    this.contract.setRole(
      this.addr2.nativeElement.value,
      this.role2.nativeElement.value,
      this.address.nativeElement.value
    ).then(result => {
      console.log(result);
      console.log(result.tx);
      //alert("Set role successfully!");
    }).catch(err => {
      console.log(err);
      //alert("Error: Access denied!");
    });
  }
}
