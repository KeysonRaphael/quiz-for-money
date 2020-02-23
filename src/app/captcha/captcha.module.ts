import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaptchaPageRoutingModule } from './captcha-routing.module';

import { CaptchaPage } from './captcha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaptchaPageRoutingModule
  ],
  declarations: [CaptchaPage]
})
export class CaptchaPageModule {}
