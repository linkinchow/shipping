import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AdminComponent } from '../admin/admin.component';
import { ForwarderComponent } from '../forwarder/forwarder.component';
import { CarrierComponent } from '../carrier/carrier.component';
import { ShipperComponent } from '../shipper/shipper.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full'
  },
  {
    path: 'forwarder',
    component: ForwarderComponent,
    pathMatch: 'full'
  },
  {
    path: 'carrier',
    component: CarrierComponent,
    pathMatch: 'full'
  },
  {
    path: 'shipper',
    component: ShipperComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class RouteModule { }
