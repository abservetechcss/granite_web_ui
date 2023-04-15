import { takeEvery, all, call, put, takeLeading, StrictEffect } from "redux-saga/effects";
import {
    episodePatientstatusSuccess,
    episodePatientstatusFailed,
    episodePrimaryConsultantSuccess,
    episodePrimaryConsultantFailed,
    episodeReferalsourceSuccess,
    episodeReferalsourceFailed,
    episodeBillingtypeSuccess,
    episodeBillingtypeFailed,
    episodeInsuranceCompanySuccess,
    episodeInsuranceCompanyFailed,
    episodeEmbassyidSuccess,
    episodeEmbassyidFailed,
    episodeSolicitorFirmSuccess,
    episodeSolicitorFirmFailed,
    episodeDiagnosisSuccess,
    episodeDiagnosisFailed,
    removeDiagnosisSuccess,
    removeDiagnosisFailed,
    gpDetailsSuccess,
    gpDetailsFailed,
    referalDetailsSuccess,
    referalDetailsFailed,
    billingDetailsSuccess,
    billingDetailsFailed,
    collaboratorDetailsSuccess,
    collaboratorDetailsFailed,
    deleteCollaboratorSuccess,
    deleteCollaboratorFailed,
    hospitalNameSuccess,
    hospitalNameFailed,
    episodePlanSuccess,
    episodePlanFailed,
    episodeNotesSuccess,
    episodeNotesFailed,
    planHistorySuccess,
    planHistoryFailed,
    notesHistorySuccess,
    notesHistoryFailed,
    switchEpisodeSuccess,
    switchEpisodeFailed,
    episodePlan,
    episodeNotes,
} from "./episode";
import { AxiosError, AxiosResponse } from "axios";
import { api, api_patient } from "../routes/api";
import { episodePatient } from "./layouts";

const axios = require('axios');

function* episodePatientstatusfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/PatientStatus"
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(episodePatientstatusSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(episodePatientstatusFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(episodePatientstatusFailed(err.response));
    }
}

function* episodePrimaryConsultantfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/PrimaryConsultant/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(episodePrimaryConsultantSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(episodePrimaryConsultantFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(episodePrimaryConsultantFailed(err.response));
    }
}

function* episodeReferalsourcefn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/ReferralSource"
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(episodeReferalsourceSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(episodeReferalsourceFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(episodeReferalsourceFailed(err.response));
    }
}

function* episodeBillingtypefn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/BillingType"
        );
        //console.log(response);
        // debugger;
        switch (response.status) {
            case 200:
                const data = JSON.parse(response.data);
                yield put(episodeBillingtypeSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(episodeBillingtypeFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(episodeBillingtypeFailed(err.response));
    }
}

function* episodeInsuranceCompanyfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/InsuranceCompany"
        );
        //console.log(response);
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(episodeInsuranceCompanySuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(episodeInsuranceCompanyFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(episodeInsuranceCompanyFailed(err.response));
    }
}

function* episodeEmbassyidfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/Embassy"
        );
        //console.log(response);
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(episodeEmbassyidSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(episodeEmbassyidFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(episodeEmbassyidFailed(err.response));
    }
}

function* episodeSolicitorFirmfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/SolicitorFirm"
        );
        console.log(response);
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(episodeSolicitorFirmSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(episodeSolicitorFirmFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(episodeSolicitorFirmFailed(err.response));
    }
}

