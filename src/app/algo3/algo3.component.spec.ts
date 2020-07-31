import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Algo3Component } from './algo3.component';

describe('Algo3Component', () => {
  let component: Algo3Component;
  let fixture: ComponentFixture<Algo3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Algo3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Algo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
