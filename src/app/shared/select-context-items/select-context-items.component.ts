import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Item} from "../../evs/model/seasons";
import {Randomizer} from "../../services/randomizer";
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-select-context-items',
  templateUrl: './select-context-items.component.html',
  styleUrls: ['./select-context-items.component.scss']
})
export class SelectContextItemsComponent implements OnInit {

  displayIndex: number;
  themePicCount: number;
  choices: Item[] = [];
  answers: Item[] = [];
  items: Map<string, Item[]>;
  relations: Map<string, string>;

  constructor(private dialogRef: MatDialogRef<SelectContextItemsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.themePicCount = data.themePics ? data.themePics.length : 0;
    this.displayIndex = 0;
    this.items = data.items;
    this.relations = new Map<string, string>();
    this.items.forEach((values,key) => {
      values.forEach(v => {
        this.choices.push(v);
        this.relations.set(v.name, key);
      });
    });
    (<Item[]>data.otherItems).forEach(v => this.choices.push(v));
    Randomizer.randomize(this.choices);
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((evt) => {
      if (evt.key === 'ArrowLeft') {
        this.prev();
      } else if (evt.key === 'ArrowRight') {
        this.next();
      } else if (evt.key === 'Escape') {
        this.close();
      }
    });
  }

  getThemePic(): string {
    return '/assets/images/' + this.data.themePics[this.displayIndex];
  }

  prev() {
    if (this.displayIndex != 0) {
      this.displayIndex = this.displayIndex - 1;
    }
  }

  next() {
    if (this.displayIndex != this.themePicCount - 1) {
      this.displayIndex = this.displayIndex + 1;
    }
  }

  close() {
    this.dialogRef.close();
  }

  getPic(item: Item) {
    const pic = item.pics ? item.pics[Randomizer.randomInt(item.pics.length)] : '';
    return '/assets/images/' + pic;
  }

  allowDrag(item: CdkDrag<any>) {
    return item.element.nativeElement.id.split(':')[0] !== 'undefined';
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }

  isSuccess() {
    return this.choices.filter(c => this.relations.has(c.name)).length === 0;
  }
}
