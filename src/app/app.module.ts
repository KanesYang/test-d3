import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { AppRoutingModule } from './app.routes';

import { D3Service } from 'd3-ng2-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Demo1Component } from './d3-chart/demo1/demo1.component';
import { FooterComponent } from './footer/footer.component';
import { IndexPageComponent } from './d3-chart/index-page/index-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Demo1Component,
    FooterComponent,
    IndexPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
