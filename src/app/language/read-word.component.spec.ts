import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadWordComponent } from './read-word.component';

describe('ReadWordComponent', () => {
  let component: ReadWordComponent;
  let fixture: ComponentFixture<ReadWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
