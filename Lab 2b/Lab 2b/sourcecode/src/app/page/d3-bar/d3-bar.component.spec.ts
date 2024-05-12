import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3BarComponent } from './d3-bar.component';

describe('D3BarComponent', () => {
  let component: D3BarComponent;
  let fixture: ComponentFixture<D3BarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3BarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
