export type AddPracticeManagementCompanyMemberRequest = {
    dob: Date,
    name: string,
    surname: string,
    pmcId: string,
    email: string,
    isSuperUser: boolean
    organisations: {id: string, decrpytedKey: string}[]
};