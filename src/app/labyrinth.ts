import { Cell } from './Cell';
import { Injectable } from '@angular/core';

@Injectable()
export class Labyrinth {
  width: number;
  height: number;
  pattern: number[][];
  theme = 0;
  start: Cell;
  stop: Cell;
}

