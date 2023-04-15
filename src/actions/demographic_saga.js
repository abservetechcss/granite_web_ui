import { takeEvery, all, call, put, takeLeading, StrictEffect } from "redux-saga/effects";
import {
    demographicTitleSuccess,
    demographicTitleFailed,
    demographicGenderFailed,
    demographicGenderSuccess,
    demographicRelationshipFailed,
    demographicRelationshipSuccess,
} from "./demographic";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../routes/api";

const axios = require('axios');

function* demographicTitlefn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/Title"
        );
        switch (response.status) {
            case 200:
                const data = JSON.parse(response.data);
                //console.log(response);
                yield put(demographicTitleSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(demographicTitleFailed(err));

        }
    }
    catch (error) {
        const err = error
        yield put(demographicTitleFailed(err.response));
    }
}

function* demographicGenderfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/Gender"
        );
        switch (response.status) {
            case 200:
                const data = JSON.parse(response.data);
                //console.log(response);
                yield put(demographicGenderSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(demographicGenderFailed(err));

        }
    }
    catch (error) {
        const err = error
        yield put(demographicGenderFailed(err.response));
    }
}

function* demographicRelationshipfn(action) {
    try {
        const response = yield call(
            api.get,
            "ddl/Relationship"
        );
        switch (response.status) {
            case 200:
                const data = JSON.parse(response.data);
                //console.log(response);
                yield put(demographicRelationshipSuccess(data));
                break;
            case 400:
                const err = response.data;
                yield put(demographicRelationshipFailed(err));

        }
    }
    catch (error) {
        const err = error
        yield put(demographicRelationshipFailed(err.response));
    }
}

function* demographicTitleWatcher() {
    yield takeEvery("DEMOGRAPHICTITLE", demographicTitlefn);
    yield takeEvery("DEMOGRAPHICGENDER", demographicGenderfn);
    yield takeEvery("DEMOGRAPHICRELATIONSHIP", demographicRelationshipfn);
}

export default function* demographic() {
    yield all([demographicTitleWatcher()]);
}
