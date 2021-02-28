import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsOverviewComponent } from './contacts-overview/contacts-overview.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContactsOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactsOverviewComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ]
})
export class ContactsModule { }
