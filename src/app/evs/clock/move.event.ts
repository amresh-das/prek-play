import {ClockHand} from "./clock.hand";
import {Point} from "@angular/cdk/drag-drop";

export interface MoveEvent {
  prevDegree: number;
  hand: ClockHand;
  point: Point;
}
