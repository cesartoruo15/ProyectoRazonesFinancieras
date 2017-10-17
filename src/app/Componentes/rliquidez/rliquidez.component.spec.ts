import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RLiquidezComponent } from './rliquidez.component';

describe('RLiquidezComponent', () => {
  let component: RLiquidezComponent;
  let fixture: ComponentFixture<RLiquidezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RLiquidezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RLiquidezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
