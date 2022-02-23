import { Component, OnInit } from '@angular/core';
import {Word} from "../model/word.model";
import {WordsService} from "../services/words.service";

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss']
})
export class VerbsComponent implements OnInit {
  verbs: Word[] = [];
  verbFilters: string[];

  constructor(private wordsService: WordsService) { }

  ngOnInit(): void {
    this.wordsService.getVerbs().subscribe(verbs => this.verbs = verbs);
  }

}
