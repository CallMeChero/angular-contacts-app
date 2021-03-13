import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'contacts',
    data: { isFavorites: false },
    loadChildren: () => import('src/app/components/contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'favorites',
    data: { isFavorites: true },
    loadChildren: () => import('src/app/components/contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('src/app/components/contact-detail/contact-detail.module').then(m => m.ContactDetailModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('src/app/components/contact-add-or-edit/contact-add-or-edit.module').then(m => m.ContactAddOrEditModule)
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  }
];
