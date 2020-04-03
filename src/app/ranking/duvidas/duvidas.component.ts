import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-duvidas',
  templateUrl: './duvidas.component.html',
  styleUrls: ['./duvidas.component.scss'],
})
export class DuvidasComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  voltar(){
    this.modalCtrl.dismiss();
  }

}
