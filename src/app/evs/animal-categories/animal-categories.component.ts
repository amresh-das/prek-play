import {Component} from '@angular/core';
import {Randomizer} from "../../services/randomizer";
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-animal-categories',
  templateUrl: './animal-categories.component.html',
  styleUrls: ['./animal-categories.component.scss']
})
export class AnimalCategoriesComponent {
  private static readonly SHOW_NAMES = 'animal.categories.show.names';
  private static readonly SHOW_IMAGES = 'animal.categories.show.images';

  static domesticAnimals: string[] = ['cow', 'hen', 'sheep', 'cat', 'dog', 'horse', 'pig', 'goat'];
  static wildAnimals: string[] = ['lion', 'tiger', 'bear', 'elephant', 'deer', 'zebra', 'wolf', 'monkey'];
  animals: string[] = [];
  resultDomestic: string[] = [];
  resultWild: string[] = [];
  choice: string | undefined;
  showNames: Boolean;
  showImage: Boolean;

  constructor(private settingsService: SettingsService) {
    this.init();
    this.showNames = settingsService.getConfig(AnimalCategoriesComponent.SHOW_NAMES, 'N') === 'Y';
    this.showImage = settingsService.getConfig(AnimalCategoriesComponent.SHOW_IMAGES, 'Y') === 'Y';
  }

  init() {
    AnimalCategoriesComponent.domesticAnimals.forEach(a => this.animals.push(a));
    AnimalCategoriesComponent.wildAnimals.forEach(a => this.animals.push(a));
    this.resultDomestic = [];
    this.resultWild = [];
    Randomizer.randomize(this.animals);
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

  isDomesticAllowed(item: CdkDrag) {
    return AnimalCategoriesComponent.domesticAnimals.indexOf(item.element.nativeElement.id) !== -1;
  }

  isWildAllowed(item: CdkDrag) {
    return AnimalCategoriesComponent.wildAnimals.indexOf(item.element.nativeElement.id) !== -1;
  }

  setPref(checked: boolean, type: string) {
    this.settingsService.setConfig(type === 'name' ? AnimalCategoriesComponent.SHOW_NAMES : AnimalCategoriesComponent.SHOW_IMAGES, checked ? 'Y' : 'N');
  }
}
