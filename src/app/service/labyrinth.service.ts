import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Labyrinth} from '../model/labyrinth';
import {HttpService} from './http.service';
import {Cell} from '../model/Cell';

@Injectable()
export class LabyrinthService {
  public labyrinth: Labyrinth;
  private cellsWay: Cell[];
  private isDraw: boolean;
  public eventEndDrawWay: EventEmitter<boolean> = new EventEmitter<boolean>();
  speed = 1;
  currentComponent = 1;
  isManualEdit = false;

  constructor(@Inject(HttpService) private httpService: HttpService) {
    this.labyrinth = new Labyrinth();
    this.labyrinth.height = 31;
    this.labyrinth.width = 31;
    this.labyrinth.theme = 1;
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


  setComponent(row: number, x: number) {
    if (this.isManualEdit) {
      this.labyrinth.pattern[row][x] = this.currentComponent;
    }
  }
}
