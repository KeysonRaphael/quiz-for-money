import { Component, HostListener } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
declare var unityads2:any;



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,private oneSignal: OneSignal,private alertCtrl: AlertController,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }
  
  @HostListener('document:ionBackButton', ['$event'])
  overrideHardwareBackAction(event: any) {
    console.log('back button');
    event.detail.register(100, async () => {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      var gameId = "3463129";
      var isTest = false;
      var isDebug = false;
      unityads2.UnityAdsInit(gameId, isTest, isDebug, function callback(error, result){           
        if(error){
            console.log(error)
        }
        else{
            console.log(result);
        }
    });
      this.statusBar.styleDefault();
      if (this.platform.is('cordova')) {
        this.setupPush();
      }
      this.splashScreen.hide();
    });
  }

  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit("f25067fe-f7e7-4ec8-98b3-a661affd7da2", "873169025911");
 
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });
 
    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;
 
      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });
 
    this.oneSignal.endInit();
  }

  

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }
}
