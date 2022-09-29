import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
console.log("Detail module");


@NgModule({
  declarations: [
    AboutComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule
  ],
  exports:[
    AboutComponent,
    ContactUsComponent
  ]
})
export class DetailModule { }
