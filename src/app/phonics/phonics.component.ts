import {Component, HostListener, OnInit} from '@angular/core';
import {WordsService} from "../services/words.service";
import {Word} from "../model/word.model";
import {MatDialog} from "@angular/material/dialog";
import {WordPicComponent} from "./word.pic.component";
import {ReadWordComponent} from "./read-word.component";
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {Shuffler} from "../services/shuffle";
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'app-phonics',
  templateUrl: './phonics.component.html',
  styleUrls: ['./phonics.component.scss']
})
export class PhonicsComponent implements OnInit {
  words: Word[] = [];
  filters: string[] = [];
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  constructor(private wordsService: WordsService, public dialog: MatDialog, private settingsService: SettingsService) {
  }

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
    if (this.filters.length == 0) {
      return this.words;
    } else {
      return this.words.filter(w => this.filters.find(f => w.word.indexOf(f.toLowerCase()) >= 0));
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
    const items = this.getFiltered().splice(0, this.settingsService.getConfigInt(SettingsService.PHONICS_SHOW_WORDS_BATCH_COUNT, 20));
    this.dialog.open(ReadWordComponent, {
      width: '100%',
      height: '50%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        items: items,
      }
    });
  }

  shuffleAll() {
    Shuffler.shuffle(this.words);
  }

  remove(filter: string) {
    this.filters.splice(this.filters.indexOf(filter), 1);
  }

  addFilter(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if (value.length > 0) {
      this.filters.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

}

