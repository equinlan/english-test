import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorComponent } from './proctor.component';

describe('ProctorComponent', () => {
  let component: ProctorComponent;
  let fixture: ComponentFixture<ProctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
