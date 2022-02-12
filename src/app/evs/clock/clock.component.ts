import {Component, HostListener, OnInit} from '@angular/core';
import {Point} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  hh: number = 12;
  mm: number = 0;
  svgSize: number;
  tickMargin: number = 10;
  clockRadius: number;
  clockCenter: Point;
  hourRadiusModifier = 0.80;
  minuteRadiusModifier = 0.92;

  constructor() {
  }

  ngOnInit(): void {
    this.svgSize = ClockComponent.getSvgSize();
    this.clockRadius = ClockComponent.getClockRadius();
    this.clockCenter = {x: this.svgSize / 2, y: this.svgSize / 2};
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.svgSize = ClockComponent.getSvgSize();
    this.clockRadius = ClockComponent.getClockRadius();
    this.clockCenter = {x: this.svgSize / 2, y: this.svgSize / 2};
  }

  static getSvgSize() {
    return Math.min(window.innerWidth, window.innerHeight) * .85;
  }

  static getClockRadius() {
    return ClockComponent.getSvgSize() * .45;
  }

  getTicks(n: number, incrementBy?: number): number[] {
    const arr = [];
    if (!incrementBy) incrementBy = 1;
    for (let i = 0; i < n; i++) {
      arr.push(i * incrementBy);
    }
    return arr;
  }

  getTickWidth(i: number): number {
    return (i % 5 == 0 ? 6 : 3) * 0.002 * this.clockRadius;
  }

  getTickHeight(i: number): number {
    return (i % 5 == 0 ? 40 : 15) * 0.002 * this.clockRadius;
  }

  getTickTransform(i: number): string {
    return "rotate(" + i * 6 + "),translate(-3,-" + (this.clockRadius - this.tickMargin) + ")";
  }

  getX(i: number, total: number): number {
    const deg = 270 + ClockComponent.getDeg(i, total);
    const radius = this.clockRadius * (ClockComponent.isHourMarker(i) ? this.hourRadiusModifier : this.minuteRadiusModifier);
    const deviation = 0;
    return deviation + this.clockCenter.x + radius * Math.cos(deg * (Math.PI / 180));
  }

  getY(i: number, total: number): number {
    const deg = 270 + ClockComponent.getDeg(i, total);
    const radius = this.clockRadius * (ClockComponent.isHourMarker(i) ? this.hourRadiusModifier : this.minuteRadiusModifier);
    const deviation = 0;
    return deviation + this.clockCenter.y + radius * Math.sin(deg * (Math.PI / 180));
  }

  private static getDeg(n: number, total: number): number {
    return n * 360 / total;
  }

  getTickHourValue(tick: number): number {
    return tick < 5 ? 12 : Math.floor(tick / 5);
  }

  getTextSize(tick: number): string {
    return (ClockComponent.isHourMarker(tick) ? 0.09 : 0.035) * this.clockRadius + 'px';
  }

  getTextTransform(i: number): string {
    const modifierFor12Major = 2.16;
    const modifierFor10And11Major = 1.9;
    const modifierFor10To12Minor = 0.8;
    const modifierForAllMinor = 0.25;
    const xDev = this.clockRadius * 0.029 * (!ClockComponent.isHourMarker(i) ? i >= 50 || i < 5 ? modifierFor10To12Minor : modifierForAllMinor : i >= 50 ? modifierFor10And11Major : i < 5 ? modifierFor12Major : 1);
    const yDev = this.clockRadius * 0.024 * (!ClockComponent.isHourMarker(i) ? modifierForAllMinor : 1);
    return "translate(-" + xDev + "," + yDev + ")";
  }

  private static isHourMarker(tick: number): boolean {
    return tick % 5 == 0;
  }

  getHourHandPoints(): string {
    const points = [];
    const radius = this.clockRadius;
    points.push({x: this.clockCenter.x, y: this.clockCenter.y - radius * .7});
    points.push({x: this.clockCenter.x + 30, y: this.clockCenter.y - radius * .6});
    points.push({x: this.clockCenter.x + 2, y: this.clockCenter.y - 2});
    points.push({x: this.clockCenter.x, y: this.clockCenter.y});
    points.push({x: this.clockCenter.x - 2, y: this.clockCenter.y - 2});
    points.push({x: this.clockCenter.x - 30, y: this.clockCenter.y - radius * .6});
    return points.map(p => p.x + "," + p.y).join(" ");
  }

  getMinuteHandPoints(): string {
    const points = [];
    const radius = this.clockRadius;
    points.push({x: this.clockCenter.x, y: this.clockCenter.y - radius * .99});
    points.push({x: this.clockCenter.x + 25, y: this.clockCenter.y - radius * .91});
    points.push({x: this.clockCenter.x + 2, y: this.clockCenter.y - 2});
    points.push({x: this.clockCenter.x, y: this.clockCenter.y});
    points.push({x: this.clockCenter.x - 2, y: this.clockCenter.y - 2});
    points.push({x: this.clockCenter.x - 25, y: this.clockCenter.y - radius * .91});
    return points.map(p => p.x + "," + p.y).join(" ");
  }

  getMinuteTransform(): string {
    return "rotate(" + ClockComponent.getDeg(this.mm % 60, 60) + ")";
  }

  getHourTransform() {
    const hourDegree = ClockComponent.getDeg(this.hh % 12, 12);
    const minuteDegree = ClockComponent.getDeg(this.mm % 60, 720);
    return "rotate(" + (hourDegree + minuteDegree) + ")";
  }

  normalizeTime() {
    const hrs = Math.floor(this.mm / 60);
    this.mm = this.mm == 0 ? 0 : this.mm > 0 ? this.mm % 60 : 60 + this.mm;
    this.hh = (this.hh + hrs) % 12;
    if (this.hh === 0) {
      this.hh = 12;
    }
  }
}
