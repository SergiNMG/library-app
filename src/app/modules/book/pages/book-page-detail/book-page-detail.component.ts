import { Component, Input, OnInit } from '@angular/core';
import { Author } from 'src/app/interfaces/models/Author';
import { BookDetail } from 'src/app/interfaces/models/BookDetail';
import { Work } from 'src/app/interfaces/models/Work';
import { AuthorService } from 'src/app/services/author/author.service';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-page-detail',
  templateUrl: './book-page-detail.component.html',
  styleUrls: ['./book-page-detail.component.scss'],
})
export class BookPageDetailComponent implements OnInit {
  bookSelected: BookDetail | undefined = {} as BookDetail;
  author: Author | undefined = {} as Author;
  work: Work | undefined = {} as Work;
  authorList: Author[] = [];
  workList: Work[] = [];
  loading!: boolean;
  @Input() olid!: string;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) {}

  ngOnInit() {
    this.getBookByOlId(this.olid);
  }

  getBookByOlId(olid: string) {
    this.loading = true;
    this.bookService.getBookById(olid).subscribe({
      next: (bookSelected: BookDetail) => {
        this.bookSelected = bookSelected;
        this.getAuthorsFromBook(this.bookSelected);
        this.getWorkOlidFromBook(this.bookSelected);
        this.loading = false;
      },
      error: (error) => console.error('Error al obtener el libro', error),
    });
  }

  getAuthorByOlid(authorOlid: string) {
    this.authorService.getAuthorById(authorOlid).subscribe({
      next: (author: Author) => {
        this.author = author;
        this.authorList?.push(this.author);
      },
      error: (error) => console.error('Error al obtener el autor', error),
    });
  }

  getWorkByOlid(workOlid: string) {
    this.bookService.getWorkById(workOlid).subscribe({
      next: (work: Work) => {
        this.work = work;
        this.workList?.push(this.work);
      },
      error: (error) => console.error('Error al obtener la obra', error),
    });
  }

  private getAuthorsFromBook(book: BookDetail) {
    book.authors.forEach((author) => {
      this.getAuthorByOlid(author);
    });
  }

  private getWorkOlidFromBook(book: BookDetail) {
    book.works.forEach((work) => {
      this.getWorkByOlid(work);
    });
  }
}
