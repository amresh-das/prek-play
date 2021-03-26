import {Component, OnInit} from '@angular/core';
import {ALL_SYLLABLES, Syllable} from "../model/syllable";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  syllableConfig: Syllable[];
  isSelectAll: boolean = false;

  constructor(private snackBar: MatSnackBar, private location: Location) {
    const syllableConfigValues = localStorage.getItem('syllableConfig');
    const syllableConfigs: string[] = syllableConfigValues ? JSON.parse(syllableConfigValues) : [];
    this.syllableConfig = [];
    ALL_SYLLABLES.forEach(s => this.syllableConfig.push({token: s, selected: syllableConfigs.indexOf(s) >= 0}));
  }

  ngOnInit(): void {

  }

  selectAll() {
    this.syllableConfig.forEach(s => s.selected = true);
  }

  reset() {
    this.syllableConfig = [];
    ALL_SYLLABLES.forEach(s => this.syllableConfig.push({token: s, selected: false}));
    this.isSelectAll = false;
  }

  save() {
    localStorage.setItem('syllableConfig', JSON.stringify(this.syllableConfig.filter(s => s.selected).map(s => s.token)));
    this.snackBar.open('Your configuration has been saved', '', {
      duration: 1000
    });
  }

  navigateBack() {
    this.location.back();
  }

}
