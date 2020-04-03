import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { UsersService } from '../../users.service';


@Component({
  selector: 'app-premiacao',
  templateUrl: './premiacao.component.html',
  styleUrls: ['./premiacao.component.scss'],
})
export class PremiacaoComponent implements OnInit {
  public loading;

  titulo1 = "";
  descricao1 = "";
  titulo2 = "";
  descricao2 = "";
  titulo3 = "";
  descricao3 = "";

  constructor(public modalCtrl: ModalController, public loadingController: LoadingController, public userService : UsersService,private zone: NgZone) { }

  ngOnInit() {
    this.getPremiacao();
  }

  voltar(){
    this.modalCtrl.dismiss();
  }

  private getPremiacao() {
    this.presentLoading();
    this.userService.getToken().then((result) => {
      var token = result;
      this.userService.getPremiacao().then((result: any) => {
        this.zone.run(() => {
              let premios = result.premios;
              this.titulo1 = premios[0].titulo;
              this.descricao1 = premios[0].descricao;
              this.titulo2 = premios[1].titulo;
              this.descricao2 = premios[1].descricao;
              this.titulo3 = premios[2].titulo;
              this.descricao3 = premios[2].descricao;
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
