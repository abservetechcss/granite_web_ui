export type createEPRUserRequest = {
    Id: string
    FirstName: string,
    Surname: string,
    Dob?: Date,
    Email: string,
    UserGradeId: number,
    IsActive: boolean,
    IsSuperUser: boolean,
    DateCreated: Date,
    DateUpdated: Date,
    CreatedBy: string,
    UpdatedBy: string,
};