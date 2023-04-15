import { takeEvery, all, call, put } from "redux-saga/effects";
import {
    eventSideSuccess,
    eventSideFailed,
    eventCategoryIdSuccess,
    eventCategoryIdFailed,
    eventTypeIdSuccess,
    eventTypeIdFailed,
    eventBillingIdSuccess,
    eventBillingIdFailed,
    eventAnaeastheticSuccess,
    eventAnaeastheticFailed,
    eventOperationTimeSuccess,
    eventOperationTimeFailed,
    eventTciStatusSuccess,
    eventTciStatusFailed,
    eventProcedureNameSuccess,
    eventProcedureNameFailed,
    eventProcedureName1Success,
    eventProcedureName1Failed,
    eventProcedureNameLoadSuccess,
    eventProcedureNameLoadFailed,
    eventProcedureCodeSuccess,
    eventProcedureCodeFailed,
    eventProcedureCodeLoadSuccess,
    eventProcedureCodeLoadFailed,
    eventProcedureFeeSuccess,
    eventProcedureFeeFailed,
    eventHospitalNameSuccess,
    eventHospitalNameFailed,
    addEventsSuccess,
    addEventsFailed,
    addDiagnosisSuccess,
    addDiagnosisFailed,
    addProcedureNameSuccess,
    addProcedureNameFailed,
    addProcedureCodeSuccess,
    addProcedureCodeFailed,
} from "./events";
import { toast } from 'react-toastify';
import { api, api_event } from "../routes/api";
import { eventsPatient } from "./layouts";

function* eventSidefn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/Side"
        );
        switch (response.status) {
            case 200:
                const data = JSON.parse(response.data);
                //console.log(response);
                yield put(eventSideSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventSideFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventSideFailed(err.response));
    }
}

function* eventCategoryIdfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/OutpatientApptCategory"
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(eventCategoryIdSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventCategoryIdFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventCategoryIdFailed(err.response));
    }
}

function* eventTypeIdfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/OutpatientApptType"
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(eventTypeIdSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventTypeIdFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventTypeIdFailed(err.response));
    }
}

function* eventBillingIdfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/BillingType"
        );
        switch (response.status) {
            case 200:
                const data = JSON.parse(response.data);
                //console.log(response);
                yield put(eventBillingIdSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventBillingIdFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventBillingIdFailed(err.response));
    }
}

function* eventAnaeastheticfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/Anaeasthetic"
        );
        switch (response.status) {
            case 200:
                const data = JSON.parse(response.data);
                //console.log(response);
                yield put(eventAnaeastheticSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventAnaeastheticFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventAnaeastheticFailed(err.response));
    }
}

function* eventOperationTimefn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/OperationTime"
        );
        switch (response.status) {
            case 200:
                const data = JSON.parse(response.data);
                //console.log(response);
                yield put(eventOperationTimeSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventOperationTimeFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventOperationTimeFailed(err.response));
    }
}

function* eventTciStatusfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/TCIStatus"
        );
        switch (response.status) {
            case 200:
                const data = JSON.parse(response.data);
                //console.log(response);
                yield put(eventTciStatusSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventTciStatusFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventTciStatusFailed(err.response));
    }
}

function* eventProcedureNameLoadfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/ProcedureName"
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(eventProcedureNameLoadSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventProcedureNameLoadFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventProcedureNameLoadFailed(err.response));
    }
}

function* eventProcedureNamefn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/ProcedureName/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(eventProcedureNameSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventProcedureNameFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventProcedureNameFailed(err.response));
    }
}

function* eventProcedureName1fn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/ProcedureName/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(eventProcedureName1Success(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventProcedureName1Failed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventProcedureName1Failed(err.response));
    }
}

function* eventProcedureCodeLoadfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/ProcedureCode"
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(eventProcedureCodeLoadSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventProcedureCodeLoadFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventProcedureCodeLoadFailed(err.response));
    }
}

