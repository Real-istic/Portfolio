import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboveTheFoldComponent } from './above-the-fold.component';

describe('AboveTheFoldComponent', () => {
  let component: AboveTheFoldComponent;
  let fixture: ComponentFixture<AboveTheFoldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboveTheFoldComponent]
    });
    fixture = TestBed.createComponent(AboveTheFoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
