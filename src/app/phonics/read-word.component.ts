import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Word} from "../model/word.model";
import {WordPicComponent} from "./word.pic.component";
import {fromEvent, Subscription} from "rxjs";
import {pairwise, switchMap, takeUntil} from "rxjs/operators";
import {SettingsService} from "../services/settings.service";


@Component({
  selector: 'app-read-word',
  templateUrl: './read-word.component.html',
  styleUrls: ['./read-word.component.scss']
})
export class ReadWordComponent implements AfterViewInit, OnDestroy {
  words: Word[];
  displayIndex = 0;
  editable = false;
  color: any;
  lineSize = 10;
  isDrawn = false;
  fontSize = 10;
  showTextSizeInput = false;
  @ViewChild('wordCanvas') canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  vowelColor: any;
  consonantColor: any;
  subscriptions: Subscription[] = [];
  private static readonly READ_WORD_DRAW_COLOR = "read.word.draw.color";
  private static readonly READ_WORD_FONT_SIZE = "read.word.font.size";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<ReadWordComponent>, private settingsService: SettingsService) {
    this.words = this.data.items;
    this.displayIndex = this.data.index;
    this.vowelColor = this.data.vowelColor;
    this.consonantColor = this.data.consonantColor;
    this.color = this.settingsService.getConfigOrDefault(ReadWordComponent.READ_WORD_DRAW_COLOR, '#ff0000');
    this.fontSize = Number.parseFloat(this.settingsService.getConfigOrDefault(ReadWordComponent.READ_WORD_FONT_SIZE, '10'));
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = this.lineSize;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';
    this.subscriptions.push(this.captureMouseEvents(this.canvas.nativeElement));
    this.subscriptions.push(this.captureTouchEvents(this.canvas.nativeElement));
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

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
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

  private captureMouseEvents(canvasEl: HTMLCanvasElement): Subscription {
    return fromEvent(canvasEl, 'mousedown')
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
    return fromEvent(canvasEl, 'touchstart')
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
          const canvasRect = this.canvas.nativeElement.getBoundingClientRect();
          const prevPos = {
            x: evt1.clientX - canvasRect.left,
            y: evt1.clientY - canvasRect.top
          };
          const currentPos = {
            x: evt2.clientX - canvasRect.left,
            y: evt2.clientY - canvasRect.top
          };
          this.drawOnCanvas(prevPos, currentPos, this.color, this.lineSize);
        }
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }, color: any, size: number) {
    if (!this.ctx) {
      // @ts-ignore
      this.ctx = this.canvas.nativeElement.getContext('2d');
    }
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

  setColor(color: any) {
    this.color = color;
    this.updateColorSelection();
  }

  updateColorSelection() {
    this.settingsService.setConfig(ReadWordComponent.READ_WORD_DRAW_COLOR, this.color);
  }

  hideWord(word: string) {
    const hidden: string[] = JSON.parse(this.settingsService.getConfigOrDefault(SettingsService.PHONICS_HIDDEN_WORDS, '[]'));
    hidden.push(word);
    this.settingsService.setConfig(SettingsService.PHONICS_HIDDEN_WORDS, JSON.stringify(hidden));
  }

  toggleTextSizeInput() {
    this.showTextSizeInput = !this.showTextSizeInput;
  }

  updateFontSize() {
    this.settingsService.setConfig(ReadWordComponent.READ_WORD_FONT_SIZE, this.fontSize + '');
    this.showTextSizeInput = false;
  }
}
