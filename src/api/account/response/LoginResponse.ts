
export type LoginResponse = {
    firebaseToken: string;
    keys: {
        privateKey: string;
        publicKey: string;
    }
    patient: string;
    token: string;
    user: {
        created_at: string;
        dob: Date;
        dobMismatch: boolean; 
        documentVerified: boolean; 
        email: string;
        gmc: string;
        id: string;
        isParentAuthorised: boolean;
        isTemp: boolean;
        lastAppOpenTime: Date;
        lastOrganisationId: string;
        lastReferralEmail: string;
        mobile: string;
        name: string;
        parentUserId: string;
        surname: string;
        type: number;
        updated_at: Date;
        verified: boolean;
    }
    err: string;

  };