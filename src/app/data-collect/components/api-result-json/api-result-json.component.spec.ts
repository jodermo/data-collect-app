import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResultJsonComponent } from './api-result-json.component';

describe('ApiResultJsonComponent', () => {
  let component: ApiResultJsonComponent;
  let fixture: ComponentFixture<ApiResultJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiResultJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiResultJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
