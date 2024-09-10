import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, pipe } from 'rxjs';
import { IAuthorContract } from '../../interfaces/contracts/IAuthorContract';
import { Author } from 'src/app/interfaces/models/Author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  url: string = 'https://openlibrary.org';

  constructor(private httpAuthorService: HttpClient) {}

  getAuthorById(olid: string): Observable<Author> {
    return this.httpAuthorService
      .get<IAuthorContract>(`${this.url}${olid}.json`)
      .pipe(
        map((authorContract) => {
          return new Author(authorContract);
        })
      );
  }
}
