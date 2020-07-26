import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../models/movie';
import { LoadingController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  segment: string;
  page: number;
  movies: Movie[];
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private tmdb: TmdbService
  ) { }

  ngOnInit() {
    
    this.loadMovies();
    this.page = 1;
    this.movies = null;
  }

  onNextPage() {
    this.page++;
    this.loadMovies();
  }

  onMovieDetail(id: number) {
    this.router.navigate(['movie-detail', id]);
  }

  onSearch() {
    this.router.navigate(['search']);
  }

  private async loadMovies() {

    let service = this.tmdb.getTopMovies(this.page);
    service.subscribe(res => {
      if (!this.movies) { this.movies = []; }
      this.movies = this.movies.concat(res);
      
    }, err => {
      this.movies = [];
      
    });
  }

}
