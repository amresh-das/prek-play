import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhonicsComponent} from "./phonics/phonics.component";
import {SettingsComponent} from "./settings/settings.component";
import {SeasonsComponent} from "./evs/seasons/seasons.component";
import {FamilyTreeComponent} from "./evs/family-tree/family-tree.component";
import {AnimalCategoriesComponent} from "./evs/animal-categories/animal-categories.component";
import {WhiteBoardComponent} from "./white-board/white-board.component";
import {VowelsComponent} from "./phonics/vowels.component";
import {AddComponent} from "./maths/add/add.component";
import {SubtractComponent} from "./maths/subtract/subtract.component";
import {ClockComponent} from "./evs/clock/clock.component";

const routes: Routes = [
  { path: '', redirectTo: '/phonics', pathMatch: 'full' },
  { path: 'whiteboard', component: WhiteBoardComponent },
  { path: 'phonics', component: PhonicsComponent },
  { path: 'vowels', component: VowelsComponent },
  { path: 'seasons', component: SeasonsComponent },
  { path: 'family', component: FamilyTreeComponent },
  { path: 'clock', component: ClockComponent },
  { path: 'animal-categories', component: AnimalCategoriesComponent },
  { path: 'maths/addition', component: AddComponent },
  { path: 'maths/subtraction', component: SubtractComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
