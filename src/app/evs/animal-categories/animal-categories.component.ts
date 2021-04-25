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
  @ViewChild('domesticHolder') domesticHolder: ElementRef<HTMLSpanElement>;
  @ViewChild('wildHolder') wildHolder: ElementRef<HTMLSpanElement>;

  constructor() {
    AnimalCategoriesComponent.domesticAnimals.forEach(a => this.animals.push(a));
    AnimalCategoriesComponent.wildAnimals.forEach(a => this.animals.push(a));
    Randomizer.randomize(this.animals);
  }

  ngOnInit(): void {
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

    console.log(document.getElementById('domestic')?.getBoundingClientRect().width, document.getElementById('domestic')?.getBoundingClientRect().height,
      document.getElementById('wild')?.getBoundingClientRect().width, document.getElementById('wild')?.getBoundingClientRect().height);
  }

  isDomesticAllowed(item: CdkDrag) {
    return AnimalCategoriesComponent.domesticAnimals.indexOf(item.element.nativeElement.id) !== -1;
  }

  isWildAllowed(item: CdkDrag) {
    return AnimalCategoriesComponent.wildAnimals.indexOf(item.element.nativeElement.id) !== -1;
  }
}
