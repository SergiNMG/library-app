import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

fdescribe('ErrorInterceptorInterceptor', () => {
  let httpMock: HttpTestingController;
  let routerMock: Router;
  let httpClient: HttpClient;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ErrorInterceptor,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should navigate to /books on 404 error', () => {
    httpClient.get('/test404').subscribe(
      () => fail('should have failed with a server error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
      }
    );

    const req = httpMock.expectOne('/test404');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });

    expect(routerMock.navigate).toHaveBeenCalledWith(['/books']);
  });
});
