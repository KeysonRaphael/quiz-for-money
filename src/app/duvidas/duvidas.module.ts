import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuvidasPageRoutingModule } from './duvidas-routing.module';

import { DuvidasPage } from './duvidas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DuvidasPageRoutingModule
  ],
  declarations: [DuvidasPage]
})
export class DuvidasPageModule {}
