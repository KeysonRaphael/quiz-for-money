import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { UsersService } from '../users.service';
import { DuvidasComponent } from './duvidas/duvidas.component';
import { PremiacaoComponent } from './premiacao/premiacao.component';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  public loading;

  token = "";
  month = "";
  premio = "";
  rank;

  constructor(public modalCtrl: ModalController, public loadingController: LoadingController, public userService : UsersService,private zone: NgZone) { }

  ngOnInit() {
    this.getRank();
    this.getPremiacao();
    this.month = new Date().toLocaleString('pt-BR', { month: 'long' })
    this.month = this.month[0].toUpperCase() +  
    this.month.slice(1); 
  }

  private getRank() {
    this.presentLoading()
    this.userService.getToken().then((result) => {
      this.token = result;
      this.userService.getRank(this.token).then((result: any) => {
        this.zone.run(() => {
          this.rank = result;
          this.dismissLoading()
        });
      });
    });
    return this.rank;
  }

  private getPremiacao() {
    this.userService.getToken().then((result) => {
      var token = result;
      this.userService.getPremiacao().then((result: any) => {
        this.zone.run(() => {
          this.premio = result.premios[0].titulo;
        });
      });
    });
  }

  voltar(){
    this.modalCtrl.dismiss();
  }

  async abrirDuvidas(){
    const subjectModal = await this.modalCtrl.create({component:DuvidasComponent});
    subjectModal.present();
  }

  async abrirPremiacao(){
    const subjectModal = await this.modalCtrl.create({component:PremiacaoComponent});
    subjectModal.present();
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
