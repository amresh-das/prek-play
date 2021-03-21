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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<ReadWordComponent>) {
    this.words = this.data.items;
  }

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe((evt) => {
      console.log(evt.key);
      if (evt.key === 'ArrowLeft') {
        this.prev();
      } else if (evt.key === 'ArrowRight') {
        this.next();
      } else if (evt.key === 'Escape') {
        this.close();
      } else if (evt.key === ' ') {
        this.showPic();
      }
    });
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
