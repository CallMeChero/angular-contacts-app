import { ContactAddOrEditComponent } from './contact-add-or-edit/contact-add-or-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContactAddOrEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'new',
        component: ContactAddOrEditComponent,
      },
      {
        path: ':id',
        component: ContactAddOrEditComponent,
      },
      {
        path: '**',
        redirectTo: 'new',
        pathMatch: 'full'
      }
    ])
  ]
})
export class ContactAddOrEditModule { }
