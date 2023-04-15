import { takeEvery, all, call, put } from "redux-saga/effects";
import {
    patientSuccess,
    patientFailed,
    searchPatientSuccess,
    searchPatientFailed,
    demographicPatientSuccess,
    demographicPatientFailed,
    episodePatientSuccess,
    episodePatientFailed,
    demographicPatientPutSuccess,
    demographicPatientPutFailed,
    eventsPatient,
    eventsPatientSuccess,
    eventsPatientFailed,
    primaryConsultantSuccess,
    primaryConsultantFailed,
    outPatientApptFailed,
    outPatientApptSuccess,
    operationSuccess,
    operationFailed,
    outPatientProcedureSuccess,
    outPatientProcedureFailed,
    inpatientVisitFailed,
    inpatientVisitSuccess,
    customEpisodeDiagnosisSuccess,
    customEpisodeDiagnosisFailed,
    selectEpisodeSuccess,
    selectEpisodeFailed,
    addEpisodeSuccess,
    addEpisodeFailed,
    selectEpisode,
    demographicPatient,
    episodePatient,
    getEvent1Success,
    getEvent1Failed,
    getEvent2Success,
    getEvent2Failed,
    getEvent3Success,
    getEvent3Failed,
    getEvent4Success,
    getEvent4Failed,
    updateinpatientVisitSuccess,
    updateinpatientVisitFailed,
    updateoperationSuccess,
    updateoperationFailed,
    updateoutPatientProcedureSuccess,
    updateoutPatientProcedureFailed,
    updateoutPatientApptSuccess,
    updateoutPatientApptFailed,
    getClinicAppointmentMinuts,
    getClinicAppointmentMinutsSuccess,
    getClinicFeeSuccess,
    getClinicFeeFailed,
    addhospitalSuccess,
    addhospitalFailed,
    getlengthofstaySuccess,
    getlengthofstayFailed,
    eventdeletereason,
    eventdeletereasonSuccess,
    eventdeletereasonFailed,
    deleteEventSuccess,
    deleteEventFailed,
} from "./layouts";
import { layoutEdit } from './global';
import { episodePlan, episodeNotes, switchEpisode, episodeDiagnosis } from './episode';
import { toast } from 'react-toastify';
import { api, api_event, api_patient } from "../routes/api";

function* patientfn(action) {
    // debugger;
    try {
        const response = yield call(
            api_patient.post,
            "Patient", action.payload
        );
        switch (response.status) {
            case 200:
                toast.success("success", {
                    position: toast.POSITION.TOP_CENTER,
                });
                const data = response;
                data.status = response.status;
                //console.log(response);
                yield put(patientSuccess(data));
                yield put(demographicPatient(data.data.patientId));
                yield put(episodePatient(data.data.patientId));
                break;
            case 400:
                toast.error("Error! Try after some time", {
                    position: toast.POSITION.TOP_CENTER,
                });
                const err = response.data;
                err.status = response.status;
                yield put(patientFailed(err));
                break;

            default:
        }
    }
    catch (error) {
        const err = error
        yield put(patientFailed(err.response));
    }
}

function* searchPatientfn(action) {
    try {
        const response = yield call(
            api_patient.get, "SearchPatient/" + action.payload.orgId + "?contains=" + action.payload.data
            // api_patient.get, "SearchPatient?contains=" + action.payload
        );
        // eslint-disable-next-line default-case
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(searchPatientSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(searchPatientFailed(err));

        }
    }
    catch (error) {
        const err = error
        yield put(searchPatientFailed(err.response));
    }
}

function* DemographicPatientfn(action) {
    try {
        const response = yield call(
            api_patient.get, "Demographic/" + action.payload
        );
        //console.log(action.payload);
        // eslint-disable-next-line default-case
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(demographicPatientSuccess(data));
                yield put(layoutEdit(true))
                let a = {
                    id: data.patientId,
                    firstName: data.patientDemographic.firstName,
                    surname: data.patientDemographic.surname
                }
                yield put({ type: 'PATIENTADD', payload: a });
                let c = localStorage.getItem('currentpatients');
                if(data.patientId != c){
                    yield put({ type: 'EVENTSPATIENT_SUCCESS', payload: [] });
                }
                yield put({ type: 'CURRENTPATIENT', payload: data.patientId });

                break;
            case 400:
                const err = response.data;
                yield put(demographicPatientFailed(err));

        }
    }
    catch (error) {
        const err = error
        yield put(demographicPatientFailed(err.response));
    }
}

function* getClinicAppointmentMinutsfn(action) {
    try {
        const response = yield call(
            api_event.get, "User/GetClinicAppointmentMinuts/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(getClinicAppointmentMinutsSuccess(data));
                break;
            case 400:
                const err = response.data;
                break;
            default:
        }
    }
    catch (error) {
        const err = error
    }
}

