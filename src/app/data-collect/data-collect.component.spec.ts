import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollectComponent } from './data-collect.component';

describe('DataCollectComponent', () => {
  let component: DataCollectComponent;
  let fixture: ComponentFixture<DataCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCollectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
