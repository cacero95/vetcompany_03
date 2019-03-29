import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoPolicialPage } from './codigo-policial.page';

describe('CodigoPolicialPage', () => {
  let component: CodigoPolicialPage;
  let fixture: ComponentFixture<CodigoPolicialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoPolicialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoPolicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
