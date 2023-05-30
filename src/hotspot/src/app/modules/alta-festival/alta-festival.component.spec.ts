import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaFestivalComponent } from './alta-festival.component';

describe('AltaFestivalComponent', () => {
  let component: AltaFestivalComponent;
  let fixture: ComponentFixture<AltaFestivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaFestivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
