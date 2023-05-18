import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingInfoComponent } from './editing-info.component';

describe('EditingInfoComponent', () => {
  let component: EditingInfoComponent;
  let fixture: ComponentFixture<EditingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditingInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
