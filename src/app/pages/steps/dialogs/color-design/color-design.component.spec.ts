import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDesignComponent } from './color-design.component';

describe('ColorDesignComponent', () => {
  let component: ColorDesignComponent;
  let fixture: ComponentFixture<ColorDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
