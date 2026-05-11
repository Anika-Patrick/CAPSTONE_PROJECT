import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FitnessModePage } from './fitness-mode.page';

describe('FitnessModePage', () => {
  let component: FitnessModePage;
  let fixture: ComponentFixture<FitnessModePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
