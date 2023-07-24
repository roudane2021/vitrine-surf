import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VitrinePublicRoutingModule } from './vitrine-public-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    VitrinePublicRoutingModule
  ]
})
export class VitrinePublicModule { }
