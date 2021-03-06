import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Labyrinth} from '../model/labyrinth';

@Injectable()
export class HttpService {
  urlServer = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  postData(labyrinth: Labyrinth) {
    const body = {height: labyrinth.height, width: labyrinth.width, theme: labyrinth.theme};
    return this.http.post(this.urlServer + 'init', body);
  }
  postLab(labyrinth: Labyrinth) { const body = {height: labyrinth.height, width: labyrinth.width, theme: labyrinth.theme, pattern: labyrinth.pattern, start: labyrinth.start, stop: labyrinth.stop};
                                  return this.http.post(this.urlServer + 'hand', body);
  }
  getData(url: string) {
    return this.http.get(this.urlServer + url);
  }

  getWay(url: string) {
    return this.http.get(this.urlServer + url);
  }

  getLab() {
    return this.http.get(this.urlServer + 'getlab');
  }
  saveLab(name: string) {
    return this.http.get(this.urlServer + 'save?name=' + name);
  }
  loadListLabyrinth() {
    return this.http.get(this.urlServer + 'load');
  }
  loadLabyrinth(name: string) {
    return this.http.get(this.urlServer + 'load/' + name);
  }
}
