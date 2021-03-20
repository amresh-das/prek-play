import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Word} from "../model/word.model";

@Component({
  selector: 'app-word.pic',
  templateUrl: './word.pic.component.html',
  styleUrls: ['./word.pic.component.scss']
})

export class WordPicComponent {
  word: string;
  resource: string | null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.word = data.item.word;
    this.resource = this.getImage(data.item);
  }

  private getImage(word: Word): string | null {
    return word.resources ? word.resources[Math.floor(Math.random() * 10) % word.resources.length] : null;
  }
}
