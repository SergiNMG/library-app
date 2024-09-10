import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPageSearchComponent } from './book-page-search.component';
import { Book } from 'src/app/interfaces/models/Book';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

fdescribe('BookPageSearchComponent', () => {
  let component: BookPageSearchComponent;
  let fixture: ComponentFixture<BookPageSearchComponent>;

  let booksByTitleMock: Book[] = [
    {
      id: 'ol1',
      title: 'Title1',
      authors: ['Author1'],
      publicationDate: '1',
    },
    {
      id: 'ol2',
      title: 'Ttile2',
      authors: ['Author2', 'Author1'],
      publicationDate: '2',
    },
  ];
  let bookMock: Book = booksByTitleMock[0];

  // const bookServiceMock = {
  //   getBooksByTitle: jasmine
  //     .createSpy('getBooksByTitle')
  //     .and.returnValue(of(booksByTitleMock))
  // };

  const bookServiceMock = jasmine.createSpyObj('BookService', [
    'getBooksByTitle',
    'addToWishList',
  ]);
  const mockInputEvent = { target: { value: 'Title' } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookPageSearchComponent],
      providers: [{ provide: BookService, useValue: bookServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(BookPageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the bookByTitleList and save it in bookByTitleList', () => {
    bookServiceMock.getBooksByTitle.and.returnValue(of(booksByTitleMock));
    component.getBooksByTitle();

    expect(bookServiceMock.getBooksByTitle).toHaveBeenCalled();
    expect(component.bookByTitleList).toEqual(booksByTitleMock);
  });

  it('should return no results if the search has not results', () => {
    bookServiceMock.getBooksByTitle.and.returnValue(of([]));
    component.getBooksByTitle();

    expect(bookServiceMock.getBooksByTitle).toHaveBeenCalled();
    expect(component.bookByTitleList.length).toBe(0);
    expect(component.noResults).toBe(true);
  });

  it('should update the title when onInput is called', () => {
    component.onInput(mockInputEvent);
    expect(component.title).toEqual('Title');
  });

  it('should add a book to the wishList when button is clicked', () => {
    component.addBookToWishList(bookMock);
    expect(bookServiceMock.addToWishList).toHaveBeenCalledWith(bookMock);
  });
});
