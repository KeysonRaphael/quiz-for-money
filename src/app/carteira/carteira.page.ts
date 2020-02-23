import { Component, OnInit, NgZone } from '@angular/core';
import { UsersService } from '../users.service';
import { Events, ToastController } from '@ionic/angular';
import { AdmobfreeService } from '../admobfree.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.page.html',
  styleUrls: ['./carteira.page.scss'],
})
export class CarteiraPage implements OnInit {
  public token;
  public total = "";
  public placeholder = "";
  public value;
  public valor;
  public conta;
  public formap;
  public loading;


  constructor(private alertController: AlertController,public loadingController: LoadingController,private zone: NgZone, public events: Events, private usersService: UsersService) { }

  ngOnInit() {
    this.getgrana();
    this.getValor();
  }

  private getgrana() {
    this.usersService.getToken().then((result) => {
      this.token = result;
      this.usersService.getGrana(this.token).then((result: any) => {
        this.zone.run(() => {
          this.total = result.money;
        });
      });
    });
  }

  private getValor() {
    this.usersService.getValor().then((result: any) => {
      this.zone.run(() => {
        this.valor = result.message;
      });
    });
  }

  changePlace(value:string){
    switch (value) {
      case "Mercado Pago":
        this.placeholder = "Email do Mercado Pago.";
        break;
      case "PicPay":
        this.placeholder = "Conta do picpay. ex: @teste";
        break;
      default:
        break;
    }
  }

  retirarDinheiro(){
    if(this.placeholder == ""){
      this.presentConfirm("Escolha uma forma de pagamento!");
      return;
    }else if (this.conta == "" || this.conta == undefined) {
      this.presentConfirm("Conta em branco!");
      return;
    }else if (this.conta[0] == "@" && this.formap == "Mercado Pago") {
      this.presentConfirm("Contas Mercado Pago são em formato de e-mail!");
      return;
    }else if (this.conta[0] != "@" && this.formap == "PicPay") {
      this.presentConfirm("Contas PicPay iniciam com @");
      return;
    }else if (parseFloat(this.value) < this.valor) {
      this.presentConfirm("Valor mínimo de retirada é R$"+this.valor);
      return;
    }else if(parseFloat(this.total) < this.valor){
      this.presentConfirm("Você não possui o valor mínimo de retirada!");
      return;
    } 
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    var date = diaF+"/"+mesF+"/"+anoF;
    this.presentLoading();
    this.usersService.getToken().then((result) => {
      this.token = result;
      console.log(this.token);
      this.usersService.retirarDinheiro(this.token,this.value,date,this.formap,this.conta).then((result: any) => {
          alert(result.message);
          this.getgrana();
          this.dismissLoading();
      });
    });
    this.dismissLoading();
  }

  async presentConfirm(mensagem) {
    let text = 'Ok';
    let alert = await this.alertController.create({
      message: mensagem,
      cssClass:"",
      buttons: [
        {
          text: "OK",
          role: 'cancel',
          handler: () => {
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
