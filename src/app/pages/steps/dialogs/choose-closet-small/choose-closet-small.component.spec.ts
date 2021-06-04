import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseClosetSmallComponent } from './choose-closet-small.component';

describe('ChooseClosetSmallComponent', () => {
  let component: ChooseClosetSmallComponent;
  let fixture: ComponentFixture<ChooseClosetSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseClosetSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseClosetSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
