import { Component, OnInit, NgZone } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-duvidas',
  templateUrl: './duvidas.page.html',
  styleUrls: ['./duvidas.page.scss'],
})
export class DuvidasPage implements OnInit {
  public valor: any;

  constructor(private usersService: UsersService,private zone: NgZone) { }

  ngOnInit() {
    this.getValor();
  }
  private getValor() {
    this.usersService.getValor().then((result: any) => {
      this.zone.run(() => {
        this.valor = result.message;
      });
    });
  }
}
