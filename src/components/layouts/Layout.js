import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Layout.css';
import LayoutEpisode from './pages/layoutEpisode';
import LayoutDemographics from './pages/layoutDemographics';
import ModalEpisode from './modal/modalEpisode';
import ModalDemographics from './modal/modalDemographics';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleRight, FaSearch, FaTimes } from "react-icons/fa";
import Select, { components } from 'react-select';
import { Button, Modal, Tab, Tabs } from 'react-bootstrap';
import ModalEvents from './modal/modalEvents';
import { useDispatch, useSelector } from 'react-redux';
import Typeahead from '../typehead/typeahead';
import { Navigate } from 'react-router-dom';
// import LayoutMultimedia from './pages/layoutMultimedia';
// import LayoutDocuments from './pages/layoutDocuments';

function Layout(props) {

    const dispatch = useDispatch();
    const layouts = useSelector((state) => state.layouts)
    const global = useSelector((state) => state.global)
    const episod = useSelector((state) => state.episode)
    useEffect(() => {
        let a = localStorage.getItem('patients');
        let c = localStorage.getItem('currentpatients');
        if(a){
            let data = JSON.parse(a);
            data.some((item)=>{
                dispatch({ type: 'PATIENTADD', payload: item });
            })
            dispatch({ type: 'DEMOGRAPHICPATIENT', payload: c })
            dispatch({ type: 'EPISODEPATIENT', payload: c })
        }
        dispatch({ type: 'LAYOUT_EDIT', payload: false })
        dispatch({ type: 'EVENTSIDE' })
        dispatch({ type: 'EVENTCATEGORYID' })
        dispatch({ type: 'EVENTTYPEID' })
        dispatch({ type: 'EVENTBILLINGID' })
        dispatch({ type: 'EVENTANAEASTHETIC' })
        dispatch({ type: 'EVENTOPERATIONTIME' })
        dispatch({ type: 'EVENTTCISTATUS' })
        dispatch({ type: 'EVENTPROCEDURENAMELOAD' })
        dispatch({ type: 'EVENTPROCEDURECODELOAD' })
        dispatch({ type: 'EVENTHOSPITALNAME' })
        dispatch({ type: 'LENGTHOFSTAY' })
        dispatch({ type: 'EVENTDELETEREASON' })
        dispatch({ type: 'EPISODEPRIMARYCONSULTANT', payload: global.orgId })
    }, [])

    const [formData, setFormdata] = useState({})
    const [collaborator, setCollaborator] = useState({})
    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [cancelshow, setCancelShow] = useState(false)
    const [succancelshow, setSucCancelShow] = useState(false)
    const [address, setAddress] = useState({})
    const [forDemographics, setForDemographics] = useState()
    const [staticOptions, setStaticOptions] = useState([])
    const [requiredField, setRequiredField] = useState({
        demographics: ["categoryId", "genderId", "titleId", "firstName", "surname", "dob", "email", "guardianFirstName", "guardianSurname", "guardianDob", "guardianEmail", "guardianRelationshipId", "guardianPreferredPhone", "GuardianContact", "preferredPhone"],
        episode: ["billingTypeId", "billingInsuranceCompanyId",  "patientStatusId", "primaryConsultantUserId", "hospitalName"]
    });

    const [demographicFields, setDemographicFields] = useState(["categoryId", "titleId", "firstName", "surname", "dob", "genderId", "email", "preferredPhone", "secondaryPhone", "address1", "address2", "address3", "postCode", "nhsNumber", "guardianFirstName", "guardianSurname", "guardianDob", "guardianEmail", "guardianRelationshipId", "guardianPreferredPhone", "gpPractice", "gpName", "gpEmail", "gpAddress1", "gpAddress2", "gpAddress3", "gpPostCode"])

    const [episodeFields, setEpisodeFields] = useState(["primaryConsultantUserId", "referralSourceId", "referralPracticeName", "referrerName", "referrerSourceEmail", "referrerSourceAddress1", "referrerSourceAddress2", "referrerSourceAddress3", "referrerSourcePostCode", "patientStatusId", "billingTypeId", "embassyId", "embassyContactName", "embassyContactEmail", "embassyPreferredPhone", "embassySecondaryPhone", "billingInsuranceCompanyId", "billingInsurancePolicyNumber", "firmId", "solicitorFirmName", "solicitorName", "solicitorAddress1", "solicitorAddress2", "solicitorAddress3", "solicitorPostCode", "solicitorPreferredPhone", "solicitorContactEmail", "billingName", "billingAddress1", "billingAddress2", "billingAddress3", "billingPostCode", "billingContact", "BillingEmail", "Notes", "patientStatusHospitalName"])
    const [event, setEvent] = useState({});
    const [apievent, setapiEvent] = useState({});
    const [apipatient, setapiPatient] = useState({});
    const [showButton, setShowButton] = useState(false)

    const [error, setError] = useState({
        demographics: {},
        episode: {},
        clear: true
    });
    const [demographicserror, setDemographicsError] = useState({});
    const [currentPatient, setCurrentPatient] = useState('');
    const [updateDemog, setUpdateDemog] = useState(false);
    const [key, setKey] = useState('home');

    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (!error.clear) {
            dispatch({ type: 'PATIENT', payload: formData })
            //console.log(layouts.patient.status);
        }
    }, [error])

    useEffect(() => {
        if (layouts.searchpatient.length > 0) {
            // setStaticOptions(layouts.searchpatient)
            //console.log(layouts.searchpatient);
            let res = []
            layouts.searchpatient.some((data, i) => {
                let date = new Date(data.dob)
                const day = date.toLocaleString('default', { day: '2-digit' });
                const month = date.toLocaleString('default', { month: 'short' });
                const year = date.toLocaleString('default', { year: 'numeric' });
                let newDate = day + '-' + month + '-' + year;
                let obj = {
                    value: data.patientId,
                    label: data.surname.charAt(0).toUpperCase() + data.surname.slice(1).toLowerCase() + ',  ' +  data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1).toLowerCase() +  '  ' + newDate + ' (' + data.age + 'yr)  '  + data.gender 
                }
                res.push(obj);
            })
            setStaticOptions(res);
        }
    }, [layouts.searchpatient])

    const demographics = useRef();
    const episode = useRef();
    const events = useRef();
    const searchpatientref = useRef();
    const sendAddress = ((e) => {
        setAddress(e)
    })

    const fetchAddress = (() => {
        demographics.current.getAddress();
    })

    const dataDemographicFn = ((e) => {
        let item = e;
        item.patientEpisodes = {
            collaborators: [],
            patientEpisodeEvents: []
        };
        episodeFields.some((a, i) => {
            item.patientEpisodes[a] = ""
        })
        item.guardianId = item.guardianId ? item.guardianId : null;
        item.dob = item.dob ? item.dob.slice(0, 10).split('-').reverse().join('/') : '';
        item.guardianDob = item.guardianDob ? item.guardianDob.slice(0, 10).split('-').reverse().join('/') : '';
        item.guardianRelationshipId = item.guardianRelationshipId ? item.guardianRelationshipId : null;
        item.patientEpisodes.referralSourceId = null;
        item.patientEpisodes.billingTypeId = null;
        item.patientEpisodes.billingInsuranceCompanyId = null;
        item.patientEpisodes.embassyId = null;
        item.patientEpisodes.solicitorId = null;
        item.patientEpisodes.firmId = null;
        item.patientEpisodes.patientStatusId = null;
        item.patientEpisodes.outstandingBalance = null;
        //console.log(e);

        let res1 = {}

        Object.keys(e).some((data, i) => {
            requiredField.demographics.some((field, j) => {
                // debugger;
                if (data == field) {
                    if (item[data] == "" || item[data] == undefined) {
                        if (data == "email" || data == "preferredPhone") {
                            if (e.categoryId == "1") {
                                res1[data] = 'Phone is required'
                            }
                        }
                        else if (field.includes("guardian")) {
                            if (item.categoryId == "2") {
                                res1[data] = data + ' is required'
                            }
                        }
                        else {
                            res1[data] = data + ' is required'
                        }
                    }
                }
            })
        })
        setDemographicsError(res1);

        if (Object.keys(res1).length == 0) {
            dispatch({
                type: 'DEMOGRAPHICPATIENTPUT', payload: {
                    patientId: global.currentPatent,
                    patientDemographic: e
                }
            })
        }
    })

    useEffect(() => {
        if ((layouts?.demographicpatientput?.status == 200 || layouts?.demographicpatientput?.status == 204) && (showButton)) {
            setSucCancelShow(true);
            setShowButton(false);
        }
    }, [layouts.demographicpatientput])

    const submitForm = async (e) => {
        // debugger;
        e.preventDefault();
        let formdata = { ...formData }
        const data = new FormData(e.target);
        for (let [key, value] of data.entries()) {
            if(key == "billingInsuranceCompanyId"){
                formdata[key] = episod.episodeinsurancecompany[value-1]["id"]
            }
            else{
                formdata[key] = value
            }
        }
        let err = { ...error }
        let res1 = {};
        let res2 = {};
        formdata.PatientEpisodes = formdata.PatientEpisodes ? formdata.PatientEpisodes : {};
        formdata.PatientEpisodes.collaborators = formdata.PatientEpisodes.collaborators ? formdata.PatientEpisodes.collaborators : [];
        formdata.PatientEpisodes.patientEpisodeEvents = formdata.PatientEpisodes.patientEpisodeEvents ? formdata.PatientEpisodes.patientEpisodeEvents : [];
        Object.keys(formdata).some((data, i) => {

            requiredField.demographics.some((field, j) => {
                // debugger;
                if (data == field) {
                    if (formdata[data] == "" || formdata[data] == undefined) {
                        if (data == "email" || data == "preferredPhone") {
                            if (formdata.categoryId == "1") {
                                res1[data] = data +' is required'
                            }
                        }
                        else if (field.includes("guardian")) {
                            if (formdata.categoryId == "2") {
                                res1[data] = data + ' is required'
                            }
                        }
                        else {
                            res1[data] = data + ' is required'
                        }
                    }
                    if(data == "email"){
                        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(formdata[data]))){
                            res1[data] = "Invalid Email"
                        }
                    }
                    if(data == "preferredPhone"){

                        let dt = formdata[data].split(" ");
                        let dt1 = dt.shift();
                        dt = dt.join("").replace(/[,()-]/g, "");
                        formdata[data] = dt1+" "+dt;
                        if(!(/^(\+\d{1,4}\s+\d{10})$/.test(formdata[data]))){
                            res1[data] = "Invalid Phone"
                        }
                    }
                    if (data == "dob") {
                        let a = new Date(formdata.dob);
                        let mm = a.getMonth() + 1;
                        let dd = a.getDate();
                        let yyyy = a.getFullYear();
                        let dateformat = (dd <= 9 ? '0' + dd : dd) + "/" + (mm <= 9 ? '0' + mm : mm) + "/" + yyyy;
                        formdata.dob = dateformat;
                    }
                    if (data == "guardianDob") {
                        let a = new Date(formdata.guardianDob);
                        let mm = a.getMonth() + 1;
                        let dd = a.getDate();
                        let yyyy = a.getFullYear();
                        let dateformat = (dd <= 9 ? '0' + dd : dd) + "/" + (mm <= 9 ? '0' + mm : mm) + "/" + yyyy;
                        formdata.guardianDob = dateformat;
                    }
                }
            })

            requiredField.episode.some((field, j) => {
                if (data == field) {
                    if (formdata[data] == "" || formdata[data] == undefined) {
                        if (field == "email") {
                            if (formdata.categoryId == "1") {
                                res2[field] = 'Email is required'
                            }
                        }
                        else {
                            res2[field] = field + ' is required'
                        }
                    }
                }
            })

            demographicFields.some((field, j) => {
                if (Object.keys(formdata).includes(field)) {
                    formdata[field] = formdata[field];
                }
                else {
                    formdata[field] = null;
                }
            })

            episodeFields.some((field, j) => {
                if (Object.keys(formdata).includes(field)) {
                    formdata.PatientEpisodes[field] = formdata[field];
                }
                else {
                    formdata.PatientEpisodes[field] = null;
                }
            })
        })

        Object.keys(formdata).some((data, i) => {
            episodeFields.some((field, j) => {
                if (Object.keys(formdata).includes(field)) {
                    delete formdata[field];
                }
            })
        })

        err.demographics = res1;
        err.episode = res2;
        if (Object.keys(err.episode).length == 0 && Object.keys(err.demographics).length == 0) {
            err.clear = false;
        }
        // debugger;
        setFormdata(formdata);
        await episode.current.getformData()
        await events.current.getName()
        await events.current.getapiName()
        // setFormdata(formdata);
        formdata.userGradeId = 7;
        formdata.guardianId = formdata.guardianId ? formdata.guardianId : null;
        formdata.createdByUser = 'cb675b1c-3b1a-4b9f-ae19-82de1b169d9f';
        formdata.updatedByUser = 'cb675b1c-3b1a-4b9f-ae19-82de1b169d9f';
        formdata.PatientEpisodes.outstandingBalance = 0;
        formdata.PatientEpisodes.organisationId = global.orgId;
        formdata.PatientEpisodes.primaryConsultantUserId = formdata.PatientEpisodes.primaryConsultantUserId ? formdata.PatientEpisodes.primaryConsultantUserId : null;
        formdata.PatientEpisodes.patientStatusId = formdata.PatientEpisodes.patientStatusId ? formdata.PatientEpisodes.patientStatusId : null;
        formdata.PatientEpisodes.referralSourceId = formdata.PatientEpisodes.referralSourceId ? formdata.PatientEpisodes.referralSourceId : null;
        formdata.PatientEpisodes.billingTypeId = formdata.PatientEpisodes.billingTypeId ? formdata.PatientEpisodes.billingTypeId : null;
        formdata.PatientEpisodes.embassyId = formdata.PatientEpisodes.embassyId ? formdata.PatientEpisodes.embassyId : null;
        formdata.PatientEpisodes.solicitorId = formdata.PatientEpisodes.solicitorId ? formdata.PatientEpisodes.solicitorId : null;
        formdata.PatientEpisodes.billingInsuranceCompanyId = formdata.PatientEpisodes.billingInsuranceCompanyId ? formdata.PatientEpisodes.billingInsuranceCompanyId : null;
        formdata.PatientEpisodes.firmId = formdata.PatientEpisodes.firmId ? formdata.PatientEpisodes.firmId : null;
        formdata.organisationId = global.orgId;
        //console.log(formdata);
        setError(err);
    }

    useEffect(() => {
        let formdata = { ...formData };
        if (collaborator.field) {
            formdata.PatientEpisodes['collaborators'] = collaborator.field;
        }
        setFormdata(formdata);
    }, [collaborator]);

    useEffect(() => {
        let formdata = { ...formData };
        if (event.length > 0) {
            formdata.PatientEpisodes.patientEpisodeEvents = event
        }
        setFormdata(formdata);
    }, [event]);

    useEffect(() => {
        if (Object.keys(layouts.patient).length !== 0) {
            if (layouts?.patient?.data?.patientEpisodes?.patientEpisodeEvents?.length !== 0) {
                if (apievent?.eventInpatientVisitDtos?.length > 0 || apievent?.eventOperationDtos?.length > 0 || apievent?.eventOutpatientApptDtos?.length > 0 || apievent?.eventOutpatientProcedureDtos?.length > 0) {
                    let a = apievent;
                    a.patientEpisodeId = layouts.patient.data.episodeId;
                    dispatch({ type: 'ADDEVENTS', payload: a })
                }
            }
            if (layouts?.patient?.status === 200) {
                setShowModal1(false);
                setAddress({});
                setFormdata({});
                setEvent({})
                setCollaborator({})
                setapiEvent({})
            }
            let err = JSON.parse(JSON.stringify(error));
            err.clear = true;
            setError(err);
        }
    }, [layouts.patient]);

    const handlerChange = (e) => {
        // if (e.length > 2) {
        //     dispatch({ type: 'SEARCHPATIENT', payload: e })
        // }
        let a = {
            orgId:global.orgId,
            data: e
        }
        if (e.length > 2) {
            dispatch({ type: 'SEARCHPATIENT', payload: a })
        }
    }

    const handleSelect = (e) => {
        if(!showButton){
            if (e.length > 0) {
                setForDemographics(e[0].value)
                //console.log(e[0].value)
                if (!(e[0].value === "") || !(e[0].value === undefined) || !(e[0].value == null)) {
                    dispatch({ type: 'DEMOGRAPHICPATIENT', payload: e[0].value })
                    dispatch({ type: 'EPISODEPATIENT', payload: e[0].value })
                }
                searchpatientref.current.clearData();
    
            }
            else {
                setForDemographics("")
                searchpatientref.current.clearData();
            }
        }
        else{
            setUpdateDemog(true)
        }
    }
    const switchPatient = (item) => {
        if (item !== global.currentPatent) {
            dispatch({ type: 'DEMOGRAPHICPATIENT', payload: item })
            dispatch({ type: 'EPISODEPATIENT', payload: item })
        }
    }

    const closePatient = (item) => {
        // if(item === global.currentPatent){
        //     switchPatient(item);
        // }
        dispatch({ type: 'PATIENTDELETE', payload: item })
    }

    if (global.loggedUserId == "") {
        return <Navigate to="/" />
    }

    return (
        <>
            <section className='tab_sec pt-2'>
                <div>
                    <nav className='d-flex flex-wrap-reverse justify-content-between'>
                        <div className="nav nav-tabs patienttab" id="nav-tab" role="tablist">
                            {
                                global.patientList.map((item, i) =>
                                    <Fragment key={"patient" + i}>
                                        <div className='d-flex align-items-center'>
                                            <button
                                                key={"patient" + i}
                                                className={global.currentPatent === item.id ? "nav-link me-2 active " : "nav-link me-0"}
                                                onClick={(e) => { 
                                                    if(!showButton){
                                                        switchPatient(item.id)
                                                    }
                                                    else{
                                                        setUpdateDemog(true)
                                                    }
                                                }}
                                            >
                                                <b>{item.surname.charAt(0).toUpperCase() + item.surname.slice(1).toLowerCase() + ', ' + item.firstName.charAt(0).toUpperCase() }</b>
                                            </button>
                                            {
                                                global.currentPatent !== item.id ?
                                                    <FaTimes
                                                        className='me-2'
                                                        onClick={() => { closePatient(item.id) }}
                                                    /> :
                                                    <></>
                                            }
                                        </div>
                                    </Fragment>

                                )
                            }
                        </div>
                        <div className='d-flex mb-2'>
                            <button 
                                className='btn btn-add_det me-4' 
                                onClick={() => { 
                                    if(!showButton){
                                        setShowModal1(true)
                                        dispatch({type:"BILLINGTYPE",payload: ""})
                                        dispatch({type:"INSURERNAME",payload: ""})
                                        dispatch({ type: 'CURRENTPRIMARYCONSULTANT',payload:"" })
                                    }
                                    else{
                                        setUpdateDemog(true)
                                    }
                                }}
                            >
                                Add Patient
                            </button>
                            <Typeahead
                                ref={searchpatientref}
                                onInputChange={(e) => { handlerChange(e) }}
                                onChange={(e) => { handleSelect(e) }}
                                options={staticOptions}
                                minLength={3}
                            />
                            {/* <Typeahead
                                id="search_typehead"
                                {...searchOption}
                                styles={customSearchStyle}
                                onInputChange={(e) => { handlerChange(e) }}
                                options={staticOptions}
                            >
                            </Typeahead> */}
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            {
                                global.patientList.length > 0 ?
                                    <div className='tab-details'>
                                        <div className='container-fluid'>
                                            <div className='d-flex flex-wrap justify-content-between py-lg-2 py-1 px-lg-3 px-md-2 px-0'>
                                                <div className='d-flex align-items-center flex-wrap'>
                                                    <h5 className='det_Date me-4'>
                                                        <b>
                                                            {layouts.demographicpatient.patientDemographic ? 
                                                                ( layouts.demographicpatient.patientDemographic?.surname.toUpperCase() + ', ' +
                                                                // layouts.demographicpatient.patientDemographic?.surname.slice(1).toLowerCase() 
                                                                layouts.demographicpatient.patientDemographic?.firstName.charAt(0).toUpperCase() +
                                                                layouts.demographicpatient.patientDemographic?.firstName.slice(1).toLowerCase()) : ''
                                                            }
                                                        </b>
                                                    </h5>

                                                    {/* <h5 className='det_Date me-4'>
                                                    <b>
                                                        {
                                                            layouts.demographicpatient.patientDemographic ? 
                                                            layouts.demographicpatient.patientDemographic?.dob.split(" ")[0]
                                                            :""
                                                        }
                                                    </b>
                                                </h5> */}

                                                    <h5 className='det_Date me-4'><b>{layouts.demographicpatient.patientDemographic ? layouts.demographicpatient.patientDemographic?.dob.split(" ")[0].split('-').reverse().join("/") : ''}</b></h5>

                                                    {/* <p className='det_gender me-4'>Gender {layouts.demographicpatient.patientDemographic ? ((layouts.demographicpatient.patientDemographic?.genderId == 27) ? 'Male' : '') || ((layouts.demographicpatient.patientDemographic?.genderId == 28) ? 'Female' : '') || ((layouts.demographicpatient.patientDemographic?.genderId == 29) ? 'Other Specific' : '') || ((layouts.demographicpatient.patientDemographic?.genderId == 30) ? 'Not Known' : '') || ((layouts.demographicpatient.patientDemographic?.genderId == 31) ? 'Not Specified' : '') : ''}</p> */}

                                                    <p className='det_gender me-4'><b>Gender </b>{layouts.demographicpatient.patientDemographic ? layouts.demographicpatient.patientDemographic?.genderName : ''}</p>

                                                    <p className='det_gender me-4'><b>Age</b> {layouts.demographicpatient.patientDemographic ? layouts.demographicpatient.patientDemographic?.age : ''}</p>

                                                    <p className='det_gender me-4'><b>Email</b> {layouts.demographicpatient.patientDemographic ? ((layouts.demographicpatient.patientDemographic.guardianEmail != null) ? ("(G) " + layouts.demographicpatient.patientDemographic.guardianEmail) : layouts.demographicpatient.patientDemographic.email) : ''}</p>

                                                    <p className='det_gender me-4'><b>Phone Number</b> {layouts.demographicpatient.patientDemographic ? ((layouts.demographicpatient.patientDemographic.guardianPreferredPhone != null) ? ("(G)" + layouts.demographicpatient.patientDemographic.guardianPreferredPhone) : layouts.demographicpatient.patientDemographic.preferredPhone) : ''}</p>
                                                </div>
                                                <div className='d-flex align-items-center flex-wrap'>
                                                    {/* <a href='#' className='me-4'>
                                                    <p className='m-0'>Add Document
                                                        <FaAngleRight className='ms-1' />
                                                    </p>
                                                </a> */}
                                                    <a href='#' className='me-4'>
                                                        <p className='m-0'>Message Patient
                                                            <FaAngleRight className='ms-1' />
                                                        </p>
                                                    </a>
                                                    <a href='#' className='me-4'>
                                                        <p className='m-0'>Add To
                                                            <FaAngleRight className='ms-1' />
                                                        </p>
                                                    </a>
                                                    {/* <a href='#' className='me-4'>
                                                    <p className='m-0'>Send File
                                                        <FaAngleRight className='ms-1' />
                                                    </p>
                                                </a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : <></>
                            }
                            <div className='input_content'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => {
                                        if(!showButton){
                                            setKey(k)
                                        }
                                        else{
                                            setUpdateDemog(true)
                                        }
                                    }}
                                >
                                    <Tab eventKey="home" title="Episode">
                                        <div className='overflow-content'>
                                            <div className='container-fluid'>
                                                <LayoutEpisode data={layouts.episodepatient} gpdata={layouts.demographicpatient}  />
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="profile" title="Demographics">
                                        <div className='overflow-content'>
                                            <div className='container-fluid'>
                                                <ModalDemographics
                                                    page={"homepage"}
                                                    getclearError={() => { setDemographicsError({}) }}
                                                    getdataouter={(e) => { dataDemographicFn(e) }}
                                                    ref={demographics}
                                                    showbtn={(e) => { setShowButton(e) }}
                                                    validationerr={demographicserror}
                                                    data={layouts.demographicpatient}
                                                    readonly={true}
                                                    showButton={showButton} 
                                                />
                                                </div>
                                            </div>
                                    </Tab>
                                    {/* <Tab eventKey="multimedia" title="Multimedia">
                                        <div className='overflow-content'>
                                            <div className='container-fluid'>
                                                <LayoutMultimedia />
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="documents" title="Documents">
                                        <div className='overflow-content'>
                                            <div className='container-fluid'>
                                                <LayoutDocuments />
                                            </div>
                                        </div>
                                    </Tab> */}
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                show={showModal1}
                backdrop="static"
                className='layout-modal'
                onHide={() => setShowModal1(false)}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {/* <Modal.Header closeButton /> */}
                <Modal.Body>
                    <form onSubmit={submitForm} className="h-100" id='myForm'>
                        <div className='formdata'>
                            <ModalDemographics
                                showbtn={(e) => { }}
                                ref={demographics}
                                getData={(e) => { sendAddress(e) }}
                                validationerr={error.demographics}
                                readonly={false}
                            />
                            <ModalEpisode page="addpatient" getAddress={() => { fetchAddress() }} ref={episode} getData={(e) => { setCollaborator(e) }} address={address} validationerr={error.episode} />
                            <ModalEvents ref={events} getData={(e) => { setEvent(e) }} getapiData={(e) => { setapiEvent(e) }} />
                        </div>
                        <div className='d-flex justify-content-end my-3'>
                            <button className='btn btn-plan me-5' type='submit'> Save</button>
                            <button className='btn btn-plan me-5' type='button' onClick={() => setCancelShow(true)}> Cancel</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                className='warning-modal'
                show={cancelshow}
                onHide={() => { setCancelShow(false) }}
            >
                <Modal.Header>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to cancel?</Modal.Body>
                <Modal.Footer>
                    <Button className='btn-plan' onClick={() => {
                        setCancelShow(false);
                        setAddress({});
                        setShowModal1(false);
                        setError({
                            demographics: {},
                            episode: {},
                            clear: true
                        })
                        dispatch({ type: 'EVENTPROCEDURENAMELOAD' })
                        dispatch({ type: 'EVENTPROCEDURECODELOAD' })
                        dispatch({ type: 'CURRENTPRIMARYCONSULTANT',payload:layouts.episodepatient.patientEpisode.primaryConsultantUserId })
                    }}>
                        Yes
                    </Button>
                    <Button className='btn-plan' onClick={() => { setCancelShow(false) }}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                className='warning-modal'
                show={updateDemog}
                onHide={() => { setUpdateDemog(false) }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please update or cancel the Demographic changes</Modal.Body>
                {/* <Modal.Footer>
                    <Button className='btn-plan' onClick={() => {
                        demographics.current.restore();
                        setUpdateDemog(false)
                    }}>
                        Yes
                    </Button>
                    <Button className='btn-plan' onClick={() => { setUpdateDemog(false) }}>
                        No
                    </Button>
                </Modal.Footer> */}
            </Modal>

            <Modal
                className='warning-modal'
                centered
                show={succancelshow}
                backdrop="static"
                onHide={() => { 
                    setSucCancelShow( false ) 
                    dispatch({type:"CLEARDEMOGINPUT"})
                }}>
                <Modal.Header closeButton>
                    <Modal.Title>Demographics</Modal.Title>
                </Modal.Header>
                <Modal.Body>Saved successfully </Modal.Body>
            </Modal>
        </>
    );
}


export default Layout;