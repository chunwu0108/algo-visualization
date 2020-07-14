import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Algo1Component } from './algo1.component';

describe('Algo1Component', () => {
  let component: Algo1Component;
  let fixture: ComponentFixture<Algo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Algo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Algo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
