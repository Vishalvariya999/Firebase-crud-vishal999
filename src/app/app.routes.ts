import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/components/list/list.component').then(
        (c) => c.ListComponent
      ),
    title: 'List',
  },
];
