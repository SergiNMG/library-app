import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/models/Book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() book!: Book;
  @Input() listType!: string;

  @Output() addToWishListEvent = new EventEmitter<Book>();
  @Output() deleteFromWishListEvent = new EventEmitter<Book>();

  addToWishList(book: Book, event: Event) {
    event.stopPropagation();
    this.addToWishListEvent.emit(book);
  }

  deleteFromWishList(book: Book, event: Event) {
    event.stopPropagation();
    this.deleteFromWishListEvent.emit(book);
  }
}
