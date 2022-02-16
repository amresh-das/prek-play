import {Component, HostListener, OnInit} from '@angular/core';
import {Point} from "@angular/cdk/drag-drop";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  private static readonly SVG_SIZE_PERCENT = .92;
  private static readonly CLOCK_RADIUS_PERCENT = .33;
  private static readonly CLOCK_OPTIONS_KEY = 'clock.options';

  hh: number = 12;
  mm: number = 0;
  svgSize: number;
  tickMargin: number = 10;
  clockRadius: number;
  clockCenter: Point;
  clockOptions = {
    show1HourMarkers: true,
    show5HourMarkers: true,
    show15MinuteMarkers: true,
    show5MinuteMarkers: true,
    show1MinuteMarkers: true,
    showHourHand: true,
    showMinuteHand: true,
    showOClock: true,
    showQuarterPast: true,
    showHalfPast: true,
    showQuarterTo: true,
    showTimeText: true
  }

  private readonly hourRadiusModifier = 0.80;
  private readonly majorMarkerTextSizeToRadius = 0.09;
  private readonly minorMarkerTextSizeToRadius = 0.035;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.svgSize = ClockComponent.getSvgSize();
    this.clockRadius = ClockComponent.getClockRadius();
    this.clockCenter = {x: this.svgSize / 2, y: this.svgSize / 2};
    this.clockOptions = this.settingsService.getConfigObj(ClockComponent.CLOCK_OPTIONS_KEY, this.clockOptions);
    this.refreshTime();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.svgSize = ClockComponent.getSvgSize();
    this.clockRadius = ClockComponent.getClockRadius();
    this.clockCenter = {x: this.svgSize / 2, y: this.svgSize / 2};
  }

  static getSvgSize() {
    return Math.min(window.innerWidth, window.innerHeight) * this.SVG_SIZE_PERCENT;
  }

  static getClockRadius() {
    return ClockComponent.getSvgSize() * this.CLOCK_RADIUS_PERCENT;
  }

  getHourTicks(): number[] {
    const hours = this.getTicks(60);
    const hourMarkersAt5 = hours.filter(h => this.clockOptions.show5HourMarkers && h % 5 === 0);
    const hourMarkersAt1 = this.clockOptions.show1HourMarkers ? hours : [];
    return hourMarkersAt5.concat(hourMarkersAt1).sort();
  }

  getMinuteTicks(): number[] {
    const minutes = this.getTicks(60);
    const minuteMarkersAt15 = minutes.filter(m => this.clockOptions.show15MinuteMarkers && m % 15 === 0);
    const minuteMarkersAt5 = minutes.filter(m => this.clockOptions.show5MinuteMarkers && m % 5 === 0);
    const minuteMarkersAt1 = this.clockOptions.show1MinuteMarkers ? minutes : [];
    return minuteMarkersAt15.concat(minuteMarkersAt5).concat(minuteMarkersAt1).sort();
  }

  getTicks(n: number): number[] {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(i);
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

  getX(i: number, total: number, offsetPercent?: number, minuteRadiusModifier?: number): number {
    const deg = 270 + ClockComponent.getDeg(i, total);
    const minuteOffset = minuteRadiusModifier ? minuteRadiusModifier : .12;
    const radiusModifier = ClockComponent.isHourMarker(i) ? this.hourRadiusModifier : (this.hourRadiusModifier + minuteOffset);
    const radius = this.clockRadius * ((offsetPercent ? offsetPercent : 0) + radiusModifier);
    return this.clockCenter.x + radius * Math.cos(deg * (Math.PI / 180));
  }

  getY(i: number, total: number, offsetPercent?: number, minuteRadiusModifier?: number): number {
    const deg = 270 + ClockComponent.getDeg(i, total);
    const minuteOffset = minuteRadiusModifier ? minuteRadiusModifier : .12;
    const radiusModifier = ClockComponent.isHourMarker(i) ? this.hourRadiusModifier : (this.hourRadiusModifier + minuteOffset);
    const radius = this.clockRadius * ((offsetPercent ? offsetPercent : 0) + radiusModifier);
    return this.clockCenter.y + radius * Math.sin(deg * (Math.PI / 180));
  }

  private static getDeg(n: number, total: number): number {
    return n * 360 / total;
  }

  getTickHourValue(tick: number): number {
    return tick < 5 ? 12 : Math.floor(tick / 5);
  }

  getTextSize(tick: number): string {
    return (ClockComponent.isHourMarker(tick) ? this.majorMarkerTextSizeToRadius : this.minorMarkerTextSizeToRadius) * this.clockRadius + 'px';
  }

  getHourMarkerTransform(i: number): string {
    const position: Position = this.getPosition(i);
    const value = this.getTickHourValue(i);
    const digits = value > 9 ? 2 : 1;
    const isMajor = i % 5 === 0;
    let xOffset: number = 1, yOffset: number = 1;
    if (value === 12 && position != Position.TOP) {
      xOffset = .5;
    }
    if (position === Position.RIGHT) {
      yOffset = 1.25;
    } else if (position === Position.FIRSTQUADRANT) {
      xOffset = .5;
      yOffset = .6;
    }  else if (position === Position.SECONDQUADRANT) {
      xOffset = .5;
      yOffset = isMajor ? 1.5 : .1;
    } else if (position === Position.THIRDQUADRENT) {
      xOffset = .1;
      yOffset = isMajor ? 1.5 : .1;
    } else if (position === Position.FOURTHQUADRENT) {
      xOffset = isMajor ? .6 : .2;
      yOffset = isMajor ? 2.15 : .5;
    }
    const x = this.clockRadius * 0.029 * digits * xOffset;
    const y = this.clockRadius * 0.024 * yOffset;
    return "translate(-" + x + "," + y + ")";
  }

  getMinuteMarkerTransform(i: number): string {
    const position: Position = this.getPosition(i);
    const digits = i > 9 ? 2 : 1;
    const isMajor = i % 5 === 0;
    let xOffset: number = 1, yOffset: number = 1;
    if (position == Position.TOP) {
      yOffset = 2;
    } else if (position == Position.BOTTOM) {
      yOffset = .2;
    } else if (position === Position.LEFT) {
      xOffset = .9;
      yOffset = .6;
    } else if (position === Position.RIGHT) {
      xOffset = 1.5;
      yOffset = .6;
    } else if (position === Position.FIRSTQUADRANT) {
      xOffset = (i > 9 ? -.2 : 0) + (isMajor ? 1.5 : .5);
      yOffset = (i > 9 ? -.2 : 0) + (isMajor ? 1 : .15);
    } else if (position === Position.SECONDQUADRANT) {
      xOffset = isMajor ? 1 : .5;
      yOffset = isMajor ? .5 : .15;
    }  else if (position === Position.THIRDQUADRENT) {
      xOffset = isMajor ? 1 : .7;
      yOffset = isMajor ? .5 : .15;
    } else if (position === Position.FOURTHQUADRENT) {
      xOffset = isMajor ? 1.5 : .7;
      yOffset = isMajor ? 1 : .15;
    }
    const x = this.clockRadius * 0.029 * digits * xOffset;
    const y = this.clockRadius * 0.024 * digits * yOffset;
    return "translate(-" + x + "," + y + ")";
  }

  private getPosition(i: number) {
    if (i % 15 == 0) {
      if (i == 0) return Position.TOP;
      if (i == 15) return Position.RIGHT;
      if (i == 30) return Position.BOTTOM;
      return Position.LEFT;
    } else {
      const quadrant = Math.floor(i / 15);
      if (quadrant == 0) return Position.FIRSTQUADRANT;
      if (quadrant == 1) return Position.SECONDQUADRANT;
      if (quadrant == 2) return Position.THIRDQUADRENT;
      return Position.FOURTHQUADRENT;
    }
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

  refreshTime() {
    const now = new Date();
    this.hh = now.getHours() % 12;
    this.mm = now.getMinutes();
  }

  saveClockOptions() {
    this.settingsService.setConfig(ClockComponent.CLOCK_OPTIONS_KEY, JSON.stringify(this.clockOptions));
  }
}


enum Position {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  FIRSTQUADRANT,
  SECONDQUADRANT,
  THIRDQUADRENT,
  FOURTHQUADRENT
}

