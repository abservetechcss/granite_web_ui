import { AddOrganisationMemberRequest } from "../request/AddOrganisationMemberRequest";
import { CreateOrganisationRequest } from "../request/CreateOrganisationRequest";
import { EditOrganisationRequest } from "../request/EditOrganisationRequest";
import { GetOrganisationsResponse } from "../response/GetOrganisationsResponse";

export interface IOrganisation {
    getAllOrganisations(): Promise<GetOrganisationsResponse>;
    createOrganisation(request: CreateOrganisationRequest, userId: string): Promise<any>;
    addOrganisationMember(request: AddOrganisationMemberRequest, organisationId: string, user: any): Promise<any>;
    getRoles(organisationId: string): Promise<any>;
    editOrganisation(request: EditOrganisationRequest, organisationId: string): Promise<any>;
    getOrganisation(organisationId: string): Promise<any>;
    getOrganisationMember(organisationId: string, userId: string): Promise<any>;
  }