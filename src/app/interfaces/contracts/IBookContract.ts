interface IDatetimeContract {
  type: string;
  value: string;
}

interface ITextContract {
  type: string;
  value: string;
}

interface IKeyContract {
  key: string;
}

interface IAuthorContract {
  key: string;
}

interface IWorkContract {
  key: string;
}

interface IIdentifiersContract {
  goodreads: string[];
  librarything: string[];
}

export interface IBookContract {
  authors: IAuthorContract[];
  classifications: Record<string, any>;
  covers: number[];
  created: IDatetimeContract;
  description: ITextContract;
  first_sentence: ITextContract;
  identifiers: IIdentifiersContract;
  isbn_10: string[];
  isbn_13: string[];
  key: string;
  languages: IKeyContract[];
  last_modified: IDatetimeContract;
  latest_revision: number;
  local_id: string[];
  number_of_pages: number;
  publish_date: string;
  publishers: string[];
  revision: number;
  source_records: string[];
  title: string;
  type: IKeyContract;
  works: IWorkContract[];
}
