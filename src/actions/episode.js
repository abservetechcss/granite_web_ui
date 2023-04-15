export const episodePatientstatus = (payload) => ({
    type: 'EPISODEPATIENTSTATUS',
    payload,
});
export const episodePatientstatusSuccess = (payload) => ({
    type: 'EPISODEPATIENTSTATUS_SUCCESS',
    payload,
});
export const episodePatientstatusFailed = (payload) => ({
    type: 'EPISODEPATIENTSTATUS_FAILED',
    payload,
});

export const episodePrimaryConsultant = (payload) => ({
    type: 'EPISODEPRIMARYCONSULTANT',
    payload,
});
export const episodePrimaryConsultantSuccess = (payload) => ({
    type: 'EPISODEPRIMARYCONSULTANT_SUCCESS',
    payload,
});
export const episodePrimaryConsultantFailed = (payload) => ({
    type: 'EPISODEPRIMARYCONSULTANT_FAILED',
    payload,
});

export const episodeReferalsource = (payload) => ({
    type: 'EPISODEREFERALSOURCE',
    payload,
});
export const episodeReferalsourceSuccess = (payload) => ({
    type: 'EPISODEREFERALSOURCE_SUCCESS',
    payload,
});
export const episodeReferalsourceFailed = (payload) => ({
    type: 'EPISODEREFERALSOURCE_FAILED',
    payload,
});

export const episodeBillingtype = (payload) => ({
    type: 'EPISODEBILLINGTYPE',
    payload,
});
export const episodeBillingtypeSuccess = (payload) => ({
    type: 'EPISODEBILLINGTYPE_SUCCESS',
    payload,
});
export const episodeBillingtypeFailed = (payload) => ({
    type: 'EPISODEBILLINGTYPE_FAILED',
    payload,
});

export const episodeInsuranceCompany = (payload) => ({
    type: 'EPISODEINSURANCECOMPANY',
    payload,
});
export const episodeInsuranceCompanySuccess = (payload) => ({
    type: 'EPISODEINSURANCECOMPANY_SUCCESS',
    payload,
});
export const episodeInsuranceCompanyFailed = (payload) => ({
    type: 'EPISODEINSURANCECOMPANY_FAILED',
    payload,
});

export const episodeEmbassyid = (payload) => ({
    type: 'EPISODEEMBASSYID',
    payload,
});
export const episodeEmbassyidSuccess = (payload) => ({
    type: 'EPISODEEMBASSYID_SUCCESS',
    payload,
});
export const episodeEmbassyidFailed = (payload) => ({
    type: 'EPISODEEMBASSYID_FAILED',
    payload,
});

export const episodeSolicitorFirm = (payload) => ({
    type: 'EPISODESOLIITORFIRM',
    payload,
});
export const episodeSolicitorFirmSuccess = (payload) => ({
    type: 'EPISODESOLIITORFIRM_SUCCESS',
    payload,
});
export const episodeSolicitorFirmFailed = (payload) => ({
    type: 'EPISODESOLIITORFIRM_FAILED',
    payload,
});

export const episodeDiagnosis = (payload) => ({
    type: 'EPISODEDIAGNOSIS',
    payload,
});
export const episodeDiagnosisSuccess = (payload) => ({
    type: 'EPISODEDIAGNOSIS_SUCCESS',
    payload,
});
export const episodeDiagnosisFailed = (payload) => ({
    type: 'EPISODEDIAGNOSIS_FAILED',
    payload,
});

export const removeDiagnosis = (payload) => ({
    type: 'REMOVEDIAGNOSIS',
    payload,
});
export const removeDiagnosisSuccess = (payload) => ({
    type: 'REMOVEDIAGNOSIS_SUCCESS',
    payload,
});
export const removeDiagnosisFailed = (payload) => ({
    type: 'REMOVEDIAGNOSIS_FAILED',
    payload,
});

