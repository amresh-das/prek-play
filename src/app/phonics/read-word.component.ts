import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Word} from "../model/word.model";
import {WordPicComponent} from "./word.pic.component";

@Component({
  selector: 'app-read-word',
  templateUrl: './read-word.component.html',
  styleUrls: ['./read-word.component.scss']
})
export class ReadWordComponent {
  words: Word[];
  displayIndex = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<ReadWordComponent>) {
    this.words = this.data.items;
  }

  next() {
    if (this.displayIndex < this.words.length) {
      this.displayIndex++;
    }
  }

  prev() {
    if (this.displayIndex > 0) {
      this.displayIndex--;
    }
  }

  allDone() : boolean {
    return this.displayIndex === this.words.length;
  }

  getWord(): Word {
    return this.words[this.displayIndex];
  }

  showPic() {
    let dialogWidth = window.innerWidth < window.innerHeight ? '80%' : '40%';
    this.dialog.open(WordPicComponent, {
      width: dialogWidth,
      data: {
        item: this.getWord()
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
