import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionListaPeticionesComponent } from './gestion-lista-peticiones.component';

describe('GestionListaPeticionesComponent', () => {
  let component: GestionListaPeticionesComponent;
  let fixture: ComponentFixture<GestionListaPeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionListaPeticionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionListaPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
