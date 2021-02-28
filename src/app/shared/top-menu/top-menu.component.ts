import { Component, OnInit } from '@angular/core';

interface IMenuItem {
  id: number;
  name: string;
  path: string;
}

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  menuItems: IMenuItem[] = [
    {
      id: 1,
      name: 'All contacts',
      path: '/contacts'
    },
    {
      id: 2,
      name: 'My favorites',
      path: '/favorites'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
