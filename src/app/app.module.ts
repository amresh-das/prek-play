import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { PhonicsComponent } from './language/phonics.component';
import {HttpClientModule} from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import {WordPicComponent} from './language/word.pic.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { ReadWordComponent } from './language/read-word.component';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { SettingsComponent } from './settings/settings.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectContextItemsComponent} from './shared/select-context-items/select-context-items.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FamilyTreeComponent } from './evs/family-tree/family-tree.component';
import { SeasonsComponent } from './evs/seasons/seasons.component';
import { AnimalCategoriesComponent } from './evs/animal-categories/animal-categories.component';
import {MatRadioModule} from '@angular/material/radio';
import { WhiteBoardComponent } from './white-board/white-board.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import { VowelsComponent } from './language/vowels.component';
import { CanvasComponent } from './shared/canvas/canvas.component';
import { AddComponent } from './maths/add/add.component';
import { SubtractComponent } from './maths/subtract/subtract.component';
import {ClockComponent} from './evs/clock/clock.component';
import { VerbsComponent } from './language/verbs.component';
import { WordsComponent } from './language/words.component';

@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    PhonicsComponent,
    WordPicComponent,
    ReadWordComponent,
    SettingsComponent,
    SelectContextItemsComponent,
    FamilyTreeComponent,
    SeasonsComponent,
    AnimalCategoriesComponent,
    WhiteBoardComponent,
    VowelsComponent,
    CanvasComponent,
    AddComponent,
    SubtractComponent,
    ClockComponent,
    VerbsComponent
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
    MatSliderModule,
    FlexLayoutModule,
    DragDropModule,
    MatExpansionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
