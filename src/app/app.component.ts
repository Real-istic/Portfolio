import { Component } from '@angular/core';
import { Router } from "@angular/router";
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  constructor(public router: Router) { }

  ngOnInit() {
     AOS.init();
  }
}
