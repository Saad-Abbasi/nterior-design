import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventhStepComponent } from './seventh-step.component';

describe('SeventhStepComponent', () => {
  let component: SeventhStepComponent;
  let fixture: ComponentFixture<SeventhStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeventhStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeventhStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
