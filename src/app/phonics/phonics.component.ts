import {Component, HostListener, OnInit} from '@angular/core';
import {WordsService} from "../services/words.service";
import {Word} from "../model/word.model";
import {MatDialog} from "@angular/material/dialog";
import {WordPicComponent} from "./word.pic.component";
import {ReadWordComponent} from "./read-word.component";

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

  getFiltered(): Word[] {
    if (this.filterTxt === '') {
      return this.words;
    } else {
      return this.words.filter(w => w.word.indexOf(this.filterTxt.toLowerCase()) >= 0);
    }
  }

  showPic(word: Word) {
    let dialogWidth = window.innerWidth < window.innerHeight ? '80%' : '40%';
    this.dialog.open(WordPicComponent, {
      width: dialogWidth,
      data: {
        item: word,
      }
    });
  }

  showWordsToRead() {
    const items = this.getFiltered();
    this.dialog.open(ReadWordComponent, {
      width: '100%',
      height: '80%',
      disableClose: true,
      data: {
        items: items,
      }
    });
  }

  shuffleAll() {
    this.shuffle(this.words);
  }

  private shuffle(array: any[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}

