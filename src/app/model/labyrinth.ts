import {Cell} from './Cell';
import {Injectable} from '@angular/core';

@Injectable()
export class Labyrinth {
  width: number;
  height: number;
  pattern: number[][];
  theme = 0;
  start: Cell;
  stop: Cell;
  hero: Cell;

  public setStartPosition = (y: number, x: number) => {
    this.start.x = x;
    this.start.y = y;
  }

  public setStopPosition = (y: number, x: number) => {
    this.stop.x = x;
    this.stop.y = y;
  }
}

