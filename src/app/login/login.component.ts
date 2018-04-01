import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractAdminService } from '../services/contract-admin.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('address') address: any;

  constructor(private contract: ContractAdminService, private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  login(event: any) {
    event.stopPropagation();
    event.preventDefault();

    const addr = this.address.nativeElement.value;
    this.data.address = addr;

    if (addr == this.data.owner) { 
      this.router.navigate(['/admin']); 
      return;
    };

    this.contract.getRole(addr, this.data.owner).then(result => {
      if (result == '') {
        alert('Address is not found!');
        return;
      }
      if (result == 'Forwarder') { 
        this.router.navigate(['/forwarder']); 
      };
      if (result == 'Carrier') { 
        this.router.navigate(['/carrier']); 
      };
      if (result == 'Shipper') { 
        this.router.navigate(['/shipper']); 
      };
    }).catch(err => {
      console.log(err);
      alert("Address is not found!");
    });
  }
}
