import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from "rxjs";
import {pairwise, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.scss']
})
export class WhiteBoardComponent implements AfterViewInit {
  color = "black";
  lineSize = 8;
  isDrawn = false;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  canvasRect: any;
  window: any;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.window = window;
  }

  ngAfterViewInit(): void {
    this.canvasRect = this.canvas.nativeElement.getBoundingClientRect();
    // @ts-ignore
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = this.lineSize;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';
    this.captureMouseEvents(this.canvas.nativeElement);
    this.captureTouchEvents(this.canvas.nativeElement);
  }

  setColor(color: any) {
    this.color = color;
  }

  clearCanvas() {
    const canvas = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.isDrawn = false;
  }

  private captureMouseEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              pairwise()
            )
        })
      )
      .subscribe((res) => {
        if (res[0] instanceof MouseEvent && res[1] instanceof MouseEvent) {
          const evt1: MouseEvent = res[0];
          const evt2: MouseEvent = res[1];
          const prevPos = {
            x: evt1.offsetX,
            y: evt1.offsetY
          };
          const currentPos = {
            x: evt2.offsetX,
            y: evt2.offsetY
          };
          this.drawOnCanvas(prevPos, currentPos, this.color, this.lineSize);
        }
      });
  }
  private captureTouchEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'touchstart')
      .pipe(
        switchMap((e) => {
          return fromEvent(canvasEl, 'touchmove')
            .pipe(
              takeUntil(fromEvent(canvasEl, 'touchend')),
              pairwise()
            )
        })
      )
      .subscribe((res) => {
        if (res[0] instanceof TouchEvent && res[1] instanceof TouchEvent) {
          const evt1: Touch = (<TouchEvent>res[0]).touches[0];
          const evt2: Touch = (<TouchEvent>res[1]).touches[0];
          const prevPos = {
            x: evt1.clientX - this.canvasRect.left,
            y: evt1.clientY - this.canvasRect.top
          };
          const currentPos = {
            x: evt2.clientX - this.canvasRect.left,
            y: evt2.clientY - this.canvasRect.top
          };
          this.drawOnCanvas(prevPos, currentPos, this.color, this.lineSize);
        }
      });

  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }, color: any, size: number) {
    if (!this.ctx) { return; }
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = size;

    if (prevPos) {
      this.ctx.moveTo(prevPos.x, prevPos.y);
      this.ctx.lineTo(currentPos.x, currentPos.y);
      this.ctx.stroke();
    }
  }

}
