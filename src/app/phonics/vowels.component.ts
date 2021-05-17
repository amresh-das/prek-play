import { Component, OnInit } from '@angular/core';
import {Randomizer} from "../services/randomizer";
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'app-vowels',
  templateUrl: './vowels.component.html',
  styleUrls: ['./vowels.component.scss']
})
export class VowelsComponent {

  columns;
  rows = 4;
  choices: string[];
  choiceColor: any;
  vowelSelection: string[];
  consonantSelection: string[];

  private static readonly VOWELS = 'aeiou';
  private static readonly VOWELS_COL_COUNT = 'vowels.column.count';

  constructor(private settingsService: SettingsService) {
    this.columns = Number.parseInt(settingsService.getConfigOrDefault(VowelsComponent.VOWELS_COL_COUNT, '4'));
    this.prep();
  }

  prep() {
    this.choices = VowelsComponent.VOWELS.split('');
    this.vowelSelection = [];
    this.consonantSelection = [];
    for (let i = 5; i < this.columns * this.rows; i++) {
      const option = Randomizer.randomString(1);
      this.choices.push(option);
      let color = Randomizer.randomColor();
      this.choiceColor = (color === '#FFFFFF' ? '#000000' : color);
    }
    Randomizer.randomize(this.choices);
    this.settingsService.setConfig(VowelsComponent.VOWELS_COL_COUNT, this.columns + '');
  }

  isVowel(item: CdkDrag) {
    const letter = item.element.nativeElement.id.substring(7);
    return 'aeiou'.indexOf(letter) > -1;
  }

  isConsonant(item: CdkDrag) {
    const letter = item.element.nativeElement.id.substring(7);
    return 'aeiou'.indexOf(letter) == -1;
  }

  getVowelCount() {
    return this.choices.filter(c => VowelsComponent.VOWELS.indexOf(c) > -1).length;
  }

  getFoundCount(letter: string) {
    return this.vowelSelection.filter(v => v === letter).length;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
