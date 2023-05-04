import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaFestivalComponent } from './vista-festival.component';

describe('VistaFestivalComponent', () => {
  let component: VistaFestivalComponent;
  let fixture: ComponentFixture<VistaFestivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaFestivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
