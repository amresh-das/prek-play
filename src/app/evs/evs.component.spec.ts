import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvsComponent } from './evs.component';

describe('EvsComponent', () => {
  let component: EvsComponent;
  let fixture: ComponentFixture<EvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
