import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestIntroComponent } from './test-intro.component';

describe('TestIntroComponent', () => {
  let component: TestIntroComponent;
  let fixture: ComponentFixture<TestIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