function* episodePatientfn(action) {
    try {
        const response = yield call(
            api_patient.get, "Episode/" + action.payload
        );
        // eslint-disable-next-line default-case
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(episodePatientSuccess(data));
                yield put(eventsPatient(data.episodeId));
                yield put(episodePlan(data.episodeId));
                yield put(episodeNotes(data.episodeId));
                yield put(switchEpisode(data.patientId));
                yield put(getClinicAppointmentMinuts(data.patientEpisode.primaryConsultantUserId));
                let obj = {
                    value:data.patientEpisode.billingTypeId, 
                    id: data.patientEpisode.billingTypeId,
                    label: data.patientEpisode.billingTypeName
                }
                yield put({type:"BILLINGTYPE",payload:obj});
                if(data.patientEpisode.billingTypeId == 307){
                    let obj1 = {
                        insurerId:data.patientEpisode.billingInsuranceCompanyId, 
                        insurerName: data.patientEpisode.billingInsuranceCompanyName,
                        insurerLink: data.patientEpisode.billingInsuranceCompanyLink
                    }
                    yield put({type:"INSURERNAME",payload:obj1});
                }
                let c = {
                    userId: data.patientEpisode.primaryConsultantUserId,
                    billingTypeId: data.patientEpisode.billingTypeId,
                    insurerId : data.patientEpisode.billingTypeId == 307 ? data.patientEpisode.billingInsuranceCompanyId : ""
                }
                yield put({type: "GETCLINICFEE",payload: c})
                yield put ({type: "CURRENTPRIMARYCONSULTANT",payload: data.patientEpisode.primaryConsultantUserId})
                break;
            case 400:
                const err = response.data;
                yield put(episodePatientFailed(err));

        }
    }
    catch (error) {
        const err = error
        yield put(episodePatientFailed(err.response));
    }
}

function* eventsPatientfn(action) {
    try {
        const response = yield call(
            api_event.get, "Events/" + action.payload
        );
        // eslint-disable-next-line default-case
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(eventsPatientSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventsPatientFailed(err));

        }
    }
    catch (error) {
        const err = error
        yield put(eventsPatientFailed(err.response));
    }
}

function* demographicPatientPutfn(action) {
    try {
        const response = yield call(
            api_patient.put, "Demographic", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response;
                toast.success("Demographic data updated", {
                    position: toast.POSITION.TOP_CENTER,
                });
                //console.log(response);
                yield put(demographicPatientPutSuccess(data));
                yield put(demographicPatient(action.payload.patientId));
                break;
            case 204:
                const data1 = response;
                toast.success("Demographic data updated", {
                    position: toast.POSITION.TOP_CENTER,
                });
                //console.log(response);
                yield put(demographicPatientPutSuccess(data1));
                yield put(demographicPatient(action.payload.patientId));
                break;
            case 400:
                const err = response.data;
                yield put(demographicPatientPutFailed(err));
                break;
            default:
                break;

        }
    }
    catch (error) {
        const err = error
        toast.error("Something went wrong", {
            position: toast.POSITION.TOP_CENTER,
        });
        yield put(demographicPatientPutFailed(err.response));
    }
}

