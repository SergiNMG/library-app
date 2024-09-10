export interface IBookSearchContract {
  author_key: string[];
  author_name: string[];
  cover_edition_key: string;
  cover_i: number;
  edition_key: string[];
  isbn: string[];
  key: string;
  language: string[];
  number_of_pages_median: number;
  publish_date: string[] | undefined;
  publish_year: string[];
  publisher: string[];
  ratings_average: number;
  seed: string[];
  subject: string[];
  title: string;
  title_sort: string;
  type: string;
}
