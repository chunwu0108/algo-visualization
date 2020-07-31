import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Algo1Component } from './algo1/algo1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { Algo2Component } from './algo2/algo2.component';
import { NodeComponent } from './algo1/node/node.component';
import { AlgorithmsComponent } from './algorithms/algorithms.component';
import { QRCodeModule } from 'angularx-qrcode';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Algo3Component } from './algo3/algo3.component';
import { AlertboxComponent } from './algo3/alertbox/alertbox.component';

@NgModule({
  declarations: [
    AppComponent,
    Algo1Component,
    DashboardComponent,
    Algo2Component,
    NodeComponent,
    AlgorithmsComponent,
    Algo3Component,
    AlertboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
