import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/navbar/navbar.component').then(
        (c) => c.NavbarComponent
      ),
    title: 'Angular 16 Standalone demo',
    children: [
      {
        path: 'firebase-crud',
        loadComponent: () =>
          import('./features/components/list/list.component').then(
            (c) => c.ListComponent
          ),
        title: 'List',
      },
      {
        path: 'skelton-demo',
        loadComponent: () =>
          import(
            './features/components/selton-demo/selton-demo.component'
          ).then((c) => c.SeltonDemoComponent),
        title: 'Skelton-demo',
      },
      {
        path: '**',
        redirectTo: 'firebase-crud',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
