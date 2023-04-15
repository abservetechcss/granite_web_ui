import axios from "axios";

export const api = axios.create({
    baseURL: "https://granite-common-api.granitexs.com/"
});
// api.defaults.headers.common['Authorization'] = localStorage.getItem('token') || "";

api.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export const api_patient = axios.create({
    baseURL: "https://granite-patient-api.granitexs.com/"
});
// api_patient.defaults.headers.common['Authorization'] = localStorage.getItem('token') || "";

api_patient.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

api_patient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


export const api_event = axios.create({
    baseURL: "https://granite-event-api.granitexs.com/"
});
// api_event.defaults.headers.common['Authorization'] = localStorage.getItem('token') || "";

api_event.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

api_event.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
