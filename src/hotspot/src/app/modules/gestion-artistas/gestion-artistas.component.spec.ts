import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionArtistasComponent } from './gestion-artistas.component';

describe('GestionArtistasComponent', () => {
  let component: GestionArtistasComponent;
  let fixture: ComponentFixture<GestionArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionArtistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
