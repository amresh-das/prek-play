import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhonicsComponent} from './language/phonics.component';
import {SettingsComponent} from './settings/settings.component';
import {SeasonsComponent} from './evs/seasons/seasons.component';
import {FamilyTreeComponent} from './evs/family-tree/family-tree.component';
import {AnimalCategoriesComponent} from './evs/animal-categories/animal-categories.component';
import {WhiteBoardComponent} from './white-board/white-board.component';
import {VowelsComponent} from './language/vowels.component';
import {AddComponent} from './maths/add/add.component';
import {SubtractComponent} from './maths/subtract/subtract.component';
import {ClockComponent} from './evs/clock/clock.component';
import {VerbsComponent} from './language/verbs.component';
import {AboutComponent} from './about/about.component';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'whiteboard', component: WhiteBoardComponent, canActivate : [AuthGuard] },
  { path: 'phonics', component: PhonicsComponent, canActivate : [AuthGuard] },
  { path: 'verbs', component: VerbsComponent, canActivate : [AuthGuard] },
  { path: 'vowels', component: VowelsComponent, canActivate : [AuthGuard] },
  { path: 'seasons', component: SeasonsComponent, canActivate : [AuthGuard] },
  { path: 'family', component: FamilyTreeComponent, canActivate : [AuthGuard] },
  { path: 'clock', component: ClockComponent, canActivate : [AuthGuard] },
  { path: 'animal-categories', component: AnimalCategoriesComponent, canActivate : [AuthGuard] },
  { path: 'maths/addition', component: AddComponent, canActivate : [AuthGuard] },
  { path: 'maths/subtraction', component: SubtractComponent, canActivate : [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate : [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
