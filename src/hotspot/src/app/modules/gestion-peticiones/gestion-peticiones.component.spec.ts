import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPeticionesComponent } from './gestion-peticiones.component';

describe('GestionPeticionesComponent', () => {
  let component: GestionPeticionesComponent;
  let fixture: ComponentFixture<GestionPeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPeticionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
