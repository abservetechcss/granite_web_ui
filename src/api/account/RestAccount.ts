import axios from 'axios';
import { IAccount } from "./interfaces/IAccount"
import { LoginResponse } from "./response/LoginResponse"
import { injectable } from "inversify";
import "reflect-metadata";
import { ClinicianUserUpdateRequest } from './request/ClinicianUserUpdateRequest';
import { getValidationCodeRequest } from './request/getValidationCodeRequest';
import { exchangeCodeForTokenRequest } from './request/exchangeCodeForTokenRequest';
import { createUserRequest } from './request/createUserRequest';
import { getUserKeyRequest } from './request/getUserKeyRequest';
import { forgotPasswordRequest } from './request/forgotPasswordRequest';
import { forgotPasswordVerificationRequest } from './request/forgotPasswordVerificationRequest';
import { AdministrationUserUpdateRequest } from './request/AdministrationUserUpdateRequest';
import { createEPRUserRequest } from './request/CreateEPRUserRequest';
import { ClinicianUserFeesRequest } from './request/ClinicianUserFeesRequest';

@injectable()
export class RestAccount implements IAccount {

  sessionToken: string = sessionStorage.getItem("GraniteSessionToken") as string;
    
  async updateClinicianUser(request: ClinicianUserUpdateRequest, userId: string): Promise<boolean> {
  
    const { data } = await axios.put<any>(
    `${process.env.REACT_APP_GRANITE_BASE_API}v2/user/${request.user.id}`, { ...request.user },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          granitesess: this.sessionToken
        },
      },
    );

    await axios.put<any>(
      `${process.env.REACT_APP_EPR_PATIENT_BASE_API}user/ClinicTimes`, 
          { Id: request.user.id, NewClinicAppointmentMins: request.user.newClinicApptTime, FollowUpClinicAppointmentMins: request.user.followUpClinicApptTime },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            granitesess: this.sessionToken
          },
        },
      );
      
      const clinicFeeDtos = this.clinicFeesRequestConverter(request, userId);
      await axios.put<any>(
        `${process.env.REACT_APP_EPR_PATIENT_BASE_API}user/ClinicFees`, { clinicFeeDtos  },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              granitesess: this.sessionToken
            },
          },
        );
  
      return data.statusCode === 200;   

  }

  clinicFeesRequestConverter(request: ClinicianUserUpdateRequest, userId: string) : ClinicianUserFeesRequest[]{
    
    const selfPayFee: ClinicianUserFeesRequest = {
      UserId: request.user.id,
      BillingTypeId: 306,
      InsurerId: undefined,
      NewFee: request.user.selfPayNewFee,
      FollowupFee: request.user.selfPayFollowUpFee,
      CreatedBy: userId,
      UpdatedBy: userId
    }

    const embassyFee: ClinicianUserFeesRequest = {
      UserId: request.user.id,
      BillingTypeId: 309,
      InsurerId: undefined,
      NewFee: request.user.embassyNewFee,
      FollowupFee: request.user.embassyFollowUpFee,
      CreatedBy: userId,
      UpdatedBy: userId
    }

    const bupaFee: ClinicianUserFeesRequest = {
      UserId: request.user.id,
      BillingTypeId: 307,
      InsurerId: 3,
      NewFee: request.user.bupaNewFee,
      FollowupFee: request.user.bupaFollowUpFee,
      CreatedBy: userId,
      UpdatedBy: userId
    }

    const vitalityFee: ClinicianUserFeesRequest = {
      UserId: request.user.id,
      BillingTypeId: 307,
      InsurerId: 7,
      NewFee: request.user.vitalityNewFee,
      FollowupFee: request.user.vitalityFollowUpFee,
      CreatedBy: userId,
      UpdatedBy: userId
    }

    const cignaFee: ClinicianUserFeesRequest = {
      UserId: request.user.id,
      BillingTypeId: 307,
      InsurerId: 4,
      NewFee: request.user.cignaNewFee,
      FollowupFee: request.user.cignaFollowUpFee,
      CreatedBy: userId,
      UpdatedBy: userId
    }

    const wpaFee: ClinicianUserFeesRequest = {
      UserId: request.user.id,
      BillingTypeId: 307,
      InsurerId: 6,
      NewFee: request.user.wpaNewFee,
      FollowupFee: request.user.wpaFollowUpFee,
      CreatedBy: userId,
      UpdatedBy: userId
    }

    const candbFee: ClinicianUserFeesRequest = {
      UserId: request.user.id,
      BillingTypeId: 307,
      InsurerId: 2,
      NewFee: request.user.candbNewFee,
      FollowupFee: request.user.candbFollowUpFee,
      CreatedBy: userId,
      UpdatedBy: userId
    }


    let fees = new Array() as Array<ClinicianUserFeesRequest>;
    fees.push(selfPayFee);
    fees.push(embassyFee);
    fees.push(bupaFee);
    fees.push(vitalityFee);
    fees.push(cignaFee);
    fees.push(wpaFee);
    fees.push(candbFee);
    return fees;  
  };
   
  async login(user: string, password: string): Promise<LoginResponse> {

      const { data } = await axios.post<LoginResponse>(
        `${process.env.REACT_APP_GRANITE_BASE_API}auth/login`, { identifier: user, passwd: password, fcmtoken: "xxx" },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      return data;   
  }

  async sendMobileValidationCode(request: getValidationCodeRequest): Promise<any> {
    const { data } = await axios.post<any>(
      `${process.env.REACT_APP_GRANITE_BASE_API}v2/registration/send-mobile-validation-code`, { ...request },      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
         },
      },
    );

    return data.body.err ? {response: false, error: data.body.err} : {response: true, error: ''};   
  }

  async exchangeCodeForToken(request: exchangeCodeForTokenRequest) {

    const { data } = await axios.post<any>(
      `${process.env.REACT_APP_GRANITE_BASE_API}registration/exchange-code-for-token`, { ...request },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      },
    );

    return data.body.err ? {response: false, error: data.body.err} : {response: true, error: '', token: data.body.data.token};  

  }

  async createUser(request: createUserRequest, token: string): Promise<any> {

    const { data } = await axios.post<any>(
      `${process.env.REACT_APP_GRANITE_BASE_API}registration/${token}`, { ...request },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    const userRequest : createEPRUserRequest = {
      Id: data.body.user.id,
      FirstName: request.name,
      Surname: request.surname,
      Dob: undefined,
      Email: request.email,
      UserGradeId: 2,
      IsActive: true,
      IsSuperUser: false,
      DateCreated: new Date(),
      DateUpdated: new Date(),
      CreatedBy: '51245bd9-f3bd-4178-87fe-824d3063e07d',
      UpdatedBy: '51245bd9-f3bd-4178-87fe-824d3063e07d'
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
  
    return data;   
}

  async createEPRUser(request: createEPRUserRequest) : Promise<any> {
    const { data } = await axios.post<any>(
      `${process.env.REACT_APP_EPR_PATIENT_BASE_API}user`, { ...request },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    return data;   
  }

  async getUserKey(request: getUserKeyRequest) {
    const { data } = await axios.post<any>(
      `${process.env.REACT_APP_GRANITE_BASE_API}key`, { ...request },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          granitesess: this.sessionToken
        },
      },
    );

    return data.body.err ? {response: false, error: data.body.err} : {response: true, error: '', key: data.body.key};  
 }

 async forgotPassword(request: forgotPasswordRequest) {
    const { data } = await axios.post<any>(
      `${process.env.REACT_APP_GRANITE_BASE_API}auth/forgotpassword`, { ...request },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      },
    );
  }

  async forgotPasswordVerification(request: forgotPasswordVerificationRequest) {
    const { data } = await axios.put<any>(
      `${process.env.REACT_APP_GRANITE_BASE_API}auth/forgotpassword`, { ...request },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      },
    );
  }

  async updateAdministrationUser(request: AdministrationUserUpdateRequest, userId: string): Promise<void> {
    const { data } = await axios.put<any>(
      `${process.env.REACT_APP_GRANITE_BASE_API}user/${userId}`, { ...request },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          granitesess: this.sessionToken
        },
      },
    );
  }
}