import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3PcaComponent } from './d3-pca.component';

describe('D3PcaComponent', () => {
  let component: D3PcaComponent;
  let fixture: ComponentFixture<D3PcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3PcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3PcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