export const gpDetails = (payload) => ({
    type: 'GPDETAILS',
    payload,
});
export const gpDetailsSuccess = (payload) => ({
    type: 'GPDETAILS_SUCCESS',
    payload,
});
export const gpDetailsFailed = (payload) => ({
    type: 'GPDETAILS_FAILED',
    payload,
});

export const referalDetails = (payload) => ({
    type: 'REFERALDETAILS',
    payload,
});
export const referalDetailsSuccess = (payload) => ({
    type: 'REFERALDETAILS_SUCCESS',
    payload,
});
export const referalDetailsFailed = (payload) => ({
    type: 'REFERALDETAILS_FAILED',
    payload,
});

export const billingDetails = (payload) => ({
    type: 'BILLINGDETAILS',
    payload,
});
export const billingDetailsSuccess = (payload) => ({
    type: 'BILLINGDETAILS_SUCCESS',
    payload,
});
export const billingDetailsFailed = (payload) => ({
    type: 'BILLINGDETAILS_FAILED',
    payload,
});

export const collaboratorDetails = (payload) => ({
    type: 'COLLABORATORDETAILS',
    payload,
});
export const collaboratorDetailsSuccess = (payload) => ({
    type: 'COLLABORATORDETAILS_SUCCESS',
    payload,
});
export const collaboratorDetailsFailed = (payload) => ({
    type: 'COLLABORATORDETAILS_FAILED',
    payload,
});

export const deleteCollaborator = (payload) => ({
    type: 'DELETECOLLABORATOR',
    payload,
});
export const deleteCollaboratorSuccess = (payload) => ({
    type: 'DELETECOLLABORATOR_SUCCESS',
    payload,
});
export const deleteCollaboratorFailed = (payload) => ({
    type: 'DELETECOLLABORATOR_FAILED',
    payload,
});

export const hospitalName = (payload) => ({
    type: 'HOSPITALNAME',
    payload,
});
export const hospitalNameSuccess = (payload) => ({
    type: 'HOSPITALNAME_SUCCESS',
    payload,
});
export const hospitalNameFailed = (payload) => ({
    type: 'HOSPITALNAME_FAILED',
    payload,
});

export const episodePlan = (payload) => ({
    type: 'EPISODEPLAN',
    payload,
});
export const episodePlanSuccess = (payload) => ({
    type: 'EPISODEPLAN_SUCCESS',
    payload,
});
export const episodePlanFailed = (payload) => ({
    type: 'EPISODEPLAN_FAILED',
    payload,
});

export const episodeNotes = (payload) => ({
    type: 'EPISODENOTES',
    payload,
});
export const episodeNotesSuccess = (payload) => ({
    type: 'EPISODENOTES_SUCCESS',
    payload,
});
export const episodeNotesFailed = (payload) => ({
    type: 'EPISODENOTES_FAILED',
    payload,
});

export const planHistory = (payload) => ({
    type: 'PLANHISTORY',
    payload,
});
export const planHistorySuccess = (payload) => ({
    type: 'PLANHISTORY_SUCCESS',
    payload,
});
export const planHistoryFailed = (payload) => ({
    type: 'PLANHISTORY_FAILED',
    payload,
});

export const notesHistory = (payload) => ({
    type: 'NOTESHISTORY',
    payload,
});
export const notesHistorySuccess = (payload) => ({
    type: 'NOTESHISTORY_SUCCESS',
    payload,
});
export const notesHistoryFailed = (payload) => ({
    type: 'NOTESHISTORY_FAILED',
    payload,
});

export const switchEpisode = (payload) => ({
    type: 'SWITCHEPISODE',
    payload,
});
export const switchEpisodeSuccess = (payload) => ({
    type: 'SWITCHEPISODE_SUCCESS',
    payload,
});
export const switchEpisodeFailed = (payload) => ({
    type: 'SWITCHEPISODE_FAILED',
    payload,
});




