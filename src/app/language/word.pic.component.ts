import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Randomizer} from "../services/randomizer";

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
    this.resources = Randomizer.randomize(data.item.resources);
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

  resourceType(): string {
    const imageRegex = new RegExp('((gif)|(jpeg)|(jpg)|(png)|(webp))$');
    const audioRegex = new RegExp('((mp3)|(wav))$');
    const res = this.resources[this.displayIndex];
    return imageRegex.test(res) ? 'image' : audioRegex.test(res) ? 'audio' : 'video';
  }

  resource(): string {
    let prefix;
    if (this.resourceType() === 'image') {
      prefix = '/assets/images/'
    } else if (this.resourceType() === 'audio') {
      prefix = '/assets/audio/'
    } else if (this.resourceType() === 'video') {
      prefix = '/assets/video/'
    }
    return prefix + this.resources[this.displayIndex];
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
