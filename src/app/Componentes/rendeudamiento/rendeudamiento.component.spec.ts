import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { REndeudamientoComponent } from './rendeudamiento.component';

describe('REndeudamientoComponent', () => {
  let component: REndeudamientoComponent;
  let fixture: ComponentFixture<REndeudamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ REndeudamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(REndeudamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
