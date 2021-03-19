import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Word.PicComponent } from './word.pic.component';

describe('Word.PicComponent', () => {
  let component: Word.PicComponent;
  let fixture: ComponentFixture<Word.PicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Word.PicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Word.PicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
