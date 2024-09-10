import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { Book } from 'src/app/interfaces/models/Book';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  const bookMock: Book = {
    id: '1',
    title: 'Title 1',
    authors: ['Author 1'],
    publicationDate: '1',
  };
  const eventSpy = jasmine.createSpyObj('event', ['stopPropagation']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    component.book = bookMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get and show book atributes', () => {
    expect(component.book.id).toEqual(bookMock.id);
    expect(component.book.title).toEqual(bookMock.title);
    expect(component.book.authors[0]).toEqual(bookMock.authors[0]);
    expect(component.book.publicationDate).toEqual(bookMock.publicationDate);

    const bookCardElement: HTMLElement = fixture.nativeElement;

    expect(bookCardElement.textContent).toContain(bookMock.title);
    expect(bookCardElement.textContent).toContain(bookMock.publicationDate);
  });

  it('should emit addToWishListEvent and stopPropagation', () => {
    const addToWishListSpy = spyOn(component.addToWishListEvent, 'emit');

    component.addToWishList(component.book, eventSpy);

    expect(addToWishListSpy).toHaveBeenCalledWith(component.book);
    expect(eventSpy.stopPropagation).toHaveBeenCalled();
  });

  it('should emit deleteFromWishListEvent and stopPropagation', () => {
    const deleteFromWishList = spyOn(component.deleteFromWishListEvent, 'emit');

    component.deleteFromWishList(component.book, eventSpy);

    expect(deleteFromWishList).toHaveBeenCalledWith(component.book);
    expect(eventSpy.stopPropagation).toHaveBeenCalled();
  });
});
