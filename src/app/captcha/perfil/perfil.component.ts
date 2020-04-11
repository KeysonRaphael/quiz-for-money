import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController, LoadingController, Events, NavController } from '@ionic/angular';
import { UsersService } from '../../users.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PontuacaoComponent } from './pontuacao/pontuacao.component';
import { EnderecoComponent } from './cadastro/endereco/endereco.component';
import { CelularComponent } from './cadastro/celular/celular.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  seguidores = "";
  public loading;
  codigo = "";
  endereco = "";
  celular = "";
  nome = "";
  email = "";
  idade = "";
  sexo = "";
  constructor(public navCtrl: NavController,private socialSharing: SocialSharing, public events: Events,
    public loadingController: LoadingController,public modalCtrl: ModalController, 
    public userService : UsersService,private zone: NgZone) {
      events.subscribe('editperfil', (user, time) => {
        this.carregarDados();
      });
     }

  ngOnInit() {
    this.carregarDados()
  }

  voltar(){
    this.modalCtrl.dismiss();
  }

  sair(){
    this.userService.clearToken();
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('home');
  }

  atualizarGrana() {
    this.events.publish('upGrana');
  }

  async abrirPontuacao(){
    const subjectModal = await this.modalCtrl.create({component:PontuacaoComponent});
    subjectModal.present();
  }

  async abrirEndereco(){
    const subjectModal = await this.modalCtrl.create({component:EnderecoComponent});
    subjectModal.present();
  }

  async abrirCelular(){
    const subjectModal = await this.modalCtrl.create({component:CelularComponent});
    subjectModal.present();
  }

  compartilhar(){
    this.socialSharing.shareViaWhatsApp("Vem ganhar dinheiro comigo tambêm! Use meu codigo de compartilhamento: *"+this.codigo+"* e inicie no nivel 1 com 500 pontos!", 
    "http://157.245.38.22/splash.jpg","Is.gd/quizformoney")
  }

  compartilharTodos(){
    this.socialSharing.share("Vem ganhar dinheiro comigo tambêm! Use meu codigo de compartilhamento: "+this.codigo+" e inicie no nivel 1 com 500 pontos!","Quiz For Money","","https://play.google.com/store/apps/details?id=br.com.wincaptcha")
  }
  
  carregarDados(){
    this.presentLoading()
    this.userService.getToken().then((result) => {
      var token = result;
      this.userService.getPerfil(token).then((result: any) => {
        this.zone.run(() => {
          // this.seguidores = result.seguidores;
          if(result.rua != undefined && result.rua != ''){
            this.endereco = result.rua+" nº "+result.numero+", "+result.bairro+", "+result.cidade+" - "+result.estado+", "+result.cep;
          }else{
            this.endereco = "Endereço não cadastrado!";
          }
          if(result.telefone != undefined && result.telefone != ''){
            this.celular = result.telefone;
          }else{
            this.celular = "Celular não cadastrado!";
          }
          this.nome = result.nome;
          this.email = result.email;
          this.codigo = result.codigo;
          this.sexo = result.sexo;
          this.idade = result.idade;
          this.dismissLoading()
        });
      });
      this.userService.getSeguidores(token).then((result: any) => {
        this.zone.run(() => {
          this.seguidores = result.total;
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
