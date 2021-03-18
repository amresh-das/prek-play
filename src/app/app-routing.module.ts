import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhonicsComponent} from "./phonics/phonics.component";
import {MathsComponent} from "./maths/maths.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'phonics', component: PhonicsComponent },
  { path: 'maths', component: MathsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
