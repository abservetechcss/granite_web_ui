export type ClinicianUserUpdateRequest = {
    user: {
        id: string,
        memberId: string,
        name: string;
        surname: string;
        dob: string;
        mobile: string;
        email: string;
        gmcNumber?: string;
        superUser: boolean;
        specialties?: Array<number>
        subSpecialties?: Array<number>
        hospitals?: Array<number>
        newClinicApptTime?: number,
        followUpClinicApptTime?: number,  
        selfPayNewFee?: number,     
        selfPayFollowUpFee?: number,     
        embassyNewFee?: number,     
        embassyFollowUpFee?: number,
        bupaNewFee?: number,     
        bupaFollowUpFee?: number,
        vitalityNewFee?: number,     
        vitalityFollowUpFee?: number,
        cignaNewFee?: number,     
        cignaFollowUpFee?: number,
        wpaNewFee?: number,
        wpaFollowUpFee?: number,
        candbNewFee?: number,
        candbFollowUpFee?: number
    }
  };