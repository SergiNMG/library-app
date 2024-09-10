import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IBookContract } from 'src/app/interfaces/contracts/IBookContract';
import { IWorkContract } from 'src/app/interfaces/contracts/IWorkContract';
import { Work } from 'src/app/interfaces/models/Work';
import { BookDetail } from 'src/app/interfaces/models/BookDetail';
import { Book } from 'src/app/interfaces/models/Book';
import { IBookSearchResponseContract } from 'src/app/interfaces/contracts/IBookSearchResponseContract';
import { IBookSearchContract } from 'src/app/interfaces/contracts/IBookSearchContract';

fdescribe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  let bookListMock: Book[] = [
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
    {
      id: '3',
      title: 'Title 3',
      authors: ['Author 3'],
      publicationDate: '3',
    },
  ];
  let staticBookMock: Book = bookListMock[2];

  const bookContractMock: IBookContract = {
    authors: [
      {
        key: '/authors/ol1',
      },
    ],
    classifications: {},
    covers: [],
    created: {
      type: '',
      value: '',
    },
    description: {
      type: 'text',
      value: 'Description 1',
    },
    first_sentence: {
      type: '',
      value: '',
    },
    identifiers: {
      goodreads: [],
      librarything: [],
    },
    isbn_10: [],
    isbn_13: [],
    key: '/books/ol1',
    languages: [],
    last_modified: {
      type: '',
      value: '',
    },
    latest_revision: 0,
    local_id: [],
    number_of_pages: 1,
    publish_date: '',
    publishers: [],
    revision: 0,
    source_records: [],
    title: 'Title 1',
    type: {
      key: '',
    },
    works: [
      {
        key: '/works/ol1',
      },
    ],
  };
  const bookMock: BookDetail = new BookDetail(bookContractMock);

  const workContractMock: IWorkContract = {
    title: '',
    authors: [
      {
        author: {
          key: '',
        },
        type: {
          key: '',
        },
      },
    ],
    key: '',
    type: {
      key: '',
    },
    covers: [],
    subjects: [],
    description: 'Description 1',
    latest_revision: 0,
    revision: 0,
    created: {
      type: '',
      value: '',
    },
    last_modified: {
      type: '',
      value: '',
    },
  };

  const workMock: Work = new Work(workContractMock);

  const bookSearchContract: IBookSearchContract = {
    author_key: ['author1'],
    author_name: ['Author1'],
    cover_edition_key: 'ol1',
    cover_i: 0,
    edition_key: [],
    isbn: [],
    key: 'ol1',
    language: [],
    number_of_pages_median: 1,
    publish_date: ['1'],
    publish_year: ['1'],
    publisher: ['Publisher1'],
    ratings_average: 0,
    seed: [],
    subject: [],
    title: 'Title1',
    title_sort: '',
    type: '',
  };

  const bookSearchMock = new Book(bookSearchContract);

  const bookSearchContract2: IBookSearchContract = {
    author_key: ['author2'],
    author_name: ['Author2'],
    cover_edition_key: 'ol2',
    cover_i: 0,
    edition_key: [],
    isbn: [],
    key: 'ol2',
    language: [],
    number_of_pages_median: 2,
    publish_date: ['2'],
    publish_year: ['2'],
    publisher: ['Publisher2'],
    ratings_average: 0,
    seed: [],
    subject: [],
    title: 'Title2',
    title_sort: '',
    type: '',
  };

  const bookSearchMock2 = new Book(bookSearchContract2);

  const bookSearchResponseContractMock: IBookSearchResponseContract = {
    docs: [bookSearchContract, bookSearchContract2],
    numFound: 2,
    numFoundExact: true,
  };

  function interceptJSON() {
    const req = httpMock.expectOne(service.jsonURL);
    expect(req.request.method).toBe('GET');
    req.flush(bookListMock);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
    service.getStaticBooks();
    interceptJSON();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get static books correctly', (done) => {
    service.books$.subscribe((books) => {
      expect(books).toEqual(bookListMock);
      done();
    });
  });

  it('should add a book to the wishList and remove it from the bookList', (done) => {
    let bookList: Book[] = [];
    let wishList: Book[] = [];

    service.books$.subscribe((books) => {
      bookList = books;
    });
    service.wishList$.subscribe((books) => {
      wishList = books;
    });

    service.addToWishList(staticBookMock);

    service.books$.subscribe((books) => {
      bookList = books;
    });

    service.wishList$.subscribe((books) => {
      wishList = books;
      done();
    });

    expect(bookList).not.toContain(staticBookMock);
    expect(wishList).toContain(staticBookMock);
  });

  it('should remove a book from the wishList and add it to the bookList', (done) => {
    let wishList: Book[] = [];
    let bookList: Book[] = [];

    service.addToWishList(staticBookMock);

    service.wishList$.subscribe((books) => {
      wishList = books;
    });

    service.books$.subscribe((books) => {
      bookList = books;
    });

    service.deleteFromWishList(staticBookMock);

    service.wishList$.subscribe((books) => {
      expect(books).not.toContain(staticBookMock);
    });

    service.books$.subscribe((books) => {
      expect(books).toContain(staticBookMock);
      done();
    });
  });

  it('should get a book by his olid', () => {
    let olid = 'ol1';

    service.getBookById(olid).subscribe((book) => {
      expect(book).toEqual(bookMock);
    });

    const req = httpMock.expectOne(`${service.url}/${olid}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(bookContractMock);
  });

  it('should get a work by his olid', () => {
    let olid = '/works/1';

    service.getWorkById(olid).subscribe((work) => {
      expect(work).toEqual(workMock);
    });

    const req = httpMock.expectOne(`${service.urlOpenLibrary}${olid}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(workContractMock);
  });

  it('should get a books by title', () => {
    let title = 'Title';

    service.getBooksByTitle(title).subscribe((books) => {
      expect(books.length).toBe(2);
      expect(books).toEqual([bookSearchMock, bookSearchMock2]);
    });

    const req = httpMock.expectOne((req) =>
      req.url.includes(service.urlSearch)
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('title')).toBe(title);
    expect(req.request.params.get('limit')).toBe('5');

    req.flush(bookSearchResponseContractMock);
  });
});
