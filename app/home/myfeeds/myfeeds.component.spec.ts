import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfeedsComponent } from './myfeeds.component';

describe('MyfeedsComponent', () => {
  let component: MyfeedsComponent;
  let fixture: ComponentFixture<MyfeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
