import {Component, HostListener, OnInit} from '@angular/core';
import {WordsService} from "../services/words.service";
import {Word} from "../model/word.model";
import {MatDialog} from "@angular/material/dialog";
import {WordPicComponent} from "./word.pic.component";

@Component({
  selector: 'app-phonics',
  templateUrl: './phonics.component.html',
  styleUrls: ['./phonics.component.scss']
})
export class PhonicsComponent implements OnInit {

  constructor(private wordsService: WordsService, public dialog: MatDialog) { }

  words: Word[] = [];
  filterTxt = '';
  columnCount: number = 3;
  wordWidth: number = 220;

  ngOnInit(): void {
    this.wordsService.getWords().subscribe((res) => this.words = res);
    this.columnCount = window.innerWidth / this.wordWidth;
  }

  @HostListener('window:resize')
  onResize() {
    this.columnCount = window.innerWidth / this.wordWidth;
  }

  getFiltered() {
    if (this.filterTxt === '') {
      return this.words;
    } else {
      return this.words.filter(w => w.word.indexOf(this.filterTxt) >= 0);
    }
  }

  showPic(word: Word) {
    this.dialog.open(WordPicComponent, {
      data: {
        item: word
      }
    });
  }

}
