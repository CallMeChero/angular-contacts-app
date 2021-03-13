import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  displayNavigation: boolean;

  constructor(private router: Router) {
    router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd && (event.url.indexOf('/contacts') > -1 || event.url.indexOf('/favorites') > -1)) {
          this.displayNavigation = true;
        } else {
          this.displayNavigation = false;
        }
      });
  }

  ngOnInit(): void {
  }

}
