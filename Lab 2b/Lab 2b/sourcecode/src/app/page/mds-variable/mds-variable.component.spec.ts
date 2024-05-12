import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdsVariableComponent } from './mds-variable.component';

describe('MdsVariableComponent', () => {
  let component: MdsVariableComponent;
  let fixture: ComponentFixture<MdsVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdsVariableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdsVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
