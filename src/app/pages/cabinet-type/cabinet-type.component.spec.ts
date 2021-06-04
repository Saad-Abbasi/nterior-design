import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetTypeComponent } from './cabinet-type.component';

describe('CabinetTypeComponent', () => {
  let component: CabinetTypeComponent;
  let fixture: ComponentFixture<CabinetTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
