import {Component, HostListener, OnInit} from '@angular/core';
import {WordsService} from '../services/words.service';
import {Word} from '../model/word.model';

@Component({
  selector: 'app-phonics',
  templateUrl: './phonics.component.html',
  styleUrls: ['./phonics.component.scss']
})
export class PhonicsComponent implements OnInit {
  words: Word[] = [];
  blends = ['oo', 'ee', 'ck', 'ch', 'sh', 'th', 'bl', 'cl', 'fl', 'sl', 'gl', 'pl', 'dr', 'gr', 'cr', 'fr', 'br', 'tr', 'pr',
    'sc', 'sk', 'sl', 'tch', 'sp', 'sm', 'squ', 'st', 'sw', 'tw', 'str', 'spr', 'ay', 'ey', 'ow', 'ew', 'au', 'aw', 'al', 'ph', 'wh',
    'igh', 'ing', 'ou', 'ce', 'se', 'ge', 'ar', 'er', 'ir', 'ur', 'or', 'dge', 'cy', 'ci', 'gi', 'gy'];

  constructor(private wordsService: WordsService) {
  }

  ngOnInit(): void {
    this.wordsService.getWords().subscribe((res) => this.words = res.reverse());
  }

}

