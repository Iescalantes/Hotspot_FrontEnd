import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBusinessComponent } from './navigation-business.component';

describe('NavigationBusinessComponent', () => {
  let component: NavigationBusinessComponent;
  let fixture: ComponentFixture<NavigationBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
