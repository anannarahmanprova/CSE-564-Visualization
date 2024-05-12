import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumPcpComponent } from './num-pcp.component';

describe('NumPcpComponent', () => {
  let component: NumPcpComponent;
  let fixture: ComponentFixture<NumPcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumPcpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumPcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
