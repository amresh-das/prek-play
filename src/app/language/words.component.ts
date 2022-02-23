import {Component, HostListener, Input, OnInit} from '@angular/core';
import {WordsService} from '../services/words.service';
import {Word} from '../model/word.model';
import {MatDialog} from '@angular/material/dialog';
import {ReadWordComponent} from './read-word.component';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {Randomizer} from '../services/randomizer';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'word-grid',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {
  @Input() prefix: string;
  @Input() standardFilterName: string;
  @Input() standardFilterValues: string[];
  @Input() words: Word[] = [];
  filters: string[] = [];
  selectable = true;
  removable = true;
  selected: Word[] = [];
  isFilterChanged: boolean = false;
  vowels = 'aeiou';
  vowelColor: any = '#000000';
  consonantColor: any = '#000000';
  hiddenWords: string[];
  wordFontSize: string;
  wordShadow: string;
  controlVisibility = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  constructor(private wordsService: WordsService, public dialog: MatDialog, private settingsService: SettingsService) {
    this.filters = JSON.parse(settingsService.getConfigOrDefault(this.prefix + '.filter.values', '[]'));
    this.consonantColor = settingsService.getConfigOrDefault(this.prefix + '.color.scheme.consonants', '#000000');
    this.vowelColor = settingsService.getConfigOrDefault(this.prefix + '.color.scheme.vowels', '#000000');
    this.hiddenWords = JSON.parse(this.settingsService.getConfigOrDefault(this.prefix + '.hidden.words', '[]'));
    const fontSize = settingsService.getConfigOrDefault(this.prefix + '.words.font.size', '1.3');
    this.wordFontSize = fontSize + 'em';
    this.wordShadow = Number.parseFloat(fontSize) > 1.0 ? '2px 1px' : 'none';
  }

  columnCount: number = 3;
  wordWidth: number = 220;

  ngOnInit(): void {
    this.columnCount = window.innerWidth / this.wordWidth;
  }

  @HostListener('window:resize')
  onResize() {
    this.columnCount = window.innerWidth / this.wordWidth;
  }

  getFiltered(): Word[] {
    if (this.filters.length == 0) {
      return this.words.filter(w => this.hiddenWords.indexOf(w.word) === -1);
    } else {
      return this.words
        .filter(w => this.hiddenWords.indexOf(w.word) === -1)
        .filter(w => this.filters.find(f => {
          const regex = new RegExp(f, 'ig');
          return w.word.match(regex);
      }));
    }
  }

  showWordsToRead(index?: number) {
    const items = this.selected.length > 0 ? this.selected :
      this.getFiltered().slice(0, this.settingsService.getConfigInt(this.prefix + '.show.words.batch.count', 999));
    this.dialog.open(ReadWordComponent, {
      maxWidth: '100%',
      width: '100%',
      height: '98%',
      maxHeight: '98%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        items: items,
        index: index ? index : 0,
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
    if (input) {
      input.value = '';
    }
    this.addFilterValue(event.value.trim());
  }

  addFilterValue(value: string) {
    if (value.length > 0) {
      const plainTxtSegments = value.split('*');
      const filterRegexPattern = plainTxtSegments.map(s => (s.endsWith('.') ? s : s + '.')).join('*');
      let item = filterRegexPattern.slice(0, filterRegexPattern.length - 1);
      if (this.filters.indexOf(item) === -1) {
        this.filters.push(item);
      }
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
    this.settingsService.setConfig(this.prefix + '.filter.values', JSON.stringify(this.filters));
    this.isFilterChanged = false;
  }

  filterChanged() {
    this.isFilterChanged = true;
  }

  saveColorScheme() {
    this.settingsService.setConfig(this.prefix + '.color.scheme.vowels', this.vowelColor);
    this.settingsService.setConfig(this.prefix + '.color.scheme.consonants', this.consonantColor);
  }

  hideWord(word: string) {
    this.hiddenWords.push(word);
    this.settingsService.setConfig(this.prefix + '.hidden.words', JSON.stringify(this.hiddenWords));
  }

  showControls() {
    this.controlVisibility = !this.controlVisibility;
  }
}

