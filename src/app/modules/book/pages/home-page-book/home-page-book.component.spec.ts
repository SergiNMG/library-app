import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageBookComponent } from './home-page-book.component';
import { of } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/interfaces/models/Book';

fdescribe('HomePageBookComponent', () => {
  let component: HomePageBookComponent;
  let fixture: ComponentFixture<HomePageBookComponent>;
  let booksMock: Book[] = [
    {
      id: '1',
      title: 'Title 1',
      authors: ['Author 1'],
      publicationDate: '1',
    },
    {
      id: '2',
      title: 'Title 2',
      authors: ['Author 2'],
      publicationDate: '2',
    },
  ];
  let wishListMock: Book[] = [];

  const booksServiceMock = {
    books$: of(booksMock),
    wishList$: of(wishListMock),
    getStaticBooks: jasmine
      .createSpy('getSaticBooks')
      .and.returnValue(of(booksMock)),
    getWishList: jasmine
      .createSpy('getWishList')
      .and.returnValue(of(wishListMock)),
    addToWishList: jasmine.createSpy('addToWishList').and.callFake((book) => {
      wishListMock.push(book);
      return of(wishListMock);
    }),
    deleteFromWishList: jasmine
      .createSpy('deleteFromWishList')
      .and.callFake((book) => {
        wishListMock = wishListMock.filter((bookInList) => bookInList !== book);
        return of(wishListMock);
      }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageBookComponent],
      providers: [{ provide: BookService, useValue: booksServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HomePageBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with books and wishList', () => {
    component.ngOnInit();
    expect(component.bookList).toEqual(booksMock);
    expect(component.wishList).toEqual(wishListMock);
  });

  it('should call getStaticBooks and get books$', () => {
    component.getStaticBooks();
    expect(booksServiceMock.getStaticBooks).toHaveBeenCalled();
    expect(component.bookList).toEqual(booksMock);
  });

  it('should call addToWishList when favButton is clicked', () => {
    const book = booksMock[0];
    component.addBookToWishList(book);
    expect(booksServiceMock.addToWishList).toHaveBeenCalledWith(book);
  });

  it('should call deleteFromWishList when favButton is clicked', () => {
    const book = booksMock[0];
    component.addBookToWishList(book);
    component.deleteBookFromWishList(book);
    expect(booksServiceMock.deleteFromWishList).toHaveBeenCalledWith(book);
  });
});
