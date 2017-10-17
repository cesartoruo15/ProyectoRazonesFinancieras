import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RRentabilidadComponent } from './rrentabilidad.component';

describe('RRentabilidadComponent', () => {
  let component: RRentabilidadComponent;
  let fixture: ComponentFixture<RRentabilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RRentabilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RRentabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
