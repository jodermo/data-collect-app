import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollectHeaderComponent } from './data-collect-header.component';

describe('DataCollectHeaderComponent', () => {
  let component: DataCollectHeaderComponent;
  let fixture: ComponentFixture<DataCollectHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCollectHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCollectHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
