import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { PhonicsComponent } from './phonics/phonics.component';
import {HttpClientModule} from "@angular/common/http";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatBadgeModule} from "@angular/material/badge";
import {MatGridListModule} from "@angular/material/grid-list";
import {WordPicComponent} from './phonics/word.pic.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatRippleModule} from "@angular/material/core";
import {MatMenuModule} from "@angular/material/menu";
import { ReadWordComponent } from './phonics/read-word.component';
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import { SettingsComponent } from './settings/settings.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectContextItemsComponent} from "./shared/select-context-items/select-context-items.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { FamilyTreeComponent } from './evs/family-tree/family-tree.component';
import { SeasonsComponent } from './evs/seasons/seasons.component';
import { AnimalCategoriesComponent } from './evs/animal-categories/animal-categories.component';
import {MatRadioModule} from "@angular/material/radio";
import { WhiteBoardComponent } from './white-board/white-board.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    PhonicsComponent,
    WordPicComponent,
    ReadWordComponent,
    SettingsComponent,
    SelectContextItemsComponent,
    FamilyTreeComponent,
    SeasonsComponent,
    AnimalCategoriesComponent,
    WhiteBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatGridListModule,
    MatDialogModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    FlexLayoutModule,
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
