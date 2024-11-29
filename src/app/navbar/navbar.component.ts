import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('respMenu') respMenu!: ElementRef;
  @ViewChild('menuRight') menuRight!: ElementRef;
  @ViewChild('bar1') bar1!: ElementRef;
  @ViewChild('bar2') bar2!: ElementRef;
  @ViewChild('bar3') bar3!: ElementRef;

  /**
   * function to toggle the responsive menu
   *
   */
  protected toggleResponsiveMenu(): void {
    let menuRight = this.menuRight.nativeElement;
    menuRight.classList.toggle('show');
    this.toggleResponsiveMenuIcon();
  }

  /**
   * function to toggle the responsive menu icon
   */
  protected toggleResponsiveMenuIcon(): void {
    let bar1 = this.bar1.nativeElement;
    let bar2 = this.bar2.nativeElement;
    let bar3 = this.bar3.nativeElement;
    bar1.classList.toggle('rotate-45deg');
    bar2.classList.toggle('width-zero');
    bar3.classList.toggle('rotate--45deg');
  }
}
