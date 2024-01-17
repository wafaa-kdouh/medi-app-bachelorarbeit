import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedikamentAddComponent } from './medikament-add.component';

describe('MedikamentAddComponent', () => {
  let component: MedikamentAddComponent;
  let fixture: ComponentFixture<MedikamentAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedikamentAddComponent],
    });
    fixture = TestBed.createComponent(MedikamentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
