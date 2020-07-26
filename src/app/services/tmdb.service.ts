import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly params = {
    api_key: '276af3009ddbc46f7eab406a29150f30',
    language: 'es-ES'
  };

  constructor(private http: HttpClient) { }

  getTopMovies(page: number) {
    return this.http.get(`${this.baseUrl}/movie/top_rated${this.getParams({ page: page })}`)
      .pipe(map((res: any) => <Movie[]>res.results))
      .pipe(delay(500));
  }

  searchMovies(query: string) {
    return this.http.get(`${this.baseUrl}/search/movie${this.getParams({ query: query })}`)
      .pipe(map((res: any) => <Movie[]>res.results));
  }

  getMovieDetail(id: number) {
    const append = '&append_to_response=credits';
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}${this.getParams()}${append}`);
  }

  private getParams(params?: any) {
    const obj = { ...this.params, ...params };
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return '?' + str.join('&');
  }
}
