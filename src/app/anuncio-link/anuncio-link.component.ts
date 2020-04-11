import { Component, OnInit, NgZone } from '@angular/core';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { UsersService } from '../users.service';
import { Events, AlertController, ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-anuncio-link',
  templateUrl: './anuncio-link.component.html',
  styleUrls: ['./anuncio-link.component.scss'],
})
export class AnuncioLinkComponent implements OnInit {
  public id = ''
  public link = ''
  public imagem = ''
  public value = true
  public fechar = 'Fechar Anuncio'
  public tempo: number;
  constructor(private alertController: AlertController,public events: Events, 
    public inAppBrowser:InAppBrowser, private zone: NgZone, 
    public usersService:UsersService, private modalController: ModalController,public platform:Platform) {
      events.subscribe('fecharAnuncio', (user, time) => {
        this.fecharAnuncio();
      });
     }

  async ngOnInit() {
    this.platform.backButton.subscribeWithPriority(999990,  () => {
        //alert("back pressed");
    });
    await this.usersService.getToken().then((result) => {
      var token = result;
      this.usersService.getAnuncio(token).then(async(result: any) => {
          this.id = result.id;
          this.imagem = "http://157.245.38.22/"+result.imagem;
          this.link = result.link;
          this.tempo = parseInt(result.tempo);
          this.zone.run(()=>{
            this.resolverDepoisDe1Segundos()
          })
      });
    });
    
  }

  resolverDepoisDe1Segundos() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.tempo -= 1
        if (this.tempo > 0){
          this.resolverDepoisDe1Segundos()
        }else if (this.tempo == 0){
          this.tempo = null;
          this.value = false;
        }else{
          this.resolverDepoisDe1Segundos()
        }
      }, 1000);
    });
  }

  private fecharAnuncio() {
    this.usersService.getToken().then((result) => {
      var token = result;
      this.usersService.minAnuncio(token,this.id).then((result: any) => {
      });
    });
    this.modalController.dismiss();
  }

  abrir(){
    let browser = this.inAppBrowser.create(this.link);
    browser.show();
  }

}
