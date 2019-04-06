import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarServiciosPage } from './editar-servicios.page';

describe('EditarServiciosPage', () => {
  let component: EditarServiciosPage;
  let fixture: ComponentFixture<EditarServiciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarServiciosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarServiciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
