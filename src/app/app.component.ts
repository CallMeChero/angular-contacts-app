import { Component, Type } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private componentBeforeNavigation: string | Type<any>;

  constructor(private route: ActivatedRoute, private router: Router, private ngxSpinner: NgxSpinnerService) {
    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationStart) {
        this.ngxSpinner.show();
      }

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
        let currentRoute = this.route;
        while (currentRoute.firstChild) currentRoute = currentRoute.firstChild;
        if (this.componentBeforeNavigation !== currentRoute.component) {
          if (window) window.scrollTo(0, 0);
        }
        this.componentBeforeNavigation = currentRoute.component;
        setTimeout(() => { this.ngxSpinner.hide() }, 500)
      }
    });
  }
}
