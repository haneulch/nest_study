import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie-dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getMaxId(): number {
    this.movies.sort((movie) => movie.id);
    return this.movies.length > 0 ? this.movies[this.movies.length - 1].id + 1 : 1;
  }

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(movieId: number) {
    const movie = this.movies.find((movie) => movie.id === +movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found.`);
    }
    return movie;
  }

  create(movieData) {
    this.movies.push({
      id: this.getMaxId(),
      ...movieData,
    });
  }

  deleteOne(movieId: number) {
    const idx = this.movies.findIndex((movie) => movie.id === movieId);
    if (idx === -1) {
      throw new NotFoundException(`Movie with ID ${movieId} not found.`);
    }
    this.movies.splice(idx, 1);
    return true;
  }

  search(searchText: string) {
    return this.movies.find((movie) => movie.title.indexOf(searchText) > -1);
  }

  update(movieId: number, updateData: UpdateMovieDto) {
    const idx = this.movies.findIndex((movie) => movie.id === movieId);
    if (idx === -1) {
      throw new NotFoundException(`Movie with ID ${movieId} not found.`);
    }
    this.movies[idx].title = updateData.title;
    this.movies[idx].genres = updateData.genres;
    this.movies[idx].year = updateData.year;
    return true;
  }
}
