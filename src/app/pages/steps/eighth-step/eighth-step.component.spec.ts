import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EighthStepComponent } from './eighth-step.component';

describe('EighthStepComponent', () => {
  let component: EighthStepComponent;
  let fixture: ComponentFixture<EighthStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EighthStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EighthStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
