import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {Randomizer} from "../../services/randomizer";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, AfterViewInit {
  num1: number;
  num2: number;
  sum: string;
  maxSum: number;
  color: any;
  borderColor: any;
  @ViewChild('answer') answer: ElementRef<HTMLInputElement>;

  used: string[];

  static readonly ADDITION_MAX_SUM_VALUE = 'addition.max.sum.value';
  constructor(private settingsService: SettingsService) {
    this.maxSum = Number.parseInt(settingsService.getConfigOrDefault(AddComponent.ADDITION_MAX_SUM_VALUE, '12'));
    this.used = [];
  }

  ngOnInit(): void {
    this.nextProblem();
  }

  ngAfterViewInit(): void {
    this.answer.nativeElement.focus();
  }

  nextProblem() {
    this.color = Randomizer.randomColor(['#ffffff']);
    this.borderColor = Randomizer.randomColor(['#ffffff', this.color]);
    this.num1 = Randomizer.randomInt(this.maxSum, 1);
    this.num2 = Randomizer.randomInt(this.maxSum - this.num1, 1);
    this.sum = '';
    if (this.answer) {
      this.answer.nativeElement.focus();
    }
  }

}
