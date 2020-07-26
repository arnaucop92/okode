import { Component} from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  searchType: 'movies' = 'movies';
  searchInput = '';
  results: Movie[];

  constructor(private router: Router,
    private tmdb: TmdbService) { }

    onInput(event: any) {
      this.performSearch(this.searchInput);
    }
  
    onClear(event: any) {
      this.results = null;
    }
  
    onMovieDetail(id: number) {
      this.router.navigate(['movie-detail', id]);
    }
  
    private performSearch(query: string) {
      if (!query || query.trim().length <= 0) { return; }
      switch (this.searchType) {
        case 'movies':  this.performSearchMovies(query); break;
        default:
      }
      this.performSearchMovies(query);
    }
  
    private performSearchMovies(query: string) {
      this.tmdb.searchMovies(query).subscribe(res => {
        this.results = res;
      });
    }

}
