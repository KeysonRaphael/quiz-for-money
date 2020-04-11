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
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

declare var unityads2:any;


@Injectable({
  providedIn: 'root'
})
export class AdmobfreeService {
  reward = 0;
  admob = true;
  Adfly = 5;
  Shortest = 5;
  shortestUrl = 'http://gestyy.com/w9kmly';
  adflyUrl = 'http://raboninco.com/8TSY';

  //unity
  //admob
  //Reward Video Ad's Configurations
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    // isTesting: true, // Remove in production
    autoShow: false,
      // id: "ca-app-pub-3940256099942544/5224354917"//false
    id: "ca-app-pub-4664613025046676/7726461873"
  };

  constructor(private alertController: AlertController,private admobFree: AdMobFree,
    public platform: Platform, public events: Events, private dialogs: Dialogs, 
    private toast: ToastController, private usersService: UsersService,public inAppBrowser:InAppBrowser) {
      events.subscribe('atualizarGrana', (user, time) => {
        this.newMethod();
      });
      events.subscribe('abrirAdmob', (user, time) => {
        this.rewardvideoAdmob();
      });

      platform.ready().then(() => {
        // Load ad configuration
        this.admobFree.rewardVideo.config(this.RewardVideoConfig);
        //Prepare Ad to Show
        this.admobFree.rewardVideo.prepare()
          .then(() => {
            // alert(2);
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
            this.events.publish('atualizarGrana');
      });
    });

    this.admobFree.on(this.admobFree.events.REWARD_VIDEO_LOAD_FAIL).subscribe(()=>{
      this.admob = false;
    });

    this.admobFree.on(this.admobFree.events.REWARD_VIDEO_LOAD).subscribe(()=>{
      this.admob = true;
    });
  }

  atualizarGrana() {
    this.events.publish('upGrana');
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

  async presentMessage(msg) {
    let alert = await this.alertController.create({
      message: msg,
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

  RewardVideoAd() {
    if (this.Adfly > 0) {
      this.Adfly -= 1;
      alert("Aguarde o tempo informado na tela e depois clique em fechar propaganda!");
      this.redirectReward(this.adflyUrl);
      return;
    }else if(this.Shortest > 0){
      this.Shortest -= 1;
      alert("Aguarde o tempo informado na tela e depois clique em fechar propaganda!");
      this.redirectReward(this.shortestUrl);
      return;
    }
    if (this.reward == 0){
      this.rewardvideoUnity(this.events);
      this.reward=1;
    }else if (this.reward == 1 && this.admob == true){
    // //Check if Ad is loaded
    this.admobFree.rewardVideo.isReady().then(() => {
      //Will show prepared Ad
      this.admobFree.rewardVideo.show().then(() => {
      })
          .catch(e => this.rewardvideoUnity(this.events));
      })
        .catch(e => this.rewardvideoUnity(this.events));
      this.reward-=1;
    }else{
      this.rewardvideoUnity(this.events);
      this.reward-=1;
    }
  }

  rewardvideoAdmob(){
    this.admobFree.rewardVideo.isReady().then(() => {
      //Will show prepared Ad
      this.admobFree.rewardVideo.show().then(() => {
      })
          .catch(e => console.log(e));
      })
        .catch(e => console.log(e));
    }

  rewardvideoUnity(events){
  let rewardedVideoAdPlacementId = "reward01";
    unityads2.GetPlacementState(rewardedVideoAdPlacementId,function callback(error, result){                 
        if(result.split(",")[1] == '"READY"]'){
            unityads2.ShowVideoAd(rewardedVideoAdPlacementId,function callback(error, result){           
              if(error){
                  console.log(error)
              }
              if(result.split(",")[1] == '"COMPLETED"]'){
                  events.publish('atualizarGrana');
              }
          });
        }else{
          events.publish('abrirAdmob');
        }
    });
  }

  private redirectReward(url:string){
    const browser = this.inAppBrowser.create(url);
    browser.on('loadstart').subscribe(event => {
    if (event.url.includes('www.google.com')) {
      this.usersService.getToken().then((result) => {
        var token = result;
        this.usersService.addGrana(token).then((result: any) => {
          let total = result.message;
          total = Number(total).toFixed(4);
          total = total.replace('.', ',');
          this.presentConfirm(total);
        });
        this.atualizarGrana();
      });
      browser.close()
    }
    })
  }


  private newMethod() {
    this.usersService.getToken().then((result) => {
      var token = result;
      this.usersService.addGrana(token).then((result: any) => {
        let total = result.message;
        total = Number(total).toFixed(4);
        total = total.replace('.', ',');
        this.presentConfirm(total);
      });
      this.atualizarGrana();
    });
  }
}    
