import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollectFooterComponent } from './data-collect-footer.component';

describe('DataCollectFooterComponent', () => {
  let component: DataCollectFooterComponent;
  let fixture: ComponentFixture<DataCollectFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCollectFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCollectFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
