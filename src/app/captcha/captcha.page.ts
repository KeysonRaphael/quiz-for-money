import { Component, OnInit } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { AdmobfreeService } from '../admobfree.service';
import{UsersService} from '../users.service';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { NgZone } from "@angular/core";
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';





@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.page.html',
  styleUrls: ['./captcha.page.scss'],
})
export class CaptchaPage implements OnInit {
  public captcha = "";
  public total = "";
  public buttonText = "Proximo Captcha";
  public atual = 0;
  public solucao;
  public token;
  public task;
  public perguntas = {};
  public question = "";
  public answer;
  public false1; 
  public false2; 
  public false3; 
  public false4;
  public button1;
  public button2;
  public button3;
  public button4;
  public button5;
  public erro = 0;
  public loading;
  public progress = 0;


  constructor(private alertController: AlertController,public loadingController: LoadingController,private zone: NgZone, public events: Events, private admobfreeService: AdmobfreeService, private storage: Storage, private toast: ToastController, private usersService: UsersService) { }

  ngOnInit() {
    this.getPerguntas("0");
    this.showBanner();
    this.getgrana();
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
    return this.total;
  }

  showBanner(){
    this.admobfreeService.BannerAd();
  }

  showInterstitial(){
    this.admobfreeService.InterstitialAd();
  }
  
  showRewardVideo(){
    this.admobfreeService.RewardVideoAd();
  }

  gerarCaptcha(){
    const numbers = ['1','2','3','4','5','6','7','8','9']
    while (this.captcha.length < 6){
      const intp = this.getRandomInt(0,8);
      this.captcha += numbers[intp];
    }
  }

  gerarPergunta(){
      const intp = this.getRandomInt(0,Object.keys(this.perguntas).length);
      this.question = this.perguntas[intp].question;
      this.answer = this.perguntas[intp].answer;
      this.false1 = this.perguntas[intp].false1;
      this.false2 = this.perguntas[intp].false2;
      this.false3 = this.perguntas[intp].false3;
      this.false4 = this.perguntas[intp].false4;
      var listab = [1, 2, 3, 4, 5];
      var listar = [this.answer, this.false1, this.false2, this.false3, this.false4];
      if (this.false2 == "") {
        listab.splice(2,3);
        listar.splice(2,3);
        document.getElementsByName("button3")[0].hidden = true;
        document.getElementsByName("button4")[0].hidden = true;
        document.getElementsByName("button5")[0].hidden = true;
      }else{
        document.getElementsByName("button3")[0].hidden = false;
        document.getElementsByName("button4")[0].hidden = false;
        document.getElementsByName("button5")[0].hidden = false;
      }
      
      while (listab.length>0){
        const intb = this.getRandomInt(0,listab.length-1);
        const intr = this.getRandomInt(0,listar.length-1);
        this.zone.run(() => {
          switch (listab[intb]) {
            case 1:
              this.button1 = listar[intr];
              break;
            case 2:
              this.button2 = listar[intr];
              break;
            case 3:
              
              this.button3 = listar[intr];
              console.log(listar[intr]);
              break;
            case 4:
              this.button4 = listar[intr];
              break;
            case 5:
              this.button5 = listar[intr];
              break;
            default:
              break;
          }
          listab[intb] = listar[intr];
        });
        listab.splice(intb,1);
        listar.splice(intr,1);
      }
      console.log(listab);
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

  async getPerguntas(subject:string){
    this.presentLoading();
    await this.usersService.getToken().then(async (result) => {
      this.token = result;
      console.log(this.token);
      await this.usersService.getPerguntas(this.token, subject).then( async (result: any) => {
        console.log(result);
        this.perguntas = result;
      });
    });
    this.gerarPergunta();
    this.dismissLoading();

  }

  liberarPremio(resposta:string){
    if (resposta == this.answer) { 
      this.gerarPergunta();
      this.atual += 1;
      if (this.atual != 3) {
        this.presentConfirm("Resposta Correta!");
      }
      this.progress += 0.33;
      if (this.atual == 3) {
        this.presentConfirm("Parabéns, você respondeu 3 perguntas corretamente e receberá seu prêmio!", 1);
        this.atual = 0;
        this.progress = 0; 
      }
    }else{
      this.erro +=1;
      if (this.erro == 3){
        this.erro = 0;
        this.showInterstitial();
      }
      this.presentConfirm("<p>Resposta Incorreta</p> <p>A resposta correta é: "+this.answer+"</p>");
      this.gerarPergunta();
    }
  }

  async presentConfirm(mensagem,nq = 0) {
    let text = 'Ok';
    if (nq == 1) {
      text = "Receber Prêmio!";
    }
    let alert = await this.alertController.create({
      message: mensagem,
      cssClass:"",
      buttons: [
        {
          text: text,
          role: 'cancel',
          handler: () => {
            if (nq == 1) {
              this.showRewardVideo()
              this.usersService.getGrana(this.token).then((result: any) => {
                this.total = result.money;
              });
            }
          }
        }
      ],
    });
    alert.present();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
