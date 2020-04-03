import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { UsersService } from '../../users.service';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent implements OnInit {
  historico = "";
  constructor(public modalCtrl: ModalController,public userService : UsersService,private zone: NgZone) { }

  ngOnInit() {
    this.getHistorico();
  }

  voltar(){
    this.modalCtrl.dismiss();
  }

  private getHistorico() {
    this.userService.getToken().then((result) => {
      var token = result;
      this.userService.getHistorico(token).then((result: any) => {
        this.zone.run(() => {
          this.historico = result.pagamentos;
        });
      });
    });
    return this.historico;
  }

}
