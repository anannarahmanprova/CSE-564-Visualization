import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ScattermatrixComponent } from './d3-scattermatrix.component';

describe('D3ScattermatrixComponent', () => {
  let component: D3ScattermatrixComponent;
  let fixture: ComponentFixture<D3ScattermatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3ScattermatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3ScattermatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
