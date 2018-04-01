import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RouteModule } from './route/route.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ForwarderComponent } from './forwarder/forwarder.component';
import { CarrierComponent } from './carrier/carrier.component';
import { ShipperComponent } from './shipper/shipper.component';

import { ContractAdminService } from './services/contract-admin.service';
import { ContractForwarderService } from './services/contract-forwarder.service';
import { ContractCarrierService } from './services/contract-carrier.service';
import { ContractShipperService } from './services/contract-shipper.service';
import { IpfsService } from './services/ipfs.service';
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    BrowserModule,
    RouteModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ForwarderComponent,
    CarrierComponent,
    ShipperComponent,
    AdminComponent
  ],
  providers: [
    ContractAdminService,
    ContractForwarderService, 
    ContractCarrierService,
    ContractShipperService,
    IpfsService,
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {
  }
}
