import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaetigkeitsbereicheComponent } from './taetigkeitsbereiche.component';

describe('TaetigkeitsbereicheComponent', () => {
  let component: TaetigkeitsbereicheComponent;
  let fixture: ComponentFixture<TaetigkeitsbereicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaetigkeitsbereicheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaetigkeitsbereicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
