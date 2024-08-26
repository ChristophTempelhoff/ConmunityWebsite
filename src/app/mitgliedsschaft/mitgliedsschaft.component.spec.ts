import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitgliedsschaftComponent } from './mitgliedsschaft.component';

describe('MitgliedsschaftComponent', () => {
  let component: MitgliedsschaftComponent;
  let fixture: ComponentFixture<MitgliedsschaftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MitgliedsschaftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitgliedsschaftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
