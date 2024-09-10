import { IWorkContract } from '../contracts/IWorkContract';
import { IWork } from '../work/IWork';

export class Work implements IWork {
  description: string | { type: string; value: string };

  constructor(workContract: IWorkContract) {
    typeof workContract.description === 'string'
      ? (this.description = workContract.description)
      : workContract?.description?.value
      ? (this.description = workContract.description.value)
      : (this.description = 'Sin descripción');
  }
}
