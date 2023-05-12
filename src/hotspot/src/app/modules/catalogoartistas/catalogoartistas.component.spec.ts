import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoartistasComponent } from './catalogoartistas.component';

describe('CatalogoartistasComponent', () => {
  let component: CatalogoartistasComponent;
  let fixture: ComponentFixture<CatalogoartistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoartistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoartistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
