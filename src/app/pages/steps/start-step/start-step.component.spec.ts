import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartStepComponent } from './start-step.component';

describe('StartStepComponent', () => {
  let component: StartStepComponent;
  let fixture: ComponentFixture<StartStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
