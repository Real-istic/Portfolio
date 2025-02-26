import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})

export class ImprintComponent implements AfterViewInit {
  /**
   * function to scroll to the top of the page
   */
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
}
