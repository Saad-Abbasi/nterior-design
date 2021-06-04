import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixthStepComponent } from './sixth-step.component';

describe('SixthStepComponent', () => {
  let component: SixthStepComponent;
  let fixture: ComponentFixture<SixthStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixthStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixthStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
