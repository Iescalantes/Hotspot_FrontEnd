import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaArtistaComponent } from './vista-artista.component';

describe('VistaArtistaComponent', () => {
  let component: VistaArtistaComponent;
  let fixture: ComponentFixture<VistaArtistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaArtistaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VistaArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
