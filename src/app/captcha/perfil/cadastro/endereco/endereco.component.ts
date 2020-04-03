import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController, Platform, Events, LoadingController } from '@ionic/angular';
import { UsersService } from 'src/app/users.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
})

export class EnderecoComponent implements OnInit {
  public estado = "";
  public cidade = "";
  public bairro = "";
  public rua = "";
  public numero = "";
  public cep = "";
  public estadoslist;
  cidadeslist: any;
  public loading;


  constructor(private iab: InAppBrowser, public loadingController: LoadingController,public events: Events,public platform: Platform,public modalCtrl: ModalController, public userService : UsersService,private zone: NgZone) {
   }

  ngOnInit() {
    this.carregarEstados();
  }

  cadastrarEndereco(){
    this.presentLoading()
    if (this.validar()) {
      this.userService.getToken().then((result) => {
        var token = result;
        this.userService.cadastrarEndereco(token,this.cidade,this.bairro,this.rua,this.numero,this.cep).then((result: any) => {
          this.atualizarPerfil()  
          this.voltar()
          this.dismissLoading()
        });
      });
    }
    this.dismissLoading()
  }

  atualizarPerfil() {
    this.events.publish('editperfil');
  }

  setCidade(value:string){
    this.cidade = value;
  }

  validar(){
    this.cep = document.getElementById("cep").getElementsByTagName('input')[0].value;
    this.numero = document.getElementById("numero").getElementsByTagName('input')[0].value;
    this.rua = document.getElementById("rua").getElementsByTagName('input')[0].value;
    this.bairro = document.getElementById("bairro").getElementsByTagName('input')[0].value;
    return true
  }

  carregarCidades(value:string){
    this.userService.getCidades(value).then((result: any) => {
      this.zone.run(() => {
        this.cidadeslist = result.cidades;
      });
  });
  }
  
  voltar(){
    this.modalCtrl.dismiss();
  }

  carregarEstados(){
      this.userService.getEstados().then((result: any) => {
        this.zone.run(() => {
          this.estadoslist = result.estados;
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

