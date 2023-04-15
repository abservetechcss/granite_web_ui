export type ClinicianUserFeesRequest = {

        UserId: string,
        BillingTypeId: number,
        InsurerId?: number;
        NewFee?: Number;
        FollowupFee?: Number;
        CreatedBy: string;
        UpdatedBy: string;
    }
 