function* eventProcedureCodefn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/ProcedureCode/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(eventProcedureCodeSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventProcedureCodeFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventProcedureCodeFailed(err.response));
    }
}

function* eventProcedureFeefn(action) {
    try {
        const response = yield call(
            api_event.post,
            "ProcedureFee", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(eventProcedureFeeSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventProcedureFeeFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventProcedureFeeFailed(err.response));
    }
}

function* eventHospitalNamefn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/HospitalName/"
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                //console.log(response);
                yield put(eventHospitalNameSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(eventHospitalNameFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(eventHospitalNameFailed(err.response));
    }
}

function* addEventsfn(action) {
    try {
        const response = yield call(
            api_event.post,
            "AddEvents", action.payload
        );
        switch (response.status) {
            case 200:
                toast.success("Add Event Success", {
                    position: toast.POSITION.TOP_CENTER,
                });
                yield put(eventsPatient(action.payload.patientEpisodeId));
                const data = response.data;
                yield put(addEventsSuccess(data));
                //console.log(response);
                break;
            case 400:
                toast.error("error", {
                    position: toast.POSITION.TOP_CENTER,
                });
                const err = response.data;
                // console.log(response);
                yield put(addEventsFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(addEventsFailed(err.response));
    }
}

function* addDiagnosisfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/Diagnosis/" + action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(addDiagnosisSuccess(data));
                // console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(addDiagnosisFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(addDiagnosisFailed(err.response));
    }
}

function* addProcedureNamefn(action) {
    try {
        const response = yield call(
            api_event.post,
            "Organisation/AddprocedureName", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(addProcedureNameSuccess(data));
                // console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(addProcedureNameFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(addProcedureNameFailed(err.response));
    }
}

function* addProcedureCodefn(action) {
    try {
        const response = yield call(
            api_event.post,
            "Organisation/AddprocedureCode", action.payload
        );
        switch (response.status) {
            case 200:
                const data = response.data;
                yield put(addProcedureCodeSuccess(data));
                // console.log(response);
                break;
            case 400:
                const err = response.data;
                //console.log(response);
                yield put(addProcedureCodeFailed(err));
                break;
            default:
        }
    }
    catch (error) {
        const err = error
        yield put(addProcedureCodeFailed(err.response));
    }
}


function* eventTitleWatcher() {
    yield takeEvery("EVENTSIDE", eventSidefn);
    yield takeEvery("EVENTCATEGORYID", eventCategoryIdfn);
    yield takeEvery("EVENTTYPEID", eventTypeIdfn);
    yield takeEvery("EVENTBILLINGID", eventBillingIdfn);
    yield takeEvery("EVENTANAEASTHETIC", eventAnaeastheticfn);
    yield takeEvery("EVENTOPERATIONTIME", eventOperationTimefn);
    yield takeEvery("EVENTTCISTATUS", eventTciStatusfn);
    yield takeEvery("EVENTPROCEDURENAME", eventProcedureNamefn);
    yield takeEvery("EVENTPROCEDURENAME1", eventProcedureName1fn);
    yield takeEvery("EVENTPROCEDURECODE", eventProcedureCodefn);
    yield takeEvery("EVENTPROCEDURENAMELOAD", eventProcedureNameLoadfn);
    yield takeEvery("EVENTPROCEDURECODELOAD", eventProcedureCodeLoadfn);
    yield takeEvery("EVENTPROCEDUREFEE", eventProcedureFeefn);
    yield takeEvery("EVENTHOSPITALNAME", eventHospitalNamefn);
    yield takeEvery("ADDEVENTS", addEventsfn);
    yield takeEvery("ADDDIAGNOSIS", addDiagnosisfn);
    yield takeEvery("ADDPROCEDURENAME", addProcedureNamefn);
    yield takeEvery("ADDPROCEDURECODE", addProcedureCodefn);
}

export default function* event() {
    yield all([eventTitleWatcher()]);
}
