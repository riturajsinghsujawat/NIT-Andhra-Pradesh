import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglefeedComponent } from './singlefeed.component';

describe('SinglefeedComponent', () => {
  let component: SinglefeedComponent;
  let fixture: ComponentFixture<SinglefeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglefeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglefeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
