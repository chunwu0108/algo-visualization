import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Algo2Component } from './algo2.component';

describe('Algo2Component', () => {
  let component: Algo2Component;
  let fixture: ComponentFixture<Algo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Algo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Algo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
