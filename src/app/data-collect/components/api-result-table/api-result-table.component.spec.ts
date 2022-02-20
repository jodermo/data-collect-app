import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResultTableComponent } from './api-result-table.component';

describe('ApiResultTableComponent', () => {
  let component: ApiResultTableComponent;
  let fixture: ComponentFixture<ApiResultTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiResultTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
