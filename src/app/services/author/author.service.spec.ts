import { TestBed } from '@angular/core/testing';

import { AuthorService } from './author.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IAuthorContract } from 'src/app/interfaces/contracts/IAuthorContract';
import { Author } from 'src/app/interfaces/models/Author';

fdescribe('AuthorService', () => {
  let service: AuthorService;
  let httpMock: HttpTestingController;

  const authorContractMock: IAuthorContract = {
    source_records: [],
    personal_name: 'Author 1',
    key: 'ol1',
    type: {
      key: '',
    },
    name: 'Author 1',
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
  const authorMock: Author = new Author(authorContractMock);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorService],
    });
    service = TestBed.inject(AuthorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find an author by his olid', () => {
    let olid = '/authors/ol1';

    service.getAuthorById(olid).subscribe((author) => {
      expect(author).toEqual(authorMock);
    });

    const req = httpMock.expectOne(`${service.url}${olid}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(authorContractMock);
  });
});
