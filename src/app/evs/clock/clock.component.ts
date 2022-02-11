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
  is24HourClock = false;
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

  getTicks(n: number): number[] {
    return Array.from(Array(n).keys());
  }

  getTickWidth(i: number): number {
    return (i % 5 == 0 ? 6 : 3) * 0.002 * this.clockRadius;
  }

  getTickHeight(i: number): number {
    return (i % 5 == 0 ? 35 : 15) * 0.002 * this.clockRadius;
  }

  getTickTransform(i: number): string {
    return "rotate(" + i * 6 + "),translate(-3,-" + (this.clockRadius - this.tickMargin) + ")";
  }

  getX(i: number, total: number): number {
    const deg = ClockComponent.getDeg(i, total);
    const radius = this.clockRadius * (ClockComponent.isHourMarker(i) ? this.hourRadiusModifier : this.minuteRadiusModifier);
    const deviation = 0;
    return deviation + this.clockCenter.x + radius * Math.cos(deg * (Math.PI / 180));
  }

  getY(i: number, total: number): number {
    const deg = ClockComponent.getDeg(i, total);
    const radius = this.clockRadius * (ClockComponent.isHourMarker(i) ? this.hourRadiusModifier : this.minuteRadiusModifier);
    const deviation = 0;
    return deviation + this.clockCenter.y + radius * Math.sin(deg * (Math.PI / 180));
  }

  private static getDeg(n: number, total: number): number {
    return 270 + (n * 360 / total);
  }

  getTickHourValue(tick: number): number {
    return tick < 5 ? 12 : Math.floor(tick / 5);
  }

  getTextSize(tick: number): string {
    return (ClockComponent.isHourMarker(tick) ? 0.09 : 0.035) * this.clockRadius + 'px';
  }

  getTextTransform(i: number): string {
    const xDev = this.clockRadius * 0.029 * (!ClockComponent.isHourMarker(i) ? i >= 50 || i < 5 ? 0.8 : 0.25 : i >= 50 ? 1.9 : i < 5 ? 2.0 : 1);
    const yDev = this.clockRadius * 0.024 * (!ClockComponent.isHourMarker(i) ? 0.25 : 1);
    return "translate(-" + xDev + "," + yDev + ")";
  }

  private static isHourMarker(tick: number): boolean {
    return tick % 5 == 0;
  }
}
