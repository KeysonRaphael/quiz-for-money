import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController, Platform, LoadingController, Events } from '@ionic/angular';
import { UsersService } from 'src/app/users.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-celular',
  templateUrl: './celular.component.html',
  styleUrls: ['./celular.component.scss'],
})
export class CelularComponent implements OnInit {
  celular: string;
  public loading;

  constructor(private iab: InAppBrowser, public events: Events,public loadingController: LoadingController, public platform: Platform,public modalCtrl: ModalController, public userService : UsersService,private zone: NgZone) { }

  ngOnInit() {}

  voltar(){
    this.modalCtrl.dismiss();
  }

  cadastrarCelular(){
    this.presentLoading()
    if (this.validar()) {
      this.userService.getToken().then((result) => {
        var token = result;
        this.userService.cadastrarCelular(token,this.celular).then((result: any) => {
          this.dismissLoading()
          this.atualizarPerfil()
          this.voltar()
        });
      });
    }
  }

  atualizarPerfil() {
    this.events.publish('editperfil');
  }

  validar(){
    this.celular = document.getElementById("celular").getElementsByTagName('input')[0].value;
    return true
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
