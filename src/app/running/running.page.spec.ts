import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RunningPage } from './running.page';

describe('RunningPage', () => {
  let component: RunningPage;
  let fixture: ComponentFixture<RunningPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
