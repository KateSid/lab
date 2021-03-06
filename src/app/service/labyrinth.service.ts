import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Labyrinth} from '../model/labyrinth';
import {HttpService} from './http.service';
import {Cell} from '../model/Cell';

@Injectable()
export class LabyrinthService {
  public labyrinth: Labyrinth;
  public cellsWay: Cell[];
  public errorCells: Cell[] = [];
  public saveready: boolean;
  public isDraw: boolean;
  public eventEndDrawWay: EventEmitter<boolean> = new EventEmitter<boolean>();
  speed = 1;
  currentComponent = 1;
  isManualEdit = false;
  public labFilse: string[];

  constructor(@Inject(HttpService) private httpService: HttpService) {
    this.labyrinth = new Labyrinth();
    this.labyrinth.height = 31;
    this.labyrinth.width = 31;
    this.labyrinth.theme = 1;
    this.labyrinth.hero = new Cell();
    this.saveready = false;
  }

  public setParameterLabyrinth() {
    this.cellsWay = undefined;
    this.isDraw = false;
    this.httpService.postData(this.labyrinth).subscribe(res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      });
  }

  async getLabyrinthStruct(url: string) {
    this.httpService.getData(url).subscribe((data: Labyrinth) => {
      this.labyrinth.start = data.start;
      this.labyrinth.stop = data.stop;

      for (let i = 0; i < data.height; i++) {
        for (let j = 0; j < data.width; j++) {
          this.labyrinth.pattern[i][j] = data.pattern[i][j];
        }
      }
    });
  }

  public getLabyrinthPattern() {
    this.httpService.getLab().subscribe((data: Labyrinth) => {
      this.labyrinth.start = data.start;
      this.labyrinth.stop = data.stop;
      this.labyrinth.pattern = data.pattern;
      this.labyrinth.width = data.width;
      this.labyrinth.height = data.height;
      this.labyrinth.theme = data.theme;
    });
  }
  public sendLab() {
    this.httpService.postLab(this.labyrinth).subscribe();
  }
  async getLabyrinthWay(url: string) {
    if (!this.isDraw) {
      this.isDraw = true;
      if (this.cellsWay !== undefined) {
        this.clearLabyrinth();
      }

      this.httpService.getWay(url).subscribe((data: Cell[]) => {
        this.cellsWay = data;
        this.setWay();
      });
    }
  }

  private clearLabyrinth() {
    for (const el of this.cellsWay) {
      this.labyrinth.pattern[el.y][el.x] = 0;
    }
  }

  private async setWay() {
    for (let i = 0; i < this.cellsWay.length; i++) {
      const el = this.cellsWay[i];
      if (this.isDraw) {
        if (i !== 0) {
          const prewElement = this.cellsWay[i - 1];

          if (this.labyrinth.pattern[el.y][el.x] === MazeComponent.Way) {
            this.setimg(prewElement.x, prewElement.y, MazeComponent.Pass);
          } else {
            this.setimg(prewElement.x, prewElement.y, MazeComponent.Way);
          }
        }

        await this.setimg(el.x, el.y, MazeComponent.Personage);
      }
    }
    this.isDraw = false;
    this.eventEndDrawWay.emit(this.isDraw);
  }

  async setimg(x: number, y: number, component: number) {
    this.labyrinth.pattern[y][x] = component;
    await this.sleep(170 - (this.speed * 40));
  }

  async sleep(msecs: number) {
    return new Promise(resolve => setTimeout(resolve, msecs));
  }

  public setComponent(row: number, x: number) {
    if (this.isManualEdit) {
      switch (Number(this.currentComponent) as MazeComponent) {
        case MazeComponent.Entry:
          if (this.checkDiagonal(row, x)) {
            if (this.labyrinth.start === null || this.labyrinth.start === undefined) {
              this.labyrinth.start = new  Cell();
              this.labyrinth.setStartPosition(row, x);
              this.setimg(x, row, MazeComponent.Entry);
            } else if ((this.labyrinth.start.y !== 0 && this.labyrinth.start.y !== this.labyrinth.height - 1
              && this.labyrinth.start.x !== 0 && this.labyrinth.start.x !== this.labyrinth.width - 1) ||
              (this.labyrinth.start.y > this.labyrinth.height - 1 || this.labyrinth.start.x > this.labyrinth.width - 1)) {
              this.labyrinth.setStartPosition(row, x);
              this.setimg(x, row, MazeComponent.Entry);
            } else {
              const entry = this.labyrinth.start;
              this.setimg(entry.x, entry.y, MazeComponent.Wall);
              this.labyrinth.setStartPosition(row, x);
              this.setimg(x, row, MazeComponent.Entry);
            }

          }

          break;

        case MazeComponent.Exit:
          if (this.checkDiagonal(row, x)) {
            if (this.labyrinth.stop === null || this.labyrinth.stop === undefined) {
              this.labyrinth.stop = new  Cell();
              this.labyrinth.setStopPosition(row, x);
              this.setimg(x, row, MazeComponent.Exit);
            } else if (((this.labyrinth.stop.y !== 0 && this.labyrinth.stop.y !== this.labyrinth.height - 1
              && this.labyrinth.stop.x !== 0 && this.labyrinth.stop.x !== this.labyrinth.width - 1) ||
              (this.labyrinth.stop.y > this.labyrinth.height - 1 || this.labyrinth.stop.x > this.labyrinth.width - 1))) {
              this.labyrinth.setStopPosition(row, x);
              this.setimg(x, row, MazeComponent.Exit);
            } else {
              const exit = this.labyrinth.stop;
              this.setimg(exit.x, exit.y, MazeComponent.Wall);

              this.labyrinth.setStopPosition(row, x);
              this.setimg(x, row, MazeComponent.Exit);
            }
          }
          break;

        case MazeComponent.Pass:
        case MazeComponent.Wall:
          if ((row !== 0 && row !== this.labyrinth.height - 1
            && x !== 0 && x !== this.labyrinth.width - 1) ) {
              this.labyrinth.pattern[row][x] = Number(this.currentComponent);
          }
          break;

        default:

          break;

      }

    }
  }

  public sendLabirynth(name: string) {
    this.httpService.saveLab(name).subscribe();
  }

  public loadLabirynths() {
    this.httpService.loadListLabyrinth().subscribe((data: string[]) => {
      this.labFilse = data;
    });
  }

  public async loadLabyrinth(name: string) {
    this.httpService.loadLabyrinth(name).subscribe((data: Labyrinth) => {
      this.labyrinth.start = data.start;
      this.labyrinth.stop = data.stop;
      this.labyrinth.pattern = data.pattern;
      this.labyrinth.width = data.width;
      this.labyrinth.height = data.height;
      this.labyrinth.theme = data.theme;
    });
  }

  public CheckElementSet(i: number, j: number) {
    return (this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i + 1][j] // правый нижний квадрат
      && this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i][j + 1]
      && this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i + 1][j + 1])

      || (this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i - 1][j] // левый верхний квадрат
        && this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i][j - 1]
        && this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i - 1][j - 1])

      || (this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i - 1][j] // правый верхний квадрат
        && this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i][j + 1]
        && this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i - 1][j + 1])

      || (this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i + 1][j] // левый нижний квадрат
        && this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i][j - 1]
        && this.labyrinth.pattern[i][j] === this.labyrinth.pattern[i + 1][j - 1]);
  }

  public ExcelentStruct(c: boolean) {
    this.errorCells = [];
    for (let i = 1; i < this.labyrinth.height - 1; i++) {
      for (let j = 1; j < this.labyrinth.width - 1; j++) {
        if (this.CheckElementSet(i, j)) {
          this.errorCells.push(new Cell(j, i));
        }
      }
    }
    return this.errorCells;
  }

  private checkDiagonal = (y: number, x: number) => {
    return (x === 0 || x === this.labyrinth.width - 1
      || y === 0 || y === this.labyrinth.height - 1)
      && !((x === 0 && y === 0)
        || (x === 0 && y === this.labyrinth.height - 1)
        || (x === this.labyrinth.width - 1 && y === 0)
        || (x === this.labyrinth.width - 1 && y === this.labyrinth.height - 1))
      && (((x === 0 || x === this.labyrinth.width - 1) && y % 2 === 1)
        || ((y === 0 || y === this.labyrinth.height - 1) && x % 2 === 1));
     // && !(x === this.labyrinth.start.x && y === this.labyrinth.start.y)
   //   && !(x === this.labyrinth.stop.x && y === this.labyrinth.stop.y);


  }
}


export enum MazeComponent {
  Pass = 0,
  Wall = 1,
  Entry = 3,
  Exit = 4,
  Way = 5,
  Personage = 6
}
