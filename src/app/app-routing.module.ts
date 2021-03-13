import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { content } from './shared/routes/content-routes';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: content
  },
  {
    path: '**',
    redirectTo: 'contacts'
  }
  // nisu tražene error stranice... niti je spomenut error handling stoga ovo nije booletproof
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
