import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';

import{HttpClientModule} from '@angular/common/http';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

import { AdmobfreeService } from './admobfree.service';
import { BrMaskerModule } from 'br-mask';
import { HTTP } from '@ionic-native/http/ngx';

import { AppRate } from '@ionic-native/app-rate/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Market } from '@ionic-native/market/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AssuntosComponent} from './assuntos/assuntos.component';
import { RankingComponent } from './ranking/ranking.component';
import { DuvidasComponent } from './ranking/duvidas/duvidas.component';
import { PremiacaoComponent } from './ranking/premiacao/premiacao.component';
import { HistoricoComponent } from './carteira/historico/historico.component';
import { PerfilComponent } from './captcha/perfil/perfil.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PontuacaoComponent } from './captcha/perfil/pontuacao/pontuacao.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CelularComponent } from './captcha/perfil/cadastro/celular/celular.component';
import { EnderecoComponent } from './captcha/perfil/cadastro/endereco/endereco.component';
import { RecuperarComponent } from './home/recuperar/recuperar.component';
import { GruposComponent } from './grupos/grupos.component';
import { HistoricoGrupoComponent } from './grupos/historico/historico.component';
import { AnuncioLinkComponent } from './anuncio-link/anuncio-link.component';
import { PessoalComponent } from './captcha/perfil/cadastro/pessoal/pessoal.component';

@NgModule({
  declarations: [PessoalComponent,AnuncioLinkComponent,AppComponent,AssuntosComponent,RankingComponent,DuvidasComponent,RecuperarComponent,
    PremiacaoComponent,GruposComponent,HistoricoGrupoComponent,HistoricoComponent,PerfilComponent,PontuacaoComponent,CelularComponent,EnderecoComponent],
  entryComponents: [PessoalComponent,AnuncioLinkComponent,AssuntosComponent,GruposComponent,HistoricoGrupoComponent,RankingComponent,DuvidasComponent,RecuperarComponent,PremiacaoComponent,CelularComponent,EnderecoComponent,PontuacaoComponent,PerfilComponent,HistoricoComponent],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    BrMaskerModule,
    IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    AdmobfreeService,Dialogs,HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    AppRate,InAppBrowser,
    LocalNotifications,Market,SocialSharing,
    OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
