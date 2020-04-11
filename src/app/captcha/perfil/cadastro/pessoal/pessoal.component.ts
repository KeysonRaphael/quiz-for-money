import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, Events } from '@ionic/angular';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-pessoal',
  templateUrl: './pessoal.component.html',
  styleUrls: ['./pessoal.component.scss'],
})
export class PessoalComponent implements OnInit {
  data: string;
  sexo: string;
  public loading;


  constructor(public events: Events,public loadingController: LoadingController,public userService : UsersService,public modalCtrl: ModalController) { }

  ngOnInit() {}

  voltar(){
    this.modalCtrl.dismiss();
  }

  atualizar(){
    if (this.validar()) {
      this.presentLoading();
      this.userService.getToken().then((result) => {
        var token = result;
        this.userService.cadastrarNascSexo(token,this.data,this.sexo).then((result: any) => {
          this.dismissLoading()
          this.atualizarPerfil()
          this.voltar()
        });
      });
    }
  }

  changeSexo(sexo){
    this.sexo = sexo;
    console.log(sexo);
  }

  atualizarPerfil() {
    this.events.publish('editperfil');
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

  validar(){
    this.data = document.getElementById("data").getElementsByTagName('input')[0].value;
    return true
  }
    

}
