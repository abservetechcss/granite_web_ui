type PracticeManagementCompany = {
    name: string;
  };

export type GetPracticeManagementCompanyResponse = {
    statusCode: number
    data: string
    body : {
        practiceManagementCompany: PracticeManagementCompany
        err: string     }
  };