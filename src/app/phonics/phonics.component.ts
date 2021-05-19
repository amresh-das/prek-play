import {Component, HostListener, OnInit} from '@angular/core';
import {WordsService} from "../services/words.service";
import {Word} from "../model/word.model";
import {MatDialog} from "@angular/material/dialog";
import {WordPicComponent} from "./word.pic.component";
import {ReadWordComponent} from "./read-word.component";
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {Randomizer} from "../services/randomizer";
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
  selected: Word[] = [];
  isFilterChanged: boolean = false;
  vowels = 'aeiou';
  vowelColor: any = '#000000';
  consonantColor: any = '#666666';
  hiddenWords = ['bar', 'be', 'trial'];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  private static readonly PHONICS_FILTER_VALUES = "phonics.filter.values"
  private static readonly PHONICS_COLOR_SCHEME_CONSONANT = "phonics.color.scheme.consonants";
  private static readonly PHONICS_COLOR_SCHEME_VOWELS = "phonics.color.scheme.vowels";

  constructor(private wordsService: WordsService, public dialog: MatDialog, private settingsService: SettingsService) {
    this.filters = JSON.parse(settingsService.getConfigOrDefault(PhonicsComponent.PHONICS_FILTER_VALUES, '[]'));
    this.consonantColor = settingsService.getConfigOrDefault(PhonicsComponent.PHONICS_COLOR_SCHEME_CONSONANT, '#666666');
    this.vowelColor = settingsService.getConfigOrDefault(PhonicsComponent.PHONICS_COLOR_SCHEME_VOWELS, '#000000');
  }

  columnCount: number = 3;
  wordWidth: number = 220;

  ngOnInit(): void {
    this.wordsService.getWords().subscribe((res) => this.words = res.sort((a, b) => a.word.localeCompare(b.word)));
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
      return this.words
        .filter(w => this.hiddenWords.indexOf(w.word) > -1)
        .filter(w => this.filters.find(f => {
          const regex = new RegExp(f, 'ig');
          return w.word.match(regex);
      }));
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
    const items = this.selected.length > 0 ? this.selected :
      this.getFiltered().slice(0, this.settingsService.getConfigInt(SettingsService.PHONICS_SHOW_WORDS_BATCH_COUNT, 40));
    this.dialog.open(ReadWordComponent, {
      maxWidth: '100%',
      width: '100%',
      height: '98%',
      maxHeight: '98%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        items: items,
        vowelColor: this.vowelColor,
        consonantColor: this.consonantColor,
        vowels: this.vowels
      }
    });
  }

  shuffleAll() {
    Randomizer.randomize(this.words);
  }

  remove(filter: string) {
    this.filters.splice(this.filters.indexOf(filter), 1);
    this.filterChanged();
  }

  addFilter(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value.trim();
    if (value.length > 0) {
      const plainTxtSegments = value.split('*');
      const filterRegexPattern = plainTxtSegments.map(s => (s.endsWith('.') ? s : s + '.')).join('*');
      this.filters.push(filterRegexPattern.slice(0, filterRegexPattern.length - 1));
    }
    if (input) {
      input.value = '';
    }
    this.filterChanged();
  }

  deSelectAll() {
    this.selected.forEach(w => w.selected = false);
    this.selected.splice(0, this.selected.length);
  }

  select(checked: boolean, word: Word) {
    if (checked) {
      this.selected.push(word);
    } else {
      this.selected.splice(this.selected.indexOf(word), 1);
    }
  }

  saveSearch() {
    this.settingsService.setConfig(PhonicsComponent.PHONICS_FILTER_VALUES, JSON.stringify(this.filters));
    this.isFilterChanged = false;
  }

  filterChanged() {
    this.isFilterChanged = true;
  }

  saveColorScheme() {
    this.settingsService.setConfig(PhonicsComponent.PHONICS_COLOR_SCHEME_VOWELS, this.vowelColor);
    this.settingsService.setConfig(PhonicsComponent.PHONICS_COLOR_SCHEME_CONSONANT, this.consonantColor);
  }
}

