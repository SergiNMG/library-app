import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Book } from 'src/app/interfaces/models/Book';
import { BookDetail } from 'src/app/interfaces/models/BookDetail';
import { BookService } from 'src/app/services/book/book.service';
import { newtonsCradle } from 'ldrs';

@Component({
  selector: 'app-book-page-search',
  templateUrl: './book-page-search.component.html',
  styleUrls: ['./book-page-search.component.scss'],
})
export class BookPageSearchComponent {
  bookByTitleList: Book[] = [];
  title!: string;
  loading!: boolean;
  noResults!: boolean;

  @ViewChild('titleInput') titleInput!: ElementRef;

  constructor(private bookService: BookService) {}

  getBooksByTitle() {
    this.loading = true;
    newtonsCradle.register();
    this.bookService.getBooksByTitle(this.title).subscribe({
      next: (bookSearchList) => {
        this.bookByTitleList = bookSearchList;
        this.loading = false;
        if (this.bookByTitleList.length === 0) this.noResults = true;
        //console.log(this.bookByTitleList);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al obtener los libros', error);
      },
    });
  }

  addBookToWishList(book: Book) {
    this.bookService.addToWishList(book);
  }

  onInput(event: any) {
    this.title = event.target.value;
  }
}
