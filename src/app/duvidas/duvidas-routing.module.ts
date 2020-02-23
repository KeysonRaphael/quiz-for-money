import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuvidasPage } from './duvidas.page';

const routes: Routes = [
  {
    path: '',
    component: DuvidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuvidasPageRoutingModule {}
