import { createUserRequest } from "../request/createUserRequest";
import { exchangeCodeForTokenRequest } from "../request/exchangeCodeForTokenRequest";
import { forgotPasswordRequest } from "../request/forgotPasswordRequest";
import { forgotPasswordVerificationRequest } from "../request/forgotPasswordVerificationRequest";
import { getUserKeyRequest } from "../request/getUserKeyRequest";
import { getValidationCodeRequest } from "../request/getValidationCodeRequest";
import { ClinicianUserUpdateRequest } from "../request/ClinicianUserUpdateRequest";
import { AdministrationUserUpdateRequest } from "../request/AdministrationUserUpdateRequest";
import { createEPRUserRequest } from "../request/CreateEPRUserRequest";

export interface IAccount {
    login(user: string, password: string): void;
    updateClinicianUser(user: ClinicianUserUpdateRequest, userId: string): any
    updateAdministrationUser(request: AdministrationUserUpdateRequest, userId: string): any
    sendMobileValidationCode(request: getValidationCodeRequest): any
    exchangeCodeForToken(request: exchangeCodeForTokenRequest): any
    createUser(request: createUserRequest, token: string): any
    createEPRUser(request: createEPRUserRequest): any
    getUserKey(request: getUserKeyRequest): any
    forgotPassword(request: forgotPasswordRequest): any
    forgotPasswordVerification(request: forgotPasswordVerificationRequest): any
  }