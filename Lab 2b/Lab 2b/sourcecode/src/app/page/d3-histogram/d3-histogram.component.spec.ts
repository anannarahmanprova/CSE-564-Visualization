import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3HistogramComponent } from './d3-histogram.component';

describe('D3HistogramComponent', () => {
  let component: D3HistogramComponent;
  let fixture: ComponentFixture<D3HistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3HistogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3HistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
