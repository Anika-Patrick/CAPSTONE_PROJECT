import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StrengthPage } from './strength.page';

describe('StrengthPage', () => {
  let component: StrengthPage;
  let fixture: ComponentFixture<StrengthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
