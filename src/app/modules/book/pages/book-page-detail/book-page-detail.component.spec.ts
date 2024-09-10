import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookPageDetailComponent } from './book-page-detail.component';
import { of, throwError } from 'rxjs';
import { Author } from 'src/app/interfaces/models/Author';
import { Work } from 'src/app/interfaces/models/Work';
import { BookService } from 'src/app/services/book/book.service';
import { AuthorService } from 'src/app/services/author/author.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookDetail } from 'src/app/interfaces/models/BookDetail';

fdescribe('BookPageDetailComponent', () => {
  let component: BookPageDetailComponent;
  let fixture: ComponentFixture<BookPageDetailComponent>;
  let authorMock: Author = {
    personal_name: 'Author 1',
    name: 'Author 1',
  };
  let workMock: Work = {
    description: 'Description 1',
  };
  let bookMock: BookDetail = {
    title: 'Tile 1',
    description: ['Description 1'],
    number_of_pages: 1,
    publish_date: '1',
    publishers: ['Publisher 1'],
    authors: ['/authors/ol1'],
    works: ['/works/ol1'],
  };

  const bookServiceMock = {
    getBookById: jasmine.createSpy('getBookById').and.returnValue(of(bookMock)),
    getWorkById: jasmine.createSpy('getWorkById').and.returnValue(of(workMock)),
  };
  const authorServiceMock = {
    getAuthorById: jasmine
      .createSpy('getAuthorById')
      .and.returnValue(of(authorMock)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookPageDetailComponent],
      providers: [
        { provide: BookService, useValue: bookServiceMock },
        { provide: AuthorService, useValue: authorServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(BookPageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should initialize and get a book by olid', () => {
    const olid = 'ol1';
    component.olid = olid;
    component.ngOnInit();

    expect(bookServiceMock.getBookById).toHaveBeenCalledWith(olid);
    console.log(component.bookSelected);
    expect(component.bookSelected).toEqual(bookMock);

    expect(authorServiceMock.getAuthorById).toHaveBeenCalledWith(
      '/authors/ol1'
    );
    expect(bookServiceMock.getWorkById).toHaveBeenCalledWith('/works/ol1');

    expect(component.authorList).toContain(authorMock);
    expect(component.workList).toContain(workMock);
  });

  it('should get error when the book subscription goes wrong', () => {
    const errorResponse = new Error('Error al obtener el libro');
    spyOn(bookServiceMock, 'getBookById').and.returnValue(
      throwError(errorResponse)
    );
    spyOn(console, 'error');

    component.ngOnInit();

    expect(bookServiceMock.getBookById).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Error al obtener el libro',
      errorResponse
    );
  });

  it('should get error when the author subscription goes wrong', () => {
    const errorResponse = new Error('Error al obtener el autor');
    spyOn(authorServiceMock, 'getAuthorById').and.returnValue(
      throwError(errorResponse)
    );
    spyOn(console, 'error');

    component.ngOnInit();

    expect(authorServiceMock.getAuthorById).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Error al obtener el autor',
      errorResponse
    );
  });

  it('should get error when the work subscription goes wrong', () => {
    bookServiceMock.getWorkById.and.returnValue(
      throwError(() => {
        new Error('Error al obtener la obra');
      })
    );
    const consoleSpy = spyOn(console, 'error');

    component.getWorkByOlid(bookMock.works[0]);

    expect(consoleSpy).toHaveBeenCalled();
    component.workList
      ? expect(component.workList.length).toBe(0)
      : expect(component.workList).toBeUndefined();
  });
});

// it('should get error when the author subscription goes wrong', () => {
//   authorServiceMock.getAuthorById.and.returnValue(
//     throwError(() => {
//       new Error('Error al obtener el autor');
//     })
//   );
//   const consoleSpy = spyOn(console, 'error');

//   component.getAuthorByOlid(bookMock.authors[0]);

//   expect(consoleSpy).toHaveBeenCalled();
//   component.authorList
//     ? expect(component.authorList.length).toBe(0)
//     : expect(component.authorList).toBeUndefined();
// });
