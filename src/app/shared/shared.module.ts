import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { ConfirmationModule } from './confirmation/confirmation.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule,
    NgxSpinnerModule,
    ConfirmationModule
  ],
  exports: [
    NgxSpinnerModule,
    ConfirmationModule
  ]
})
export class SharedModule { }

