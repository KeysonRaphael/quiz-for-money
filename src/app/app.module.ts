import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';

import{HttpClientModule} from '@angular/common/http';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

import { AdmobfreeService } from './admobfree.service';
import { BrMaskerModule } from 'br-mask';
import { HTTP } from '@ionic-native/http/ngx';

import { AppRate } from '@ionic-native/app-rate/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Market } from '@ionic-native/market/ngx';


import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AssuntosComponent} from './assuntos/assuntos.component';

@NgModule({
  declarations: [AppComponent,AssuntosComponent],
  entryComponents: [AssuntosComponent],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    BrMaskerModule,
    IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    AdmobfreeService,Dialogs,HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    AppRate,
    LocalNotifications,Market,
    OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
