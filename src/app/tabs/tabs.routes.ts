import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../tab1/tab1.page').then((m) => m.Tab1Page),
          }
        ],
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../tab2/tab2.page').then((m) => m.Tab2Page),
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../tab3/tab3.page').then((m) => m.Tab3Page),
          }
        ],
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'profile/edit',
    loadComponent: () =>
      import('../tab3/edit-profile/edit-profile.page').then((m) => m.EditProfilePage),
  }
];