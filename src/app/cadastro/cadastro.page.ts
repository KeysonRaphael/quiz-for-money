import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service'
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  model: User;
  public email = "";
  public nome = "";
  public senha = "";
  public rsenha = "";
  public loading;

  constructor(public loadingController: LoadingController,private router: Router, private userProvider: UsersService, private toast: ToastController) {
    this.model = new User();
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

  ngOnInit() {
  }

  cadastrar() {
    if (this.validar() == "1") {
      this.presentLoading();
      this.model.email = this.email;
      this.model.senha = this.senha;
      this.model.nome = this.nome;
      this.model.rsenha = this.rsenha;
      this.userProvider.createAccount(this.model.email,this.model.senha,this.model.nome)
      .then((result: any) => {
        this.dismissLoading();        
        this.router.navigateByUrl('/home');
      })
      .catch((error: any) => {
        alert('Erro ao efetuar cadastro!');
        this.dismissLoading();        
      });   
    }
  }

  public validar(){
    var letters = /^[A-Za-z çãé]+$/;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.nome.length < 2) {
      alert('Nome Incorreto!');
      return "0";
    }else if(!this.nome.match(letters)){
      alert('Nome deve conter apenas letras!');
      return "0";
    }else if(this.senha != this.rsenha){
      alert('As senhas devem ser iguais!');
      return "0";
    }else if(this.senha.length < 6){
      alert('Senha deve conter pelo menos 6 caracteres!');
      return "0";
    }else if(!this.email.match(re)){
      alert('Email incorreto!');
      return "0";
    }
    return "1";
  }

}
export class User {
  email: string;
  senha: string;
  rsenha: string;
  nome : string;
}
