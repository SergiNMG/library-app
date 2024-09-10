import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { Book } from 'src/app/interfaces/models/Book';

fdescribe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookListMock: Book[] = [
    {
      id: '1',
      title: 'Cien años de soledad',
      authors: ['Gabriel García Márquez'],
      publicationDate: '1967',
    },
    {
      id: '2',
      title: 'El señor de los anillos',
      authors: ['J.R.R. Tolkien'],
      publicationDate: '1954',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent],
    });
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.bookList = bookListMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive a bookList', () => {
    expect(component.bookList).toBeDefined();
    expect(component.bookList).toEqual(bookListMock);
  });

  it('shoul emit an addEvent when button is clicked', () => {
    let addEventSpy = spyOn(component.addToWishListEvent, 'emit');
    component.addToWishList(component.bookList[0]);
    expect(addEventSpy).toHaveBeenCalledOnceWith(component.bookList[0]);
  });

  it('should emit a deleteEvent when button is clicked', () => {
    component.addToWishList(component.bookList[0]);

    let deleteEventSpy = spyOn(component.deleteFromWishListEvent, 'emit');
    component.deleteFromWishList(component.bookList[0]);

    expect(deleteEventSpy).toHaveBeenCalledWith(component.bookList[0]);
  });
});
