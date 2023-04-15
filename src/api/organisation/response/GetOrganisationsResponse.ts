type Organisation = {
    name: string;
    id: string;
  };

export type GetOrganisationsResponse = {
    statusCode: number
    data: string
    body : {
        organisations: Organisation[]
        err: string     }
  };