import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactDetailComponent } from 'src/app/components/contact-detail/contact-detail/contact-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContactDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ContactDetailComponent,
      },
      {
        path: '**',
        redirectTo: 'new',
        pathMatch: 'full'
      }
    ])
  ]
})
export class ContactDetailModule { }
