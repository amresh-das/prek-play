import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Word} from "../model/word.model";
import {WordPicComponent} from "./word.pic.component";

@Component({
  selector: 'app-read-word',
  templateUrl: './read-word.component.html',
  styleUrls: ['./read-word.component.scss']
})
export class ReadWordComponent implements OnInit {
  words: Word[];
  displayIndex = 0;
  editable = false;
  drawColor = '#ff0000';
  drawPosX: number = -1;
  drawPosY: number = -1;
  isDrawing = false;
  isDrawn = false;
  private readonly lineWidth = 10;

  @ViewChild('wordCanvas') wordCanvas: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<ReadWordComponent>) {
    this.words = this.data.items;
  }

  ngOnInit() {
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
    }
  }

  prev() {
    if (this.displayIndex > 0) {
      this.displayIndex--;
      this.editable = false;
    }
  }

  toggleEditable() {
    this.editable = !this.editable;
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

  positionCanvas(event: Event) {
    console.log(event);
  }

  clearCanvas() {
    const canvas = this.wordCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    this.isDrawn = false;
  }

  mouseDown(event: MouseEvent) {
    this.startDraw(event.offsetX, event.offsetY);
  }

  startTouch(event: TouchEvent) {
    if (event.touches.length > 0) {
      const touch = event.touches.item(0);
      if (touch) {
        const canvasRect = this.wordCanvas.nativeElement.getBoundingClientRect();
        const x = touch.clientX - canvasRect.x;
        const y = touch.clientY - canvasRect.y;
        console.log(x, y);
        this.startDraw(x, y);
      }
    }
  }

  mouseMove(event: MouseEvent) {
    this.drawLine(event.offsetX, event.offsetY);
  }

  touchMove(event: TouchEvent) {
    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches.item(i);
      if (touch) {
        const canvasRect = this.wordCanvas.nativeElement.getBoundingClientRect();
        const x = touch.clientX - canvasRect.x;
        const y = touch.clientY - canvasRect.y;
        this.drawLine(x, y);
      }
    }
  }

  startDraw(x: number, y: number) {
    this.drawPosX = x;
    this.drawPosY = y;
    this.isDrawing = true;
  }

  drawLine(x: number, y: number) {
    const ctx = this.wordCanvas.nativeElement.getContext('2d');
    if (this.isDrawing && ctx) {
      ctx.lineCap = 'round';
      ctx.lineWidth = this.lineWidth;
      this.isDrawn = true;
      ctx.strokeStyle = this.drawColor;
      ctx.beginPath();
      // console.log('Drawing ', this.drawPosX, this.drawPosY, x, y);
      ctx.moveTo(this.drawPosX, this.drawPosY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    this.drawPosX = x;
    this.drawPosY = y;
  }

  stopDraw() {
    this.isDrawing = false;
  }

}
