import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild('respMenu') respMenu: any;
  @ViewChild('menuRight') menuRight: any;
  @ViewChild('bar1') bar1: any;
  @ViewChild('bar2') bar2: any;
  @ViewChild('bar3') bar3: any;

  toggleResponsiveMenu() {
    let menuRight = this.menuRight.nativeElement;
    menuRight.classList.toggle('hide');
    this.toggleResponsiveMenuIcon();
  }

  toggleResponsiveMenuIcon() {
    let bar1 = this.bar1.nativeElement;
    let bar2 = this.bar2.nativeElement;
    let bar3 = this.bar3.nativeElement;
    bar1.classList.toggle('rotate-45deg');
    bar2.classList.toggle('width-zero');
    bar3.classList.toggle('rotate--45deg');
  }
}
