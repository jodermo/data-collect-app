import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpRequestStatusComponent } from './http-request-status.component';

describe('HttpRequestStatusComponent', () => {
  let component: HttpRequestStatusComponent;
  let fixture: ComponentFixture<HttpRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpRequestStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