function* episodeDiagnosisfn(action) {
    try {
        const response = yield call(
            api_patient.post,
            "AddPatientEpisodeDiagnosis", action.payload
        );
        //console.log(response);
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(episodeDiagnosisSuccess(data));
                yield put({type:"ADDDIAGNOSIS", payload: "5f055ce5-3015-4531-a202-85f1fb98d9a5" })
                break;
            case 204:
                const data1 = response.data;
                yield put(episodeDiagnosisSuccess(data1));
                break;
            case 400:
                const err = response.data;
                yield put(episodeDiagnosisFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(episodeDiagnosisFailed(err.response));
    }
}

function* removeDiagnosisfn(action) {
    try {
        const response = yield call(
            api_patient.delete,
            "PatientEpisodeDiagnosis?diagnosisId=" + action.payload.value
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(removeDiagnosisSuccess(action.payload));
                break;
            case 204:
                const data1 = response.data;
                yield put(removeDiagnosisSuccess(action.payload));
                break;
            case 400:
                const err = response.data;
                yield put(removeDiagnosisFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(removeDiagnosisFailed(err.response));
    }
}

function* gpDetailsfn(action) {
    try {
        const response = yield call(
            api_patient.put,
            "GPDetails", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(gpDetailsSuccess(data));
                yield put(episodePatient(action.payload.patientId));
                //console.log(response);
                break;
            case 204:
                const data1 = response.data;
                yield put(gpDetailsSuccess(data1));
                yield put(episodePatient(action.payload.patientId));
                //console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(gpDetailsFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(gpDetailsFailed(err.response));
    }
}

function* referalDetailsfn(action) {
    try {
        const response = yield call(
            api_patient.put,
            "ReferralInfo", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(referalDetailsSuccess(data));
                //console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(referalDetailsFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(referalDetailsFailed(err.response));
    }
}

function* billingDetailsfn(action) {
    try {
        const response = yield call(
            api_patient.post,
            "Billing", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(billingDetailsSuccess(data));
                yield put(episodePatient(action.payload.patientId));
                //console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(billingDetailsFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(billingDetailsFailed(err.response));
    }
}

function* collaboratorDetailsfn(action) {
    try {
        let a = JSON.parse(JSON.stringify(action.payload));
        delete a.collaboratoredit;
        const response = yield call(
            api_patient.post,
            "Collaborator", a
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                if(action.payload.collaboratoredit){
                    data.collaboratoredit = true
                }
                yield put(collaboratorDetailsSuccess(data));
                // let a = {
                //     ...data,
                // }
                // yield put(collaboratorDetailsSuccess(a));
                // yield put(episodePatient(action.payload.episodeId));
                //console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(collaboratorDetailsFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(collaboratorDetailsFailed(err.response));
    }
}

function* deleteCollaboratorfn(action) {
    try {
        const response = yield call(
            api_patient.delete,
            "Collaborator?collaboratorId=" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                // yield put(collaboratorDetailsSuccess(data));
                yield put(deleteCollaboratorSuccess(action.payload));
                //console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(deleteCollaboratorFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(deleteCollaboratorFailed(err.response));
    }
}

function* hospitalNamefn(action) {
    try {
        const response = yield call(
            api_patient.put,
            "PatientStatus", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(hospitalNameSuccess(action.payload));
                break;
            case 204:
                const data1 = response.data;
                yield put(hospitalNameSuccess(action.payload));
                break;
            case 400:
                const err = response.data;
                yield put(hospitalNameFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(hospitalNameFailed(err.response));
    }
}

function* episodePlanfn(action) {
    try {
        const response = yield call(
            api_patient.get,
            "PlanHistory/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(episodePlanSuccess(data));
                //console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(episodePlanFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(episodePlanFailed(err.response));
    }
}

function* episodeNotesfn(action) {
    try {
        const response = yield call(
            api_patient.get,
            "NotesHistory/" + action.payload, action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(episodeNotesSuccess(data));
                //console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(episodeNotesFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(episodeNotesFailed(err.response));
    }
}

function* planHistoryfn(action) {
    try {
        const response = yield call(
            api_patient.post,
            "AddPlan", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(planHistorySuccess(data));
                yield put(episodePlan(action.payload.episodeId));
                //console.log(response);
                break;
            case 204:
                const data1 = response.data;
                yield put(planHistorySuccess(data1));
                yield put(episodePlan(action.payload.episodeId));
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(planHistoryFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(planHistoryFailed(err.response));
    }
}

function* notesHistoryfn(action) {
    try {
        const response = yield call(
            api_patient.post,
            "AddNotes", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(notesHistorySuccess(data));
                yield put(episodeNotes(action.payload.episodeId));
                //console.log(response);
                break;
            case 204:
                const data1 = response.data;
                yield put(notesHistorySuccess(data1));
                yield put(episodeNotes(action.payload.episodeId));
                //console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(notesHistoryFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(notesHistoryFailed(err.response));
    }
}

function* switchEpisodefn(action) {
    try {
        const response = yield call(
            api_patient.get,
            "ListEpisodes/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(switchEpisodeSuccess(data));
                //console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(switchEpisodeFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(switchEpisodeFailed(err.response));
    }
}


function* episodeTitleWatcher() {
    yield takeEvery("EPISODEPATIENTSTATUS", episodePatientstatusfn);
    yield takeEvery("EPISODEPRIMARYCONSULTANT", episodePrimaryConsultantfn);
    yield takeEvery("EPISODEREFERALSOURCE", episodeReferalsourcefn);
    yield takeEvery("EPISODEBILLINGTYPE", episodeBillingtypefn);
    yield takeEvery("EPISODEINSURANCECOMPANY", episodeInsuranceCompanyfn);
    yield takeEvery("EPISODEEMBASSYID", episodeEmbassyidfn);
    yield takeEvery("EPISODESOLIITORFIRM", episodeSolicitorFirmfn);
    yield takeEvery("EPISODEDIAGNOSIS", episodeDiagnosisfn);
    yield takeEvery("REMOVEDIAGNOSIS", removeDiagnosisfn);
    yield takeEvery("GPDETAILS", gpDetailsfn);
    yield takeEvery("REFERALDETAILS", referalDetailsfn);
    yield takeEvery("BILLINGDETAILS", billingDetailsfn);
    yield takeEvery("COLLABORATORDETAILS", collaboratorDetailsfn);
    yield takeEvery("DELETECOLLABORATOR", deleteCollaboratorfn);
    yield takeEvery("HOSPITALNAME", hospitalNamefn);
    yield takeEvery("EPISODEPLAN", episodePlanfn);
    yield takeEvery("EPISODENOTES", episodeNotesfn);
    yield takeEvery("PLANHISTORY", planHistoryfn);
    yield takeEvery("NOTESHISTORY", notesHistoryfn);
    yield takeEvery("SWITCHEPISODE", switchEpisodefn);
}

export default function* episode() {
    yield all([episodeTitleWatcher()]);
}
