import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPeticionComponent } from './form-peticion.component';

describe('FormPeticionComponent', () => {
  let component: FormPeticionComponent;
  let fixture: ComponentFixture<FormPeticionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPeticionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
