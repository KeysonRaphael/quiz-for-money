import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { NavController, NavParams, ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AppRate } from '@ionic-native/app-rate/ngx';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';
import { RecuperarComponent } from './recuperar/recuperar.component';

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
  public version = '023';
  public atualizar = false;

  constructor(private market: Market,private alertController: AlertController, private modalController: ModalController,
    private appRate: AppRate, public loadingController: LoadingController, 
    private router: Router, private userProvider: UsersService, 
    private toast: ToastController, private storage: Storage) {
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
          this.userProvider.getEmail().then((result)=>{
            console.log(result);
            if (result){
              this.login(true);
            }
          });
        }
      }
    });
  }

  async abrirRecuperar(){
    const subjectModal = await this.modalController.create({component:RecuperarComponent});
    subjectModal.present();
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

  login(sessao = false) {
    if(this.atualizar==false){
      this.presentLoading();
      console.log(sessao);
      this.carregarDados(sessao).then(() => {
        this.userProvider.login(this.model.email, this.model.senha)
          .then((result: any) => {
            if (result.hasOwnProperty('token')) {
              this.userProvider.setEmail(this.model.email).then((result) => {
              });
              this.userProvider.setSenha(this.model.senha).then((result) => {
              });
              this.userProvider.setAccessToken(result.token).then((result) => {
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
            alert('Erro ao efetuar login.');
            this.dismissLoading();
          });
      });
      
    }else{
      this.presentConfirm()
    }
  }

  private async carregarDados(sessao: boolean) {
    if (sessao == true) {
      this.userProvider.getEmail().then((result) => {
        if (result) {
          this.model.email = result;
        }
      });
      await this.userProvider.getSenha().then((result) => {
        if (result) {
          this.model.senha = result;
        }
      });
    }
    else {
      this.model.email = this.email;
      this.model.senha = this.senha;
    }
  }

  rateMe() {

  }
  

}
export class User {
  email: string;
  senha: string;
}
