import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarteiraPageRoutingModule } from './carteira-routing.module';

import { CarteiraPage } from './carteira.page';
import { BrMaskerModule } from 'br-mask';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,BrMaskerModule,
    CarteiraPageRoutingModule
  ],
  declarations: [CarteiraPage]
})
export class CarteiraPageModule {}
