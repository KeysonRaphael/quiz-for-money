import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController, Platform, LoadingController } from '@ionic/angular';
import { UsersService } from 'src/app/users.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-pontuacao',
  templateUrl: './pontuacao.component.html',
  styleUrls: ['./pontuacao.component.scss'],
})
export class PontuacaoComponent implements OnInit {
  geral = "";
  mensal = "";
  nivel = "";
  public loading;

  constructor(private iab: InAppBrowser, public loadingController: LoadingController, public platform: Platform,public modalCtrl: ModalController, public userService : UsersService,private zone: NgZone) { }

  ngOnInit() {
    this.carregarDados();
  }

  voltar(){
    this.modalCtrl.dismiss();
  }
  
  openUrl() {
    const browser = this.iab.create('http://157.245.38.22/tabela.jpg');
    browser.show();
  }  

  carregarDados(){
    this.presentLoading()
    this.userService.getToken().then((result) => {
      var token = result;
      this.userService.getPontuacao(token).then((result: any) => {
        this.zone.run(() => {
          this.geral = result.pontuacao_geral;
          this.mensal = result.pontuacao_mensal;
          this.nivel = result.nivel;
          this.dismissLoading()
        });
      });
    });
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
