import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseClosetComponent } from './choose-closet.component';

describe('ChooseClosetComponent', () => {
  let component: ChooseClosetComponent;
  let fixture: ComponentFixture<ChooseClosetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseClosetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseClosetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
