import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Randomizer} from "../../services/randomizer";
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-animal-categories',
  templateUrl: './animal-categories.component.html',
  styleUrls: ['./animal-categories.component.scss']
})
export class AnimalCategoriesComponent implements OnInit {

  static domesticAnimals: string[] = ['cow', 'hen', 'sheep', 'cat', 'dog', 'horse', 'pig'];
  static wildAnimals: string[] = ['lion', 'tiger', 'bear', 'elephant', 'dear', 'zebra', 'wolf'];
  animals: string[] = [];
  resultDomestic: string[] = [];
  resultWild: string[] = [];
  choice: string | undefined;
  @ViewChild('choiceHolder') choiceHolder: ElementRef<HTMLSpanElement>;
  @ViewChild('choiceImg') choiceImg: ElementRef<HTMLImageElement>;

  constructor() {
    AnimalCategoriesComponent.domesticAnimals.forEach(a => this.animals.push(a));
    AnimalCategoriesComponent.wildAnimals.forEach(a => this.animals.push(a));
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

  isDomesticAllowed(item: CdkDrag<any>) {
    return AnimalCategoriesComponent.domesticAnimals.indexOf(item.element.nativeElement.id) !== -1;
  }

  isWildAllowed(item: CdkDrag<any>) {
    return AnimalCategoriesComponent.wildAnimals.indexOf(item.element.nativeElement.id) !== -1;
  }

}
