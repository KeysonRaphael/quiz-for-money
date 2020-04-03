import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
})
export class RecuperarComponent implements OnInit {
  email: string;
  public loading;

  constructor(public loadingController: LoadingController,private alertController: AlertController,public userService : UsersService,public modalCtrl: ModalController) { }

  ngOnInit() {}

  enviar(){
    this.presentLoading();
    this.email = document.getElementById("email").getElementsByTagName('input')[0].value;
    this.userService.esqueceuSenha(this.email).then((result: any) => {
      this.dismissLoading()
      this.presentConfirm(result.message);
    });
    this.dismissLoading()
  }
  voltar(){
    this.modalCtrl.dismiss();
  }

  async presentConfirm(mensagem,nq = 0) {
    let text = 'Ok';
    if (nq == 1) {
      text = "Receber Prêmio!";
    }
    let alert = await this.alertController.create({
      message: mensagem,
      cssClass:"",
      buttons: [
        {
          text: text,
          role: 'cancel',
          handler: () => {
            this.modalCtrl.dismiss();
          }
        }
      ],
    });
    alert.present();
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

}
