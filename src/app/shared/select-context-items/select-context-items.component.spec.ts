import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContextItemsComponent } from './select-context-items.component';

describe('SelectContextItemsComponent', () => {
  let component: SelectContextItemsComponent;
  let fixture: ComponentFixture<SelectContextItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectContextItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContextItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
