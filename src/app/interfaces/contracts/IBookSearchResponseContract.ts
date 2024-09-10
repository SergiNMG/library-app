import { IBookSearchContract } from './IBookSearchContract';

export interface IBookSearchResponseContract {
  docs: IBookSearchContract[];
  numFound: number;
  numFoundExact: boolean;
}
