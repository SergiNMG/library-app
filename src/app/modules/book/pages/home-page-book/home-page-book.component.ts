import { Component } from '@angular/core';
import { Book } from 'src/app/interfaces/models/Book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-home-page-book',
  templateUrl: './home-page-book.component.html',
  styleUrls: ['./home-page-book.component.scss'],
})
export class HomePageBookComponent {
  bookList: Book[] = [];
  wishList: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getStaticBooks();
    this.getWishList();
  }

  getStaticBooks() {
    this.bookService.getStaticBooks();
    this.bookService.books$.subscribe({
      next: (books) => {
        this.bookList = books;
      },
      error: (error) => {
        console.error(`Error while getting books ${error}`);
      },
    });
  }

  getWishList() {
    this.bookService.wishList$.subscribe({
      next: (books) => {
        this.wishList = books;
      },
      error: (error) => {
        console.error(`Error while getting wishList ${error}`);
      },
    });
  }

  addBookToWishList(book: Book) {
    this.bookService.addToWishList(book);
  }

  deleteBookFromWishList(book: Book) {
    this.bookService.deleteFromWishList(book);
  }
}
