export interface IAuthorContract {
  source_records: string[];
  personal_name: string;
  key: string;
  type: {
    key: string;
  };
  name: string;
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
}
