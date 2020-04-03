import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoGrupoComponent implements OnInit {
  historico;
  public loading;

  constructor(private modalctrl:ModalController, private userService:UsersService,public loadingController: LoadingController,private alertController: AlertController) { }

  ngOnInit() {
    this.buscarHistorico()
  }

  async mostrarResultado(sorteado){
    var mensagem = "<center><b>O ganhador é <br><br><br>"+ sorteado+"</b></center>"
    let alert = await this.alertController.create({
      message: mensagem,
      cssClass:"alert-wrapper",
      buttons: [
        {
          text: "OK",
          handler: () => {
            //executar
          }
        }
      ],
    });
    alert.present();
  }

  voltar(){
    this.modalctrl.dismiss();
  }

  buscarHistorico(){
    this.presentLoading()
    this.userService.getToken().then((result)=>{
      this.userService.buscarHistorico(result).then((result:any)=>{
        this.historico = result.grupos 
        this.dismissLoading()
      })
    })
    this.dismissLoading()
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
