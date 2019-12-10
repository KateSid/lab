import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Labyrinth} from './labyrinth';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }
  postData(labyrinth: Labyrinth) {
    const body = {height: labyrinth.height, width: labyrinth.width, theme: labyrinth.theme};
    return this.http.post('http://localhost:8080/init', body);
  }
  getData(url: string) {
    return this.http.get('http://localhost:8080/' + url);
  }
}
