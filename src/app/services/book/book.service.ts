import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBookContract } from '../../interfaces/contracts/IBookContract';
import { IWorkContract } from 'src/app/interfaces/contracts/IWorkContract';
import { Work } from 'src/app/interfaces/models/Work';
import { IBookSearchResponseContract } from 'src/app/interfaces/contracts/IBookSearchResponseContract';
import { BookDetail } from 'src/app/interfaces/models/BookDetail';
import { Book } from 'src/app/interfaces/models/Book';
import { IBook } from 'src/app/interfaces/book/IBook';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  jsonURL = 'assets/data/library.json';
  url: string = 'https://openlibrary.org/books';
  urlOpenLibrary: string = 'https://openlibrary.org';
  urlSearch: string = 'https://openlibrary.org/search.json';

  private _booksList: Book[] = [];
  private _wishList: Book[] = [];

  private readonly booksSubject = new BehaviorSubject<Book[]>([]);
  books$: Observable<Book[]> = this.booksSubject.asObservable();

  private readonly wishListSubject = new BehaviorSubject<Book[]>([]);
  wishList$: Observable<Book[]> = this.wishListSubject.asObservable();

  constructor(private httpBookService: HttpClient) {
    //this.getStaticBooks();
  }

  getStaticBooks() {
    this.httpBookService.get<IBook[]>(this.jsonURL).subscribe({
      next: (staticBookList) => {
        this._booksList = staticBookList;
        this.filterBooks();
        this.booksSubject.next(this._booksList);
      },
      error: (error) => {
        console.error(`Error while getting books ${error}`);
      },
    });
  }

  getBookById(olid: string): Observable<BookDetail> {
    return this.httpBookService
      .get<IBookContract>(`${this.url}/${olid}.json`)
      .pipe(
        map((bookContract) => {
          return new BookDetail(bookContract);
        })
      );
  }

  getWorkById(urlOlid: string): Observable<Work> {
    return this.httpBookService
      .get<IWorkContract>(`${this.urlOpenLibrary}${urlOlid}.json`)
      .pipe(
        map((workContract) => {
          return new Work(workContract);
        })
      );
  }

  getBooksByTitle(title: string): Observable<Book[]> {
    let titleParams = new HttpParams().set('title', title).set('limit', 5);
    return this.httpBookService
      .get<IBookSearchResponseContract>(this.urlSearch, {
        params: titleParams,
      })
      .pipe(
        map((bookSearchResponseContract) => {
          console.log(bookSearchResponseContract);
          return (
            bookSearchResponseContract.docs.map((doc) => new Book(doc)) || []
          );
        })
      );
  }

  private filterBooks() {
    this._booksList = this._booksList.filter((book) => {
      return !this._wishList.some((favoriteBook) => {
        return book.id === favoriteBook.id;
      });
    });
  }

  addToWishList(book: Book) {
    if (!this.checkIfBookIsInWishList(book)) {
      this._wishList.push(book);
      this.deleteStaticBookFromList(book);
    }
    this.wishListSubject.next(this._wishList);
    this.booksSubject.next(this._booksList);
  }

  deleteFromWishList(book: Book) {
    this._wishList = this._wishList.filter((bookInList) => book !== bookInList);
    this.addStaticBookToList(book);
    this.wishListSubject.next(this._wishList);
    this.booksSubject.next(this._booksList);
  }

  private deleteStaticBookFromList(book: Book) {
    this._booksList = this._booksList.filter(
      (bookInList) => book !== bookInList
    );
    this.booksSubject.next(this._booksList);
  }

  private addStaticBookToList(book: Book) {
    this._booksList.push(book);
    this.booksSubject.next(this._booksList);
  }

  private checkIfBookIsInWishList(book: Book) {
    return this._wishList.find(
      (bookInWishList) => book.id === bookInWishList.id
    );
  }
}
