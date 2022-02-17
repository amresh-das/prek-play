import {Component, HostListener, OnInit} from '@angular/core';
import {Point} from '@angular/cdk/drag-drop';
import {SettingsService} from '../../services/settings.service';
import {Position} from './position';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  private static readonly SVG_SIZE_PERCENT = .93;
  private static readonly CLOCK_RADIUS_PERCENT = .33;
  private static readonly CLOCK_OPTIONS_KEY = 'clock.options';

  hh = 12;
  mm = 0;
  svgSize: number;
  tickMargin = 10;
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
  };
  clockHandMoveStart: null | MoveEvent = null;

  private readonly hourRadiusModifier = 0.80;
  private readonly majorMarkerTextSizeToRadius = 0.09;
  private readonly minorMarkerTextSizeToRadius = 0.035;

  private static getDeg(n: number, total: number): number {
    return n * 360 / total;
  }

  private static isHourMarker(tick: number): boolean {
    return tick % 5 === 0;
  }

  private static getPosition(i: number): Position {
    if (i % 15 === 0) {
      if (i === 0) {
        return Position.TOP;
      }
      if (i === 15) {
        return Position.RIGHT;
      }
      if (i === 30) {
        return Position.BOTTOM;
      }
      return Position.LEFT;
    } else {
      const quadrant = Math.floor(i / 15);
      if (quadrant === 0) {
        return Position.FIRST_QUADRANT;
      }
      if (quadrant === 1) {
        return Position.SECOND_QUADRANT;
      }
      if (quadrant === 2) {
        return Position.THIRD_QUADRENT;
      }
      return Position.FOURTH_QUADRENT;
    }
  }

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.clockOptions = this.settingsService.getConfigObj(ClockComponent.CLOCK_OPTIONS_KEY, this.clockOptions);
    this.refreshTime();
    this.computeClockDimensions();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.computeClockDimensions();
  }

  private computeClockDimensions(): void {
    this.svgSize = Math.min(window.innerWidth, window.innerHeight) * ClockComponent.SVG_SIZE_PERCENT;
    this.clockRadius = this.svgSize * ClockComponent.CLOCK_RADIUS_PERCENT;
    this.clockCenter = {x: this.svgSize / 2, y: this.svgSize / 2};
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
    return (i % 5 === 0 ? 6 : 3) * 0.002 * this.clockRadius;
  }

  getTickHeight(i: number): number {
    return (i % 5 === 0 ? 40 : 15) * 0.002 * this.clockRadius;
  }

  getTickTransform(i: number): string {
    return 'rotate(' + i * 6 + '),translate(-3,-' + (this.clockRadius - this.tickMargin) + ')';
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
    let xOffset = 1;
    let yOffset = 1;
    if (value === 12 && position !== Position.TOP) {
      xOffset = .5;
    }
    if (position === Position.RIGHT) {
      yOffset = 1.25;
    } else if (position === Position.FIRST_QUADRANT) {
      xOffset = .5;
      yOffset = .6;
    }  else if (position === Position.SECOND_QUADRANT) {
      xOffset = .5;
      yOffset = isMajor ? 1.5 : .1;
    } else if (position === Position.THIRD_QUADRENT) {
      xOffset = .1;
      yOffset = isMajor ? 1.5 : .1;
    } else if (position === Position.FOURTH_QUADRENT) {
      xOffset = isMajor ? .6 : .2;
      yOffset = isMajor ? 2.15 : .5;
    }
    const x = this.clockRadius * 0.029 * digits * xOffset;
    const y = this.clockRadius * 0.024 * yOffset;
    return 'translate(-' + x + ',' + y + ')';
  }

  getMinuteMarkerTransform(i: number): string {
    const position: Position = this.getPosition(i);
    const digits = i > 9 ? 2 : 1;
    const isMajor = i % 5 === 0;
    let xOffset = 1;
    let yOffset = 1;
    if (position === Position.TOP) {
      yOffset = 2;
    } else if (position === Position.BOTTOM) {
      yOffset = .2;
    } else if (position === Position.LEFT) {
      xOffset = .9;
      yOffset = .6;
    } else if (position === Position.RIGHT) {
      xOffset = 1.5;
      yOffset = .6;
    } else if (position === Position.FIRST_QUADRANT) {
      xOffset = (i > 9 ? -.2 : 0) + (isMajor ? 1.5 : .5);
      yOffset = (i > 9 ? -.2 : 0) + (isMajor ? 1 : .15);
    } else if (position === Position.SECOND_QUADRANT) {
      xOffset = isMajor ? 1 : .5;
      yOffset = isMajor ? .5 : .15;
    }  else if (position === Position.THIRD_QUADRENT) {
      xOffset = isMajor ? 1 : .7;
      yOffset = isMajor ? .5 : .15;
    } else if (position === Position.FOURTH_QUADRENT) {
      xOffset = isMajor ? 1.5 : .7;
      yOffset = isMajor ? 1 : .15;
    }
    const x = this.clockRadius * 0.029 * digits * xOffset;
    const y = this.clockRadius * 0.024 * digits * yOffset;
    return 'translate(-' + x + ',' + y + ')';
  }

  getHourHandPoints(): string {
    const points = [];
    const radius = this.clockRadius;
    const width = window.innerWidth * .0085;
    points.push({x: this.clockCenter.x, y: this.clockCenter.y - radius * .7});
    points.push({x: this.clockCenter.x + width, y: this.clockCenter.y - radius * .6});
    points.push({x: this.clockCenter.x + 2, y: this.clockCenter.y - 2});
    points.push({x: this.clockCenter.x, y: this.clockCenter.y});
    points.push({x: this.clockCenter.x - 2, y: this.clockCenter.y - 2});
    points.push({x: this.clockCenter.x - width, y: this.clockCenter.y - radius * .6});
    return points.map(p => p.x + ',' + p.y).join(' ');
  }

  getMinuteHandPoints(): string {
    const points = [];
    const radius = this.clockRadius;
    const width = window.innerWidth * .008;
    points.push({x: this.clockCenter.x, y: this.clockCenter.y - radius * .99});
    points.push({x: this.clockCenter.x + width, y: this.clockCenter.y - radius * .91});
    points.push({x: this.clockCenter.x + 2, y: this.clockCenter.y - 2});
    points.push({x: this.clockCenter.x, y: this.clockCenter.y});
    points.push({x: this.clockCenter.x - 2, y: this.clockCenter.y - 2});
    points.push({x: this.clockCenter.x - width, y: this.clockCenter.y - radius * .91});
    return points.map(p => p.x + ',' + p.y).join(' ');
  }

  getMinuteTransform(): string {
    return 'rotate(' + ClockComponent.getDeg(this.mm % 60, 60) + ')';
  }

  getHourTransform(): string {
    const hourDegree = ClockComponent.getDeg(this.hh % 12, 12);
    const minuteDegree = ClockComponent.getDeg(this.mm % 60, 720);
    return 'rotate(' + (hourDegree + minuteDegree) + ')';
  }

  normalizeTime(): void {
    const hrs = Math.floor(this.mm / 60);
    this.mm = this.mm === 0 ? 0 : this.mm > 0 ? this.mm % 60 : 60 + this.mm;
    this.hh = (this.hh + hrs) % 12;
    if (this.hh === 0) {
      this.hh = 12;
    }
  }

  refreshTime(): void {
    const now = new Date();
    this.hh = now.getHours() % 12;
    if (this.hh === 0) {
      this.hh = 12;
    }
    this.mm = now.getMinutes();
  }

  saveClockOptions(): void {
    this.settingsService.setConfig(ClockComponent.CLOCK_OPTIONS_KEY, JSON.stringify(this.clockOptions));
  }

  startHandMove(event: MouseEvent, isHourHand: boolean): void {
    this.clockHandMoveStart = {point: {x: event.offsetX, y: event.offsetY}, hourHand: isHourHand, prevMinute: this.mm};
  }

  startHandTouchMove(event: TouchEvent, isHourHand: boolean): void {
    console.log(isHourHand, event.touches.item(0));
  }

  endClockHandMove(): void {
    this.clockHandMoveStart = null;
  }

  handleClockHandMove(event: MouseEvent): void {
    if (this.clockHandMoveStart != null) {
      const degree = this.computeDegree(event);
      this.clockHandMoveStart.point = {x: event.offsetX, y: event.offsetY};
      if (this.clockHandMoveStart.hourHand) {
        this.hh = Math.floor(degree / 30);
      } else {
        this.mm = Math.floor(degree / 6);
        this.hh = this.hh + (this.isWindingDown(this.mm) ? - 1 : this.isWindingUp(this.mm) ? 1 : 0);
      }
      if (this.hh === 0) {
        this.hh = 12;
      }
      this.clockHandMoveStart.prevMinute = this.mm;
    }
  }

  private isWindingUp(currentMinute: number): boolean {
    return this.clockHandMoveStart ? (this.clockHandMoveStart.prevMinute === 59 && currentMinute === 0) : false;
  }

  private isWindingDown(currentMinute: number): boolean {
    return this.clockHandMoveStart ? (this.clockHandMoveStart.prevMinute === 0 && currentMinute === 59) : false;
  }

  private computeDegree(event: MouseEvent): number {
    const line1 = {a: this.clockCenter, b: {x: this.clockCenter.x, y: 0}};
    const line2 = {a: this.clockCenter, b: {x: event.offsetX, y: event.offsetY}};
    const dAx = line1.b.x - line1.a.x;
    const dAy = line1.b.y - line1.a.y;
    const dBx = line2.b.x - line2.a.x;
    const dBy = line2.b.y - line2.a.y;
    const angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
    const degree = angle * (180 / Math.PI);
    return degree < 0 ? degree + 360 : degree;
  }
}

interface MoveEvent {
  prevMinute: number;
  hourHand: boolean;
  point: Point;
}

