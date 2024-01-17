import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedikamentListeComponent } from './medikament-liste.component';

describe('MedikamentListeComponent', () => {
  let component: MedikamentListeComponent;
  let fixture: ComponentFixture<MedikamentListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedikamentListeComponent]
    });
    fixture = TestBed.createComponent(MedikamentListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
