import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaptchaPageRoutingModule } from './captcha-routing.module';

import { CaptchaPage } from './captcha.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,BrMaskerModule,
    CaptchaPageRoutingModule
  ],
  declarations: [CaptchaPage]
})
export class CaptchaPageModule {}
