import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesOverviewComponent } from './favorites-overview.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FavoritesOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FavoritesOverviewComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ]
})
export class FavoritesModule { }
