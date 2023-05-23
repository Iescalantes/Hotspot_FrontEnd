import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtsComponent } from './add-arts.component';

describe('AddArtsComponent', () => {
  let component: AddArtsComponent;
  let fixture: ComponentFixture<AddArtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArtsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
