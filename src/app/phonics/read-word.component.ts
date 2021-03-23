import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Word} from "../model/word.model";
import {WordPicComponent} from "./word.pic.component";

@Component({
  selector: 'app-read-word',
  templateUrl: './read-word.component.html',
  styleUrls: ['./read-word.component.scss']
})
export class ReadWordComponent implements OnInit {
  words: Word[];
  displayIndex = 0;
  editable = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<ReadWordComponent>) {
    this.words = this.data.items;
  }

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe((evt) => {
      if (evt.key === 'ArrowLeft') {
        this.prev();
      } else if (evt.key === 'ArrowRight') {
        this.next();
      } else if (evt.key === 'Escape') {
        this.close();
      } else if (evt.key === 'Enter') {
        this.showPic();
      }
    });
  }

  next() {
    if (this.displayIndex < this.words.length - 1) {
      this.displayIndex++;
      this.editable = false;
    }
  }

  prev() {
    if (this.displayIndex > 0) {
      this.displayIndex--;
      this.editable = false;
    }
  }

  toggleEditable() {
    this.editable = !this.editable;
  }

  allDone() : boolean {
    return this.displayIndex === this.words.length;
  }

  getWord(): Word {
    return this.words[this.displayIndex];
  }

  showPic() {
    if (this.getWord()?.resources?.length) {
      let dialogWidth = window.innerWidth < window.innerHeight ? '80%' : '40%';
      const dialogRef = this.dialog.open(WordPicComponent, {
        width: dialogWidth,
        hasBackdrop: true,
        data: {
          item: this.getWord()
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
