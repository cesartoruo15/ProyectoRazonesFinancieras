import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RCoberturaComponent } from './rcobertura.component';

describe('RCoberturaComponent', () => {
  let component: RCoberturaComponent;
  let fixture: ComponentFixture<RCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
