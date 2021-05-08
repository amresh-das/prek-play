import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {SettingsService} from "../services/settings.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  static defaultPhonicsShowWordsBatchCount: number = 20;
  phonicsShowWordsBatchCount: number;

  constructor(private location: Location, private snackBar: MatSnackBar) {
    const config = localStorage.getItem(SettingsService.PHONICS_SHOW_WORDS_BATCH_COUNT);
    this.phonicsShowWordsBatchCount = config ? Number.parseInt(config) : SettingsComponent.defaultPhonicsShowWordsBatchCount;
  }

  ngOnInit(): void {
  }

  navigateBack() {
    this.location.back();
  }

  save() {
    localStorage.setItem(SettingsService.PHONICS_SHOW_WORDS_BATCH_COUNT, this.phonicsShowWordsBatchCount + '');
    this.snackBar.open('Your settings have been saved.', '', {duration: 3000});
  }

  reset() {
    this.phonicsShowWordsBatchCount = SettingsComponent.defaultPhonicsShowWordsBatchCount;
    localStorage.setItem(SettingsService.PHONICS_SHOW_WORDS_BATCH_COUNT, this.phonicsShowWordsBatchCount + '');
    this.snackBar.open('Your settings have been reset to default.', '', {duration: 3000});
  }

}

