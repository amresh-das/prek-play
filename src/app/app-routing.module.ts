import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhonicsComponent} from "./phonics/phonics.component";
import {MathsComponent} from "./maths/maths.component";
import {SettingsComponent} from "./settings/settings.component";
import {EvsComponent} from "./evs/evs.component";

const routes: Routes = [
  { path: '', redirectTo: '/phonics', pathMatch: 'full' },
  { path: 'phonics', component: PhonicsComponent },
  { path: 'maths', component: MathsComponent },
  { path: 'evs', component: EvsComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
