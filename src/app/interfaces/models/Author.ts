import { IAuthor } from '../author/IAuthor';
import { IAuthorContract } from '../contracts/IAuthorContract';

export class Author implements IAuthor {
  personal_name: string;
  name: string;

  constructor(authorContract: IAuthorContract) {
    this.personal_name = authorContract.personal_name;
    this.name = authorContract.name;
  }
}
