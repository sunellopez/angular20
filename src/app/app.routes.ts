import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then( m => m.LoginComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up/sign-up.page').then( m => m.SignUpPage)
  }
];
