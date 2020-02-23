import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'captcha',
    loadChildren: () => import('./captcha/captcha.module').then( m => m.CaptchaPageModule)
  },
  {
    path: 'carteira',
    loadChildren: () => import('./carteira/carteira.module').then( m => m.CarteiraPageModule)
  },
  {
    path: 'duvidas',
    loadChildren: () => import('./duvidas/duvidas.module').then( m => m.DuvidasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
