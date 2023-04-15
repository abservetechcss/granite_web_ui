import axios from 'axios';
import { IOrganisation } from "./interfaces/IOrganisation"
import { injectable } from "inversify";
import "reflect-metadata";
import { GetOrganisationsResponse } from './response/GetOrganisationsResponse';
import { CreateOrganisationRequest } from './request/CreateOrganisationRequest';
import { AddOrganisationMemberRequest } from './request/AddOrganisationMemberRequest';
import { EditOrganisationRequest } from './request/EditOrganisationRequest';
import { createEPRUserRequest } from '../account/request/CreateEPRUserRequest';

@injectable()
export class RestOrganisation implements IOrganisation {

  sessionToken: string = sessionStorage.getItem("GraniteSessionToken") as string

  async createOrganisation(request: CreateOrganisationRequest, userId: string): Promise<any> {

    const orgType = request.organisationType === "Private Practice" ? "organisation" : "practicemanagementcompany";
    try { 
        const { data } = await axios.post(`${process.env.REACT_APP_GRANITE_BASE_API}${orgType}`, {...request},
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              granitesess: this.sessionToken
            },
          },
        );
        

        if(request.organisationType === "Private Practice"){
            request.id = data.body.organisation.id;
            await axios.post(`${process.env.REACT_APP_EPR_PATIENT_BASE_API}organisation`, {...request},
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                granitesess: this.sessionToken
              },
            },
          );

             await axios.post(`${process.env.REACT_APP_EPR_PATIENT_BASE_API}organisation/user?organisationId=${request.id}&UserId=${userId}`,{},
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                granitesess: this.sessionToken
              },
            },
          );
        }

        return data.body.err ? false : true;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllOrganisations(): Promise<GetOrganisationsResponse> {
    try { 
      const { data } = await axios.get<GetOrganisationsResponse>(
          `${process.env.REACT_APP_GRANITE_BASE_API}v2/organisation`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              granitesess: this.sessionToken
            },
          },
        );

      if(data.body.err)
        throw new TypeError(`Error retrieving organisations ${data.body.err}`);
          
      return data;   
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addOrganisationMember(request: AddOrganisationMemberRequest, organisationId: string, user: any): Promise<any> {
    try { 
      const { data } = await axios.post(`${process.env.REACT_APP_GRANITE_BASE_API}v3/organisation/${organisationId}/member`, {...request},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            granitesess: this.sessionToken
          },
        },
      );

      if(data.body.newUser){
        
        const userRequest : createEPRUserRequest = {
          Id: data.body.userId,
          FirstName: request.name,
          Surname: request.surname,
          Dob: undefined,
          Email: request.email,
          UserGradeId: 2,
          IsActive: true,
          IsSuperUser: false,
          DateCreated: new Date(),
          DateUpdated: new Date(),
          CreatedBy: user.id,
          UpdatedBy: user.id
        }
        
        await axios.post<any>(
          `${process.env.REACT_APP_EPR_PATIENT_BASE_API}user`, { ...userRequest },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              granitesess: this.sessionToken
            },
          },
        );
      }

      await axios.post(`${process.env.REACT_APP_EPR_PATIENT_BASE_API}organisation/user?organisationId=${organisationId}&UserId=${data.body.userId}`,{},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          granitesess: this.sessionToken
        },
      },
    );
      return data.body.err ? false : true;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

  async getRoles(organisationId: string): Promise<any> {
    try { 
      const { data } = await axios.get(`${process.env.REACT_APP_GRANITE_BASE_API}role/${organisationId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            granitesess: this.sessionToken
          },
        },
      );
      return {success: data.body.err ? false: true, roles: data.body.roles ? data.body.roles : []}
  }
  catch (error) {
    console.log(error);
    throw error;
  }

  }

  async editOrganisation(request: EditOrganisationRequest, organisationId: string): Promise<any> {
    try { 
      const { data } = await axios.put(`${process.env.REACT_APP_GRANITE_BASE_API}organisation/${organisationId}`, {...request},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            granitesess: this.sessionToken
          },
        },
      );
      return {success: data.body.err ? false : true}
  }
  catch (error) {
    console.log(error);
    throw error;
  }

}

async getOrganisation(organisationId: string): Promise<any> {
  try { 
    const { data } = await axios.get(`${process.env.REACT_APP_GRANITE_BASE_API}v3/organisation/${organisationId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          granitesess: this.sessionToken
        },
      },
    );
    return data.body.organisation;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}
async getOrganisationMember(organisationId: string, userId: string): Promise<any> {
  try { 
    const { data } = await axios.get(`${process.env.REACT_APP_GRANITE_BASE_API}/organisation/${organisationId}/user/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          granitesess: this.sessionToken
        },
      },
    );
    return data.body.member;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}
} 
