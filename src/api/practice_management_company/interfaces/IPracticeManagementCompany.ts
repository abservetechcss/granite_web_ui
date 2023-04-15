import { GetPracticeManagementCompanyResponse } from "../response/GetPracticeManagementCompanyResponse"
import { AddPracticeManagementCompanyMemberRequest } from "../../practice_management_company/request/AddPracticeManagementCompanyMemberRequest"
import { EditPracticeManagementCompanyRequest } from "../request/EditPracticeManagementCompanyRequest";

export interface IPracticeManagementCompany {
  getPraticeManagmentCompany(): Promise<GetPracticeManagementCompanyResponse>;
  editPracticeManagmentCompany(request: EditPracticeManagementCompanyRequest, practiceManagementCompanyId: string): Promise<any>;
  addPraticeManagementCompanyMember(request: AddPracticeManagementCompanyMemberRequest, user: any): Promise<void>
  }