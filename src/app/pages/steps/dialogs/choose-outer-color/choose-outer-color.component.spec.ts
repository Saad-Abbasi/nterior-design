import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseOuterColorComponent } from './choose-outer-color.component';

describe('ChooseOuterColorComponent', () => {
  let component: ChooseOuterColorComponent;
  let fixture: ComponentFixture<ChooseOuterColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseOuterColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseOuterColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
