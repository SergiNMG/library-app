import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/models/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  @Input() bookList!: Book[];
  @Input() listType!: string;

  @Output() addToWishListEvent = new EventEmitter<Book>();
  @Output() deleteFromWishListEvent = new EventEmitter<Book>();

  addToWishList(book: Book) {
    this.addToWishListEvent.emit(book);
  }

  deleteFromWishList(book: Book) {
    this.deleteFromWishListEvent.emit(book);
  }
}
