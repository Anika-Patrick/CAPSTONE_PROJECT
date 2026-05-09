import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardioPage } from './cardio.page';

describe('CardioPage', () => {
  let component: CardioPage;
  let fixture: ComponentFixture<CardioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
