import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AppRate } from '@ionic-native/app-rate/ngx';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  model: User;
  public email;
  public senha;
  public loading;
  public version = '017';
  public atualizar = false;

  constructor(private market: Market,private alertController: AlertController, private appRate: AppRate, public loadingController: LoadingController, private router: Router, private userProvider: UsersService, private toast: ToastController, private storage: Storage) {
    this.model = new User();
    this.appRate.preferences = {
      simpleMode: true,
      usesUntilPrompt: 2,
      displayAppName: 'Quiz For Money',
      promptAgainForEachNewVersion: false,
      storeAppURL: {
        android: 'market://details?id=br.com.wincaptcha',
      },
      customLocale: {
        title: 'Você gosta do aplicativo?',
        message: 'Poderia tomar um tempo para avalia-lo?',
        cancelButtonLabel: 'Não, Obrigado',
        laterButtonLabel: 'Me lembre depois',
        rateButtonLabel: 'Avaliar Agora',
      },
      callbacks : {
        onRateDialogShow: function(callback) {
          // show something
        },
        onButtonClicked : function (buttonIndex) {
          console.log(buttonIndex);
        }
      },
      openUrl: appRate.preferences.openUrl,
    };
    
    this.appRate.promptForRating(false);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor aguarde...',
    });
    await this.loading.present();
  }

  dismissLoading(){
    this.loading.dismiss()
  }

  ngOnInit() {
    this.userProvider.getVersion(this.version).then((result:any)=>{
      if (result){
        if (result.message == "0"){
          this.atualizar=true;
          this.presentConfirm();
        }else{
          this.userProvider.getToken().then((result)=>{
            if (result){
              this.router.navigateByUrl('/captcha');
            }
          });
        }
      }
    });
    
  }

  async presentConfirm() {
    let alert = await this.alertController.create({
      message: 'Há uma versão nova para ser instalada, para garantir o melhor funcionamento, favor atualizar.',
      buttons: [
        {
          text: 'Atualizar',
          role: 'atualizar',
          handler: () => {
            this.market.open('br.com.wincaptcha');
          }
        }
      ],
      backdropDismiss: false
    });
    alert.present();
  }

  login() {
    if(this.atualizar==false){
      this.presentLoading();
      console.log(this.email);
      this.model.email = this.email;
      this.model.senha = this.senha;
      this.userProvider.login(this.model.email, this.model.senha)
      .then((result: any) => {
        if (result.hasOwnProperty('token')) {
          this.userProvider.setAccessToken(result.token).then((result) => {
            console.log(result) // here's where my result can be logged, so whether my set succeeded or not
            this.dismissLoading();
          });
          this.dismissLoading();
          this.router.navigateByUrl('/captcha');  
        }else{
          alert('Conta não encontrada, por favor verifique se não digitou algum dado incorretamente.');
          this.dismissLoading();
        }
      })
      .catch((error: any) => {
        alert('Erro ao efetuar login.'+ error);
        console.log(JSON.stringify(error));
        this.dismissLoading();
      });
    }else{
      this.presentConfirm()
    }
  }

  rateMe() {

  }
  

}
export class User {
  email: string;
  senha: string;
}
