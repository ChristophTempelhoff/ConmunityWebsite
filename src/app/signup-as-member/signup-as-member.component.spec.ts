import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsMemberComponent } from './signup-as-member.component';

describe('SignupAsMemberComponent', () => {
  let component: SignupAsMemberComponent;
  let fixture: ComponentFixture<SignupAsMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAsMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupAsMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
