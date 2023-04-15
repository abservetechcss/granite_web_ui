import axios from 'axios';
import { IPracticeManagementCompany } from "./interfaces/IPracticeManagementCompany"
import { injectable } from "inversify";
import "reflect-metadata";
import { GetPracticeManagementCompanyResponse } from './response/GetPracticeManagementCompanyResponse';
import { AddPracticeManagementCompanyMemberRequest } from './request/AddPracticeManagementCompanyMemberRequest';
import { EditPracticeManagementCompanyRequest } from './request/EditPracticeManagementCompanyRequest';
import { createEPRUserRequest } from '../account/request/CreateEPRUserRequest';

@injectable()
export class RestPracticeManagementCompany implements IPracticeManagementCompany {

  sessionToken: string = sessionStorage.getItem("GraniteSessionToken") as string

  async getPraticeManagmentCompany(): Promise<GetPracticeManagementCompanyResponse> {
    try { 
      const { data } = await axios.get<GetPracticeManagementCompanyResponse>(
          `${process.env.REACT_APP_GRANITE_BASE_API}/practicemanagementcompany`,
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

  async addPraticeManagementCompanyMember(request: AddPracticeManagementCompanyMemberRequest, user: any): Promise<any>{
  
    try { 
      const { data } = await axios.post<any>(
          `${process.env.REACT_APP_GRANITE_BASE_API}/practicemanagementcompany/member`, { ...request },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              granitesess: this.sessionToken
            },
          },
        );

        const userRequest : createEPRUserRequest = {
          Id: data.body.user.id,
          FirstName: data.body.user.name,
          Surname: data.body.user.surname,
          Dob: data.body.user.dob,
          Email: data.body.user.email,
          UserGradeId: 7,
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
       
        for (const organisaation of request.organisations) {  
          await axios.post(`${process.env.REACT_APP_EPR_PATIENT_BASE_API}organisation/user?organisationId=${organisaation.id}&UserId=${data.body.user.id}`,{},
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async editPracticeManagmentCompany(request: EditPracticeManagementCompanyRequest, practiceManagementCompanyId: string): Promise<any> {
    try { 
      const { data } = await axios.put<any>(
          `${process.env.REACT_APP_GRANITE_BASE_API}practicemanagementcompany/${practiceManagementCompanyId}`, { ...request },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              granitesess: this.sessionToken
            },
          },
        );
          
      return data.body.err ? false : true;
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
}