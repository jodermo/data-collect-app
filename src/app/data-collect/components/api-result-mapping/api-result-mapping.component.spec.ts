import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResultMappingComponent } from './api-result-mapping.component';

describe('ApiResultMappingComponent', () => {
  let component: ApiResultMappingComponent;
  let fixture: ComponentFixture<ApiResultMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiResultMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiResultMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
