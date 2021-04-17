import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhonicsComponent} from "./phonics/phonics.component";
import {SettingsComponent} from "./settings/settings.component";
import {SeasonsComponent} from "./evs/seasons/seasons.component";
import {FamilyTreeComponent} from "./evs/family-tree/family-tree.component";

const routes: Routes = [
  { path: '', redirectTo: '/phonics', pathMatch: 'full' },
  { path: 'phonics', component: PhonicsComponent },
  { path: 'seasons', component: SeasonsComponent },
  { path: 'family', component: FamilyTreeComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
