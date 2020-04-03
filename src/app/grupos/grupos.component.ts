import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, Events} from '@ionic/angular';
import { UsersService } from '../users.service';
import { AlertController } from '@ionic/angular';
import { HistoricoGrupoComponent } from './historico/historico.component';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
})
export class GruposComponent implements OnInit {
  grupos;
  public loading;

  constructor(public events: Events,public loadingController: LoadingController,
    private alertController: AlertController,private modalctrl:ModalController, 
    private userService:UsersService) { }

  ngOnInit() {
    this.buscarGrupos();
  }

  voltar(){
    this.modalctrl.dismiss();
  }

  async abrirHistorico(){
    const subjectModal = await this.modalctrl.create({component:HistoricoGrupoComponent});
    subjectModal.present();
  }

  buscarGrupos(){
    this.userService.getGrupos().then((result:any)=>{
      this.grupos = result.grupos;
      for (var i in this.grupos){
        var premio = this.grupos[i].premio;
        premio = premio.replace('.',',');
        this.grupos[i].premio = premio;
        var valor = this.grupos[i].valor;
        valor = valor.replace('.',',');
        this.grupos[i].valor = valor;
      }
    });
  }
  
  async presentConfirm(mensagem = '', valor, participacao,grupo) {
    var valor2 = "";
    if (valor == '50,0000'){
      valor2 = "cinquenta reais";
    }else if(valor == '20,0000'){
      valor2 = "vinte reais";
    }else if(valor == '10,0000'){
      valor2 = "dez reais";
    }
    var participacao2;
    if(participacao == "1,0000"){
      participacao2 = "um real";
    }
    console.log(valor);
    text1 = "ok";
      text2 = "";
    
    if(mensagem == ''){
      mensagem = "Certeza que deseja comprar um ticket para participar do sorteio com premiação no valor de R$"+valor+"("+valor2+") com custo de participação de R$"+participacao+"("+participacao2+")?"
      var text1 = "Sim";
    var text2 = "Não";
    }
    let alert = await this.alertController.create({
      message: mensagem,
      cssClass:"",
      buttons: [
        {
          text: text2,
          handler: () => {
            //executar
          }
        },
        {
          text: text1,
          handler: () => {
            if(text1 == "Sim"){
              this.comprarTicket(grupo)
            }
          }
        }
      ],
    });
    alert.present();
  }

  comprarTicket(grupo){
    this.presentLoading()
    this.userService.getToken().then((result)=>{
      this.userService.comprarTicket(result,grupo).then((result:any)=>{
        this.dismissLoading()
        this.presentConfirm(result.message,'','','');
        this.events.publish('upGrana');
        this.voltar();
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
