interface IDescriptionContract {
  type: string;
  value: string;
}

export interface IWorkContract {
  title: string;
  authors: [
    {
      author: {
        key: string;
      };
      type: {
        key: string;
      };
    }
  ];
  key: string;
  type: {
    key: string;
  };
  covers: number[];
  subjects: string[];
  description: IDescriptionContract | string;
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
