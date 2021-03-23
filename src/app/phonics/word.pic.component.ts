import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Shuffler} from "../services/shuffle";

@Component({
  selector: 'app-word.pic',
  templateUrl: './word.pic.component.html',
  styleUrls: ['./word.pic.component.scss']
})

export class WordPicComponent {
  word: string;
  resources: any;
  count = 0;
  displayIndex = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<WordPicComponent>) {
    this.word = data.item.word;
    this.resources = Shuffler.shuffle(data.item.resources);
    this.count = this.resources ? this.resources.length : 0;
    this.dialogRef.keydownEvents().subscribe((evt) => this.handle(evt));
  }

  handle(evt: any) {
    if (evt.key === 'ArrowLeft') {
      this.prev();
    } else if (evt.key === 'ArrowRight') {
      this.next();
    }
  }

  next() {
    if (this.displayIndex < this.count - 1) {
      this.displayIndex = (this.displayIndex + 1);
    }
  }

  prev() {
    if (this.displayIndex != 0) {
      this.displayIndex = this.displayIndex - 1;
    }
  }

}
