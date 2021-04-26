import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.scss']
})
export class WhiteBoardComponent implements OnInit {
  color: any = "black";

  constructor() { }

  ngOnInit(): void {
  }

  setColor(color: string) {
    this.color = color;
  }
}
