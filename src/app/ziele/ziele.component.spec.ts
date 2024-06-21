import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZieleComponent } from './ziele.component';

describe('ZieleComponent', () => {
  let component: ZieleComponent;
  let fixture: ComponentFixture<ZieleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZieleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZieleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
