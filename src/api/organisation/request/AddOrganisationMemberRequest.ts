export type AddOrganisationMemberRequest = {
    name: string,
    surname: string,
    email: string,
    roleId: string,
    key: string,
    isSuperUser: boolean,
    type: number
}