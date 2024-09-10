import { IBook } from '../book/IBook';
import { IBookSearchContract } from '../contracts/IBookSearchContract';

export class Book implements IBook {
  id: string;
  title: string;
  authors: string[];
  publicationDate: string | undefined;

  constructor(bookSearchContract: IBookSearchContract) {
    this.id = bookSearchContract.cover_edition_key;
    this.title = bookSearchContract.title ?? 'Titulo no registrado';
    this.authors = bookSearchContract.author_name ?? 'Autores no registrados';
    this.publicationDate = bookSearchContract.publish_date
      ? bookSearchContract.publish_date[0]
      : '???';
  }
}
