import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Word} from "../model/word.model";
import {WordPicComponent} from "./word.pic.component";
import {fromEvent} from "rxjs";
import {pairwise, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-read-word',
  templateUrl: './read-word.component.html',
  styleUrls: ['./read-word.component.scss']
})
export class ReadWordComponent implements AfterViewInit {
  words: Word[];
  displayIndex = 0;
  editable = false;
  color = '#ff0000';
  lineSize = 8;
  isDrawn = false;
  @ViewChild('wordCanvas') canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  canvasRect: any;
  vowelColor: any;
  consonantColor: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<ReadWordComponent>) {
    this.words = this.data.items;
    this.vowelColor = this.data.vowelColor;
    this.consonantColor = this.data.consonantColor;
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
    this.dialogRef.keydownEvents().subscribe((evt) => {
      if (evt.key === 'ArrowLeft') {
        this.prev();
      } else if (evt.key === 'ArrowRight') {
        this.next();
      } else if (evt.key === 'Escape') {
        this.close();
      } else if (evt.key === 'Enter') {
        this.showPic();
      }
    });
  }

  next() {
    if (this.displayIndex < this.words.length - 1) {
      this.displayIndex++;
      this.editable = false;
      this.clearCanvas();
    }
  }

  prev() {
    if (this.displayIndex > 0) {
      this.displayIndex--;
      this.editable = false;
      this.clearCanvas();
    }
  }

  allDone() : boolean {
    return this.displayIndex === this.words.length;
  }

  getWord(): Word {
    return this.words[this.displayIndex];
  }

  showPic() {
    if (this.getWord()?.resources?.length) {
      let dialogWidth = window.innerWidth < window.innerHeight ? '80%' : '40%';
      const dialogRef = this.dialog.open(WordPicComponent, {
        width: dialogWidth,
        hasBackdrop: true,
        data: {
          item: this.getWord()
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  clearCanvas() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
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

  getWidth() {
    return window.screen.width;
  }

  getHeight() {
    return window.screen.height;
  }

}
