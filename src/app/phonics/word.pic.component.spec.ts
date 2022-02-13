import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordPicComponent } from './word.pic.component';

describe('WordPicComponent', () => {
  let component: WordPicComponent;
  let fixture: ComponentFixture<WordPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordPicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
