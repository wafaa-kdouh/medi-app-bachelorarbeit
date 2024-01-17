import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedikamentScannerComponent } from './medikament-scanner.component';

describe('MedikamentScannerComponent', () => {
  let component: MedikamentScannerComponent;
  let fixture: ComponentFixture<MedikamentScannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedikamentScannerComponent]
    });
    fixture = TestBed.createComponent(MedikamentScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
