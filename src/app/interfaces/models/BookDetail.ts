import { IBookDetail } from '../book/IBookDetail';
import { IBookContract } from '../contracts/IBookContract';

export class BookDetail implements IBookDetail {
  title: string;
  description: string[];
  number_of_pages: number;
  publish_date: string;
  publishers: string[];
  authors: string[];
  works: string[];

  constructor(bookContract: IBookContract) {
    this.title = bookContract?.title;
    this.description =
      bookContract.works.map((work) => work.key) || 'Sin descripción';
    this.number_of_pages = bookContract?.number_of_pages || 0;
    this.publish_date = bookContract?.publish_date || '???';
    this.publishers = bookContract?.publishers || ['Desconocida'];
    this.authors = bookContract?.authors?.map((author) => author.key) || [];
    this.works = bookContract?.works?.map((work) => work.key);
  }
}
