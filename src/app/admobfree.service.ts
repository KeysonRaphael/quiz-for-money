import { Injectable } from '@angular/core';
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import{UsersService} from './users.service';
import {ToastController } from '@ionic/angular';
import { CaptchaPage } from './captcha/captcha.page';
import { Events } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdmobfreeService {
  interstitialConfig: AdMobFreeInterstitialConfig = {
    // add your config here
    // isTesting: true,
    autoShow: false,
      // id: "ca-app-pub-3940256099942544/1033173712"//false
    id: "ca-app-pub-4664613025046676/3131421378"
  };
  //Reward Video Ad's Configurations
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    // isTesting: true, // Remove in production
    autoShow: false,
      // id: "ca-app-pub-3940256099942544/5224354917"//false
    id: "ca-app-pub-4664613025046676/7726461873"
  };

  constructor(private alertController: AlertController,private admobFree: AdMobFree,
    public platform: Platform, public events: Events, private dialogs: Dialogs, private toast: ToastController, private usersService: UsersService) {
      platform.ready().then(() => {
        //load face ads
        // Load ad configuration
        this.admobFree.interstitial.config(this.interstitialConfig);
        //Prepare Ad to Show
        this.admobFree.interstitial.prepare()
          .then(() => {
            // alert(1);
          }).catch(e => alert(e));
  
  
        // Load ad configuration
        this.admobFree.rewardVideo.config(this.RewardVideoConfig);
        //Prepare Ad to Show
        this.admobFree.rewardVideo.prepare()
          .then(() => {
            // alert(2);
          }).catch(e => alert(e));
  
      });
      //Handle interstitial's close event to Prepare Ad again
      this.admobFree.on('admob.interstitial.events.CLOSE').subscribe(() => {
        this.admobFree.interstitial.prepare()
          .then(() => {
          }).catch(e => alert(e));
      });
      //Handle Reward's close event to Prepare Ad again
      this.admobFree.on('admob.rewardvideo.events.CLOSE').subscribe(() => {
        this.admobFree.rewardVideo.prepare()
          .then(() => {
            this.events.publish('testevent', {key: 'value'});
          }).catch(e => alert(e));
      });
      var token;
      this.admobFree.on('admob.rewardvideo.events.REWARD').subscribe(() => {
        this.admobFree.rewardVideo.prepare()
          .then(() => {
            this.usersService.getToken().then((result) => {
              token = result;
              // (await this.toast.create({ message: this.token, position: 'bottom', duration: 1000 })).present();
              this.usersService.addGrana(token).then((result: any) => {
                this.presentConfirm(result.message);
              });   
            });
      });

      this.admobFree.on('')
    });
  }

  async presentConfirm(valor) {
    let alert = await this.alertController.create({
      message: 'Parabéns você ganhou: R$'+valor,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        }
      ],
      backdropDismiss: false
    });
    alert.present();
  }

  BannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      // isTesting: true, // Remove in production
      autoShow: true, 
      bannerAtTop: false,
      // id: "ca-app-pub-3940256099942544/6300978111"//falsa
      id: "ca-app-pub-4664613025046676/7070666383"
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare().then(() => {
      // success
    }).catch(e => console.log(e));
  }
  
  InterstitialAd() {
    //Check if Ad is loaded
    this.admobFree.interstitial.isReady().then(() => {
      //Will show prepared Ad
      this.admobFree.interstitial.show().then(() => {
      })
        .catch(e => console.log("show " + e));
    })
      .catch(e => console.log("isReady " + e));
  }

  RewardVideoAd() {
    //Check if Ad is loaded
    this.admobFree.rewardVideo.isReady().then(() => {
      //Will show prepared Ad
      this.admobFree.rewardVideo.show().then(() => {
      })
        .catch(e => console.log("show " + e));
    })
      .catch(e => console.log(e));
  }

}    
