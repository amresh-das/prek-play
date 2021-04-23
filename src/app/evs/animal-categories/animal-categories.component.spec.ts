import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCategoriesComponent } from './animal-categories.component';

describe('AnimalCategoriesComponent', () => {
  let component: AnimalCategoriesComponent;
  let fixture: ComponentFixture<AnimalCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
