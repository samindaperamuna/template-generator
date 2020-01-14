import { Component, OnInit } from '@angular/core';

import * as Globals from '../global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appTitle: string;
  appSubtitle: string;

  constructor() {
    this.appTitle = Globals.appTitle;
    this.appSubtitle = Globals.appSubitle;
  }

  ngOnInit() {
  }
}
