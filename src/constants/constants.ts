export enum MemberType{
    Administrator,
    Clinician,

}

export enum StringConstants{
    Empty = ""
}

export enum UploadType{
    Document,
    Multimedia,
    Files,
    OpNote,
}

export const DocumentCategoriesMap =  [ 
 
        {id: 1, text: "Clinic letter"},
        {id: 2, text: "Operation note"},
        {id: 3, text: "Results"},
        {id: 4, text: "Referral letter - outgoing"},
        {id: 5, text: "Referral letter - incoming"},
        {id: 6, text: "MDT Form"},
        {id: 7, text: "Other Correspondence"},
]

export enum DocumentCategories {
    ReferralLetterOutgoing,
    ReferralLetterIncoming,
    ClinicLetter,
    OperationNote,
    Result,
    MDTForm,
    OtherCorrespondence
}

export const DocumentsDirectory = "Correspondence";
export const FormsDirectory = "Forms";
export const ResultsDirectory = "Results";
export const ProceduresDirectory = "Procedures";
export const MultimediaDirectory = "Multimedia";
