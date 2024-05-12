import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3KmseComponent } from './d3-kmse.component';

describe('D3KmseComponent', () => {
  let component: D3KmseComponent;
  let fixture: ComponentFixture<D3KmseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3KmseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3KmseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
