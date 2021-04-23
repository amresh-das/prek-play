import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Randomizer} from "../../services/randomizer";

@Component({
  selector: 'app-animal-categories',
  templateUrl: './animal-categories.component.html',
  styleUrls: ['./animal-categories.component.scss']
})
export class AnimalCategoriesComponent implements OnInit {

  domesticAnimals: string[] = ['lion', 'tiger', 'bear', 'elephant', 'dear', 'zebra', 'wolf'];
  wildAnimals: string[] = ['cow', 'hen', 'sheep', 'cat', 'dog', 'horse', 'pig'];
  animals: string[] = [];
  choice: string | undefined;
  @ViewChild('choiceHolder') choiceHolder: ElementRef<HTMLSpanElement>;
  @ViewChild('choiceImg') choiceImg: ElementRef<HTMLImageElement>;

  constructor() {
    this.domesticAnimals.forEach(a => this.animals.push(a));
    this.wildAnimals.forEach(a => this.animals.push(a));
    Randomizer.randomize(this.animals);
    this.next();
  }

  ngOnInit(): void {
  }

  next() {
    if (this.animals.length === 0) {
      this.choice = undefined;
    } else {
      this.choice = this.animals.splice(1, 1)[0];
    }
  }

}
