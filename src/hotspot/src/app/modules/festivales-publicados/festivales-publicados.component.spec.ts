import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalesPublicadosComponent } from './festivales-publicados.component';

describe('FestivalesPublicadosComponent', () => {
  let component: FestivalesPublicadosComponent;
  let fixture: ComponentFixture<FestivalesPublicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FestivalesPublicadosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FestivalesPublicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
