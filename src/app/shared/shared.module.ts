import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule,
    NgxSpinnerModule
  ],
  exports: [NgxSpinnerModule]
})
export class SharedModule { }

