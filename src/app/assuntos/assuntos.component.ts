import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assuntos',
  templateUrl: './assuntos.component.html',
  styleUrls: ['./assuntos.component.scss'],
})
export class AssuntosComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  escolher(assunto) {
    this.modalCtrl.dismiss({ data: assunto });
  }

}
