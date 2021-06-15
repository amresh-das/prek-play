import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {Randomizer} from "../../services/randomizer";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  num1: number;
  num2: number;
  sum: number;
  maxSum: number;
  color: any;
  borderColor: any;

  used: string[];

  static readonly ADDITION_MAX_SUM_VALUE = 'addition.max.sum.value';
  constructor(private settingsService: SettingsService) {
    this.maxSum = Number.parseInt(settingsService.getConfigOrDefault(AddComponent.ADDITION_MAX_SUM_VALUE, '12'));
    this.used = [];
    this.nextProblem();
  }

  ngOnInit(): void {
  }

  nextProblem() {
    this.color = Randomizer.randomColor(['#ffffff']);
    this.borderColor = Randomizer.randomColor(['#ffffff', this.color]);
    this.num1 = Randomizer.randomInt(this.maxSum, 1);
    this.num2 = Randomizer.randomInt(this.maxSum - this.num1, 1);
    this.sum = this.num1 + this.num2;
  }

}
