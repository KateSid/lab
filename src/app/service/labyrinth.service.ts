import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Labyrinth} from '../model/labyrinth';
import {HttpService} from './http.service';
import {Cell} from '../model/Cell';

@Injectable()
export class LabyrinthService {
  public labyrinth: Labyrinth;
  private cellsWay: Cell[];
  private errorCells: Cell[];
  public saveready: boolean;
  private isDraw: boolean;
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
      this.labyrinth = data;
    });
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
    for (const el of this.cellsWay) {
      if (this.isDraw) {
        await this.setimg(el.x, el.y, 5);
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
      if (this.currentComponent == 3) {
        this.labyrinth.start.x = row;
        this.labyrinth.start.y = x;
      }
      if (this.currentComponent == 4) {
        this.labyrinth.stop.x = row;
        this.labyrinth.stop.y = x;
      }
      this.labyrinth.pattern[row][x] = this.currentComponent;
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
  public loadLabyrinth(name: string) {
    this.httpService.loadLabyrinth(name).subscribe((data: string) => {
      name = data;
    });
  }
  public CheckElementSet(i: number, j: number) {
    return (this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i + 1][j] // правый нижний квадрат
      && this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i][j + 1]
      && this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i + 1][j + 1])

      || (this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i - 1][j] // левый верхний квадрат
        && this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i][j - 1]
        && this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i - 1][j - 1])

      || (this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i - 1][j] // правый верхний квадрат
        && this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i][j + 1]
        && this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i - 1][j + 1])

      || (this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i + 1][j] // левый нижний квадрат
        && this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i][j - 1]
        && this.labyrinth.pattern[i][j] == this.labyrinth.pattern[i + 1][j - 1]);
  }
  public ExcelentStruct(c: boolean) {
    let n: number;
    let b: boolean;
    b = true;
    for (let i = 1; i < this.labyrinth.height - 1; i++) {
      for (let j = 1; j < this.labyrinth.width - 1; j++) {
        if (this.currentComponent) {
          this.errorCells[n].x = i; // добавляем элемент
          this.errorCells[n].y = j; // добавляем элемент
          n++;
        }
      }
    }
      if ((this.labyrinth.start.x >= this.labyrinth.width) || (this.labyrinth.start.x < 0) || (this.labyrinth.start.y >= this.labyrinth.height) || (this.labyrinth.start.y < 0) || (this.labyrinth.start.x == 0 && this.labyrinth.start.y == 0)
        || (this.labyrinth.start.x == 0 && this.labyrinth.start.y == this.labyrinth.height - 1) || (this.labyrinth.start.x == this.labyrinth.width - 1 && this.labyrinth.start.y == this.labyrinth.height - 1)
        || (this.labyrinth.start.x == this.labyrinth.width - 1 && this.labyrinth.start.y == 0)){
        b = false;
      }
    if ((this.labyrinth.stop.x >= this.labyrinth.width) || (this.labyrinth.stop.x < 0) || (this.labyrinth.stop.y >= this.labyrinth.height) || (this.labyrinth.stop.y < 0) || (this.labyrinth.stop.x == 0 && this.labyrinth.stop.y == 0)
        || (this.labyrinth.stop.x == 0 && this.labyrinth.stop.y == this.labyrinth.height - 1) || (this.labyrinth.stop.x == this.labyrinth.width - 1 && this.labyrinth.stop.y == this.labyrinth.height - 1)
        || (this.labyrinth.stop.x == this.labyrinth.width - 1 && this.labyrinth.stop.y == 0)) {
        b = false;
      }
    console.log(b);
    if ((this.labyrinth.stop.y == this.labyrinth.start.y) && (this.labyrinth.stop.x == this.labyrinth.start.x)) {
      b = false;
      }
    console.log(b);
    for (let i = 1; i < this.labyrinth.height - 1; i++) {
      for (let j = 1; j < this.labyrinth.width - 1; j++) {
        if (this.CheckElementSet(i, j)) {
          this.errorCells[n].x = i; // добавляем элемент
          this.errorCells[n].y = j; // добавляем элемент
          n++;
        }
      }
    }
    //FindCycle(errorListPoints);

  }
}