function* primaryConsultantfn(action) {
    try {
        const response = yield call(
            api_patient.put, "PrimaryConsultant", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response;
                //console.log(response);
                yield put(primaryConsultantSuccess(data));
                yield put(getClinicAppointmentMinuts(action.payload.primaryConsultantUserId));
                break;
            case 204:
                const data1 = response;
                //console.log(response);
                yield put(primaryConsultantSuccess(data1));
                yield put(getClinicAppointmentMinuts(action.payload.primaryConsultantUserId));
                break;
            case 400:
                const err = response.data;
                yield put(primaryConsultantFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(demographicPatientPutFailed(err.response));
    }
}

function* outPatientApptfn(action) {
    try {
        const response = yield call(
            api_event.post,
            "AddEvents", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(outPatientApptSuccess(data));
                yield put(eventsPatient(action.payload.patientEpisodeId));
                break;
            case 400:
                const err = response.data;
                yield put(outPatientApptFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(outPatientApptFailed(err.response));
    }
}

function* outPatientProcedurefn(action) {
    try {
        const response = yield call(
            api_event.post,
            "AddEvents", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(outPatientProcedureSuccess(data));
                yield put(eventsPatient(action.payload.patientEpisodeId));
                break;
            case 400:
                const err = response.data;
                yield put(outPatientProcedureFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(outPatientProcedureFailed(err.response));
    }
}

function* operationfn(action) {
    try {
        const response = yield call(
            api_event.post,
            "AddEvents", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(operationSuccess(data));
                yield put(eventsPatient(action.payload.patientEpisodeId));
                // return setTimeout(()=>{
                //     function* gen() {
                //         yield put(eventsPatient(action.payload.patientEpisodeId));
                //     };
                //     var it = gen();
                // },5000)
                break;
            case 400:
                const err = response.data;
                yield put(operationFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(operationFailed(err.response));
    }
}

function* InPatientVisitfn(action) {
    try {
        const response = yield call(
            api_event.post,
            "AddEvents", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(inpatientVisitSuccess(data));
                yield put(eventsPatient(action.payload.patientEpisodeId));
                break;
            case 400:
                const err = response.data;
                yield put(inpatientVisitFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(inpatientVisitFailed(err.response));
    }
}

function* customEpisodeDiagnosisfn(action) {
    try {
        const response = yield call(
            api_patient.post,
            "Organisation/AddDiagnosis", action.payload.new
        );
        //console.log(response);
        switch (response.status) {
            case 200:
                const data = response.data;
                const obj = {
                    ...action.payload.old,
                    diagnosisId: data.diagnosisId
                }
                yield put(customEpisodeDiagnosisSuccess(data));
                yield put(episodeDiagnosis(obj));
                break;
            case 204:
                const data1 = response.data;
                yield put(customEpisodeDiagnosisSuccess(data1));
                break;
            case 400:
                const err = response.data;
                yield put(customEpisodeDiagnosisFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(customEpisodeDiagnosisFailed(err.response));
    }
}

function* selectEpisodefn(action) {
    try {
        const response = yield call(
            api_patient.get,
            "SelectEpisode/" + action.payload
        );
        //console.log(response);
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(selectEpisodeSuccess(data));
                yield put(eventsPatient(data.episodeId));
                break;
            case 204:
                const data1 = response.data;
                yield put(selectEpisodeSuccess(data1));
                yield put(eventsPatient(data.episodeId));
                break;
            case 400:
                const err = response.data;
                yield put(selectEpisodeFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(customEpisodeDiagnosisFailed(err.response));
    }
}

function* addEpisodefn(action) {
    try {
        const response = yield call(
            api_patient.post,
            "Episode/", action.payload
        );
        //console.log(response);
        switch (response.status) {
            case 200:
                const data = response;
                yield put(addEpisodeSuccess(data));
                yield put(selectEpisode(data.data.episodeId));
                yield put(switchEpisode(data.data.patientId));
                yield put(demographicPatient(data.data.patientId));
                // yield put(eventsPatient(data.data.episodeId));
                break;
            case 204:
                const data1 = response;
                yield put(addEpisodeSuccess(data1));
                break;
            case 400:
                const err = response.data;
                yield put(addEpisodeFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(customEpisodeDiagnosisFailed(err.response));
    }
}

function* getEvent1fn(action) {
    try {
        const response = yield call(
            api_event.get,
            "OutpatientApptById/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(getEvent1Success(data));
                break;
            case 204:
                const data1 = response.data;
                yield put(getEvent1Success(data1));
                break;
            case 400:
                const err = response.data;
                yield put(getEvent1Failed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(customEpisodeDiagnosisFailed(err.response));
    }
}

function* getEvent2fn(action) {
    try {
        const response = yield call(
            api_event.get,
            "OutpatientProcedureById/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(getEvent2Success(data));
                break;
            case 204:
                const data1 = response.data;
                yield put(getEvent2Success(data1));
                break;
            case 400:
                const err = response.data;
                yield put(getEvent2Failed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(customEpisodeDiagnosisFailed(err.response));
    }
}

function* getEvent3fn(action) {
    try {
        const response = yield call(
            api_event.get,
            "OperationById/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(getEvent3Success(data));
                break;
            case 204:
                const data1 = response.data;
                yield put(getEvent3Success(data1));
                break;
            case 400:
                const err = response.data;
                yield put(getEvent3Failed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(customEpisodeDiagnosisFailed(err.response));
    }
}

function* getEvent4fn(action) {
    try {
        const response = yield call(
            api_event.get,
            "InpatientVisitById/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(getEvent4Success(data));
                break;
            case 204:
                const data1 = response.data;
                yield put(getEvent4Success(data1));
                break;
            case 400:
                const err = response.data;
                yield put(getEvent4Failed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(customEpisodeDiagnosisFailed(err.response));
    }
}

function* updateoutPatientApptfn(action) {
    try {
        const response = yield call(
            api_event.post,
            "UpdateOutpatientAppt", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(updateoutPatientApptSuccess(data));
                yield put(eventsPatient(action.payload.patientEpisodeId));
                break;
            case 400:
                const err = response.data;
                yield put(updateoutPatientApptFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(outPatientApptFailed(err.response));
    }
}

function* updateoutPatientProcedurefn(action) {
    try {
        const response = yield call(
            api_event.post,
            "UpdateOutpatientProcedure", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(updateoutPatientProcedureSuccess(data));
                yield put(eventsPatient(action.payload.patientEpisodeId));
                break;
            case 400:
                const err = response.data;
                yield put(updateoutPatientProcedureFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(outPatientProcedureFailed(err.response));
    }
}

function* updateoperationfn(action) {
    try {
        const response = yield call(
            api_event.post,
            "UpdateOperation", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(updateoperationSuccess(data));
                yield put(eventsPatient(action.payload.patientEpisodeId));
                break;
            case 400:
                const err = response.data;
                yield put(updateoperationFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(operationFailed(err.response));
    }
}

function* updateInPatientVisitfn(action) {
    try {
        const response = yield call(
            api_event.post,
            "UpdateInpatientVisit", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(updateinpatientVisitSuccess(data));
                yield put(eventsPatient(action.payload.patientEpisodeId));
                break;
            case 400:
                const err = response.data;
                yield put(updateinpatientVisitFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(inpatientVisitFailed(err.response));
    }
}

function* getClinicFeefn(action) {
    try {
        const response = yield call(
            api_event.get,
            `User/GetClinicFee/${action.payload.userId}/${+action.payload.billingTypeId}`+( action.payload.insurerId !== "" ? "?insurerId="+action.payload.insurerId : "")
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(getClinicFeeSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(getClinicFeeFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(getClinicFeeFailed(err.response));
    }
}

function* addhospitalfn(action) {
    try {
        const response = yield call(
            api_event.get,
            "AddHospital/"+action.payload.name+"/"+action.payload.createByUser
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(addhospitalSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(addhospitalFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(addhospitalFailed(err.response));
    }
}

function* lengthofstayfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/Operation/LengthOfStay"
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(getlengthofstaySuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(getlengthofstayFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(getlengthofstayFailed(err.response));
    }
}

function* eventdeletereasonfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/EventDeletionReason"
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(eventdeletereasonSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventdeletereasonFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(eventdeletereasonFailed(err.response));
    }
}

function* deleteeventfn(action) {
    try {
        const response = yield call(
            api_event.put,
            "DeleteEvent",action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(deleteEventSuccess(data));
                yield put(eventsPatient(action.payload.episodeId));
                break;
            case 400:
                const err = response.data;
                yield put(deleteEventFailed(err));
                break;
            default:

        }
    }
    catch (error) {
        const err = error
        yield put(deleteEventFailed(err.response));
    }
}


function* layoutTitleWatcher() {
    yield takeEvery("PATIENT", patientfn);
    yield takeEvery("SEARCHPATIENT", searchPatientfn);
    yield takeEvery("DEMOGRAPHICPATIENT", DemographicPatientfn);
    yield takeEvery("EPISODEPATIENT", episodePatientfn);
    yield takeEvery("DEMOGRAPHICPATIENTPUT", demographicPatientPutfn);
    yield takeEvery("EVENTSPATIENT", eventsPatientfn);
    yield takeEvery("PRIMARY_CONSULTANT", primaryConsultantfn);
    yield takeEvery("OUTPATIENTAPPT", outPatientApptfn);
    yield takeEvery("OUTPATIENTPROCEDURE", outPatientProcedurefn);
    yield takeEvery("OPERATION", operationfn);
    yield takeEvery("INPATIENTVISIT", InPatientVisitfn);
    yield takeEvery("CUSTOMEPISODEDIAGNOSIS", customEpisodeDiagnosisfn);
    yield takeEvery("SELECT_EPISODE", selectEpisodefn);
    yield takeEvery("ADD_EPISODE", addEpisodefn);
    yield takeEvery("GETEVENT1", getEvent1fn);
    yield takeEvery("GETEVENT2", getEvent2fn);
    yield takeEvery("GETEVENT3", getEvent3fn);
    yield takeEvery("GETEVENT4", getEvent4fn);
    yield takeEvery("UPDATEOUTPATIENTAPPT", updateoutPatientApptfn);
    yield takeEvery("UPDATEOUTPATIENTPROCEDURE", updateoutPatientProcedurefn);
    yield takeEvery("UPDATEOPERATION", updateoperationfn);
    yield takeEvery("UPDATEINPATIENTVISIT", updateInPatientVisitfn);
    yield takeEvery("GETCLINICAPPOINTMENTMINUTE", getClinicAppointmentMinutsfn);
    yield takeEvery("GETCLINICFEE", getClinicFeefn);
    yield takeEvery("ADDHOSPITAL", addhospitalfn);
    yield takeEvery("LENGTHOFSTAY", lengthofstayfn);
    yield takeEvery("EVENTDELETEREASON", eventdeletereasonfn);
    yield takeEvery("DELETEEVENT", deleteeventfn);
}

export default function* layout() {
    yield all([layoutTitleWatcher()]);
}
