import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Item} from "../../evs/model/seasons";

@Component({
  selector: 'app-select-context-items',
  templateUrl: './select-context-items.component.html',
  styleUrls: ['./select-context-items.component.scss']
})
export class SelectContextItemsComponent implements OnInit {

  displayIndex: number;
  themePicCount: number;
  allItems: Item[] = [];
  itemPics: Item[];

  constructor(private dialogRef: MatDialogRef<SelectContextItemsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.themePicCount = data.themePics ? data.themePics.length : 0;
    this.itemPics = data.itemPics;
    this.displayIndex = 0;
    for (let key in data.items) {
      // @ts-ignore
      data.items[key].forEach(i => this.allItems.push(i));
    }
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

}
