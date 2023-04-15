export type CreateOrganisationRequest = {
    id: string,
    address1: string,
    address2: string,
    city: string,
    name: string,
    postcode: string,
    type: string,
    practicemanagementkey: string, 
    systemType: number,
    industryType: number,
    organisationType?: string,
    created_at: Date,
    updated_at: Date,

}