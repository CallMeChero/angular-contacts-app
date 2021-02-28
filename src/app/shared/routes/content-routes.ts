import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'contacts',
    loadChildren: () => import('src/app/components/contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('src/app/components/contacts/contacts.module').then(m => m.ContactsModule)
  },
];
