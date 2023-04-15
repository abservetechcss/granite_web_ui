import React, { useEffect, useMemo, useRef, useState } from "react";
import createUtilityClassName from "react-bootstrap/esm/createUtilityClasses";
import { FaPlus, FaArrowRight, FaTimes, FaCheck } from "react-icons/fa";
import { GrEdit, GrHistory } from "react-icons/gr";
import { HiOutlinePlus } from "react-icons/hi";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import GpDetails from "../layoutcomponents/gpDetails";
import ReferrerDetails from "../layoutcomponents/referrerDetails";
import OutPatientAppointment from '../layoutcomponents/OutPatientAppointment';
import OutPatientProcedure from '../layoutcomponents/outpatientprocedure';
import Operation from '../layoutcomponents/operation';
import InPatientVisit from '../layoutcomponents/inpatientvisit';
import CollaboratorForm from '../layoutcomponents/collaboratorForm';
import BillingType from "../layoutcomponents/billingType";
import ModalEpisode from "../modal/modalEpisode";
import ModalEvents from "../modal/modalEvents";
import layout from "../../../actions/layouts_saga";
// import * as $ from "jquery";



function LayoutEpisode(props) {

    const [collaborator, setCollaborator] = useState({ crntfield: {} });
    const [referral, setReferral] = useState({ crntfield: {} });
    const [showEpisode, setShowEpisode] = useState({})
    const [showType, setShowType] = useState(false);
    const [patientstatusip, setPatientStatusIp] = useState(false);
    const [hospitalShow, setHospitalShow] = useState(false);
    const [diocancelshow, setDioCancelShow] = useState(false)
    const [diocancelside, setDioCancelSide] = useState([])
    const [diagnosisOption, setDiagnosisOption] = useState([])
    const [procedureNameOption, setProcedureNameOption] = useState([])
    const [procedureCodeOption, setProcedureCodeOption] = useState([])
    const [inputHospital, setInputHospital] = useState("")
    const [showGP, setShowGP] = useState(false)
    const [showReferal, setShowReferal] = useState(false)
    const [showCollaborator, setShowCollaborator] = useState(false)
    const [showBilling, setShowBilling] = useState(false)
    const [showPlan, setShowPlan] = useState(false)
    const [showNotes, setShowNotes] = useState(false)
    const [showEvents, setShowEvents] = useState({
        type: "",
        status: false
    })
    const [gpData, setGpData] = useState({})
    const [referalData, setReferalData] = useState({})
    const [billingData, setBillingData] = useState({})
    const [collaboratorData, setCollaboratorData] = useState({})
    const [demographicPatient, setDemographicPatient] = useState({})
    const [warning, setWarning] = useState(false)
    const [primaryConsult, setPrimaryConsult] = useState(false)
    const [newPatient, setNewPatient] = useState('')
    const [patientStsId, setPatientStsId] = useState()
    const [planChange, setPlanChange] = useState('')
    const [notesChange, setNotesChange] = useState()
    const [planHistory, setPlanHistory] = useState([])
    const [notesHistory, setNotesHistory] = useState([])
    const [updatePlan, setUpdatePlan] = useState(false)
    const [tempeventData, setTempEventData] = useState({});
    const [procedure, setProcedure] = useState({});
    const [showCreateNewEpisode, setShowCreateNewEpisode] = useState(false);
    const [createDiagnoses, setCreateDiagnoses] = useState(false);
    const [addEpisode, setAddEpisode] = useState(false);
    const [event, setEvent] = useState({});
    const [apievent, setapiEvent] = useState({});
    const [currentCollaborator, setCurrentCollaborator] = useState({});
    const [currentGp, setCurrentGp] = useState({});
    const [currentReferal, setCurrentReferal] = useState({});
    const [currentBilling, setCurrentBilling] = useState({});
    const [warnprocedurecode, setWarnprocedurecode] = useState(false);
    const [warnstatus, setWarnstatus] = useState(false);
    const [locationddl, setLocationddl] = useState([]);
    const [currentEventDeleteId, setCurrentEventDeleteId] = useState();
    const [eventdeleteshow, setEventdeleteshow] = useState(false);
    const [deleteReason, setDeleteReason] = useState();
    const [deleteNotes, setDeleteNotes] = useState("");
    const [deleteWarn, setDeleteWarn] = useState({
        type:'',
        status: false
    });

    const [formData, setFormdata] = useState({})
    const [error, setError] = useState({
        demographics: {},
        episode: {},
        clear: true
    });
    const [requiredField, setRequiredField] = useState({
        episode: ["billingTypeId", "patientStatusId", "primaryConsultantUserId", "hospitalName"],
        gp: ["gpPractice", 'gpName', 'gpAddress1', 'gpPostCode']
    });
    const [episodeFields, setEpisodeFields] = useState(["primaryConsultantUserId", "referralSourceId", "referralPracticeName", "referrerName", "referrerSourceEmail", "referrerSourceAddress1", "referrerSourceAddress2", "referrerSourceAddress3", "referrerSourcePostCode", "patientStatusId", "billingTypeId", "embassyId", "embassyContactName", "embassyContactEmail", "embassyPreferredPhone", "embassySecondaryPhone", "billingInsuranceCompanyId", "billingInsurancePolicyNumber", "firmId", "solicitorFirmName", "solicitorName", "solicitorAddress1", "solicitorAddress2", "solicitorAddress3", "solicitorPostCode", "solicitorPreferredPhone", "solicitorContactEmail", "billingName", "billingAddress1", "billingAddress2", "billingAddress3", "billingPostCode", "billingContact", "BillingEmail", "Notes", "patientStatusHospitalName"])

    const episode = useSelector((state) => state.episode)
    const events = useSelector((state) => state.events)
    const layouts = useSelector((state) => state.layouts)
    const global = useSelector((state) => state.global)
    const episoderef = useRef();
    const eventsref = useRef();

    useEffect(() => {
        let propdata = JSON.parse(JSON.stringify(props.data))
        setShowEpisode(propdata)
        // console.log(layouts.episodepatient);
        console.log(showEpisode);
        setShowType(
            props.data?.patientEpisode?.billingTypeId == 307 ? "self" :
                props.data?.patientEpisode?.billingTypeId == 308 ? "solicitor" :
                    props.data?.patientEpisode?.billingTypeId == 309 ? "embassy" :
                        props.data?.patientEpisode?.billingTypeId == 361 ? "patientstatus" : ""
        )

        if (props.data?.patientEpisode?.patientStatusId == '361') {
            setPatientStatusIp(true)
        }
        else {
            setPatientStatusIp(false)
        }
    }, [props.data])

    const handleChange = (e) => {
        console.log(e)
        if (layouts?.episodepatient?.patientEpisodeDiagnoses?.length < e.length) {
            setDioCancelSide(e);
            setDioCancelShow(true);
            let a = [...diagnosisOption]
            let rem = e[e.length - 1]
            for (var i = 0; i < a.length; i++) {
                if (a[i].value == rem.value) {
                    console.log("if", a[i].value)
                    setCreateDiagnoses(true);
                    break;
                }
            }
        }
        else {
            let rem = diocancelside.filter(x => !e.includes(x));
            console.log('REMOVEDIAGNOSIS', rem);
            setDeleteWarn({
                type:"Diagnosis",
                status: true,
                rem,
                e
            })
        }
    }

    const handleSideSelect = (e, value, label) => {
        // debugger;
        let a = JSON.parse(JSON.stringify(diocancelside));
        let rem = a.pop();
        rem.label = rem.label.split('-')[1] ? rem.label.split('-')[1] : rem.label.split('-')[0];
        if (label != "N/A") {
            rem.label = label + ' - ' + rem.label;
        }
        rem.sideId = value;
        rem.diagnosisId = rem.value;
        a.push(rem);
        setDioCancelSide(a);
        //console.log(a);
    }

    const handleSideChange = (action) => {
        if (action == "save") {
            let a = JSON.parse(JSON.stringify(diocancelside));
            let rem = a.pop();
            if (createDiagnoses) {
                let obj = {
                    sideId: rem.sideId ? parseInt(rem.sideId) : '',
                    diagnosisId: rem.diagnosisId ? parseInt(rem.diagnosisId) : '',
                    episodeId: showEpisode.episodeId ? parseInt(showEpisode.episodeId) : null,
                    patientId: showEpisode.patientId ? parseInt(showEpisode.patientId) : null,
                    displayName: rem.label,
                    updatedByUser: 'cb675b1c-3b1a-4b9f-ae19-82de1b169d9f',
                }
                dispatch({ type: 'EPISODEDIAGNOSIS', payload: obj })
                setCreateDiagnoses(false);
            }
            else {
                let obj = {
                    new: {
                        name: rem.label.replace(" ", "").split('-')[1] ? rem.label.split('-')[1].trim() : rem.label.split('-')[0],
                        organisationId: global.orgId,
                        updatedByUser: 'cb675b1c-3b1a-4b9f-ae19-82de1b169d9f',
                    },
                    old: {
                        sideId: rem.sideId ? parseInt(rem.sideId) : '',
                        diagnosisId: rem.diagnosisId ? parseInt(rem.diagnosisId) : '',
                        episodeId: showEpisode.episodeId ? parseInt(showEpisode.episodeId) : null,
                        patientId: showEpisode.patientId ? parseInt(showEpisode.patientId) : null,
                        displayName: rem.label,
                        updatedByUser: 'cb675b1c-3b1a-4b9f-ae19-82de1b169d9f',
                    }
                }
                dispatch({ type: 'CUSTOMEPISODEDIAGNOSIS', payload: obj })
            }
        }
        else {
            let a = JSON.parse(JSON.stringify(diocancelside));
            a.pop();
            setDioCancelSide(a)
        }
    }

    const collaboratorfn = (type, data1, data2) => {
        if (type === 'field') {
            let i = JSON.parse(JSON.stringify(currentCollaborator))
            i.crntfield[data1] = data2;
            setCurrentCollaborator(i)
        }
    }

    const billingTypeHandler = (e) => {
        setShowType(e.value == 307 ? "self" : e.value == 308 ? "solicitor" : e.value == 309 ? "embassy" : "")
        dispatch({type:"BILLINGTYPE",payload:e});
        let a = JSON.parse(JSON.stringify(showEpisode));
        a.patientEpisode.billingTypeId = e.value;
        setShowEpisode(a);
        // $("#billing_clear input").val('');
    }

    const customSelectStyle = {
        control: (provided, state) => ({
            ...provided,
            background: '#f5f5f5',
            boxShadow: 'unset',
            border: '0px solid transparent',
            borderBottom: state.isFocused ? '3px solid #44b5ff' : '3px solid lightgrey',
            color: '#fff',
            minHeight: '58px',
            paddingBottom: '0px',
            paddingTop: '20px',
            paddingLeft: '0px',
            paddingRight: '0px',
            '&:hover': {
                outline: 'none',
            },
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            background: 'transparent',
            display: 'none',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            border: '0px solid transparent',
            color: '#343a40',
        }),
        option: (provided) => ({
            ...provided,
            position: 'relative',
            zIndex: '9999',
            fontFamily: 'Montreal',
            fontSize: '16px',
            color: ' #000',

        }),
        menu: (provided) => ({
            ...provided,
            zIndex: '9999',

        }),
        placeholder: (provided) => ({
            ...provided,
            fontFamily: 'Montreal',
            color: '#333333',
        }),
        input: (provided) => ({
            ...provided,
            fontFamily: 'Montreal',
            color: ' #000',
        }),
        multiValue: (provided) => ({
            ...provided,
            background: '#38B5FF',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#fff',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            ':hover': {
                background: '#90d6ff',
                color: '#fff',
            },
        }),
    }

    const customSelecterrStyle = {
        ...customSelectStyle,
        control: (provided, state) => ({
            ...provided,
            background: '#f5f5f5',
            boxShadow: 'unset',
            border: '0px solid transparent',
            borderBottom: '3px solid #dc3545',
            color: '#fff',
            minHeight: '58px',
            paddingBottom: '0px',
            paddingTop: '20px',
            paddingLeft: '0px',
            paddingRight: '0px',
            '&:hover': {
                outline: 'none',
            },
        }),
    }

    const changeHospitalName = (e) => {
        setInputHospital(e.target.value);
        let a = { ...showEpisode }
        a.patientEpisode.patientStatusHospitalName = e.target.value;
        setShowEpisode(a);
    }

    const getGpForm = (e, popupdata) => {
        if (e !== "") {
            e.preventDefault();
            let gpdata = { ...gpData }
            let showdata = { ...demographicPatient }
            const data = new FormData(e.target);
            let gpformerr = {}
            for (let [key, value] of data.entries()) {
                gpformerr[key] = value
                gpdata[key] = value
                showdata.patientDemographic[key] = value
            }
            let errres = {
                gpPractice: (gpformerr.gpPractice.trim() == "" || gpformerr.gpPractice == null || gpformerr.gpPractice == undefined) ? true : false,
                gpName: (gpformerr.gpName.trim() == "" || gpformerr.gpName == null || gpformerr.gpName == undefined) ? true : false,
                gpAddress1: (gpformerr.gpAddress1.trim() == "" || gpformerr.gpAddress1 == null || gpformerr.gpAddress1 == undefined) ? true : false,
                gpPostCode: (gpformerr.gpPostCode.trim() == "" || gpformerr.gpPostCode == null || gpformerr.gpPostCode == undefined) ? true : false,
            }
            console.log(gpformerr)
            //console.log(gpdata);
            setCurrentGp(errres)
            gpdata.episodeId = showEpisode.episodeId ? parseInt(showEpisode.episodeId) : "";
            gpdata.patientId = showEpisode.patientId ? parseInt(showEpisode.patientId) : "";
            gpdata.updatedByUser = global.loggedUserId;
            if (!Object.values(errres).some(value => value === true)) {
                setShowGP(false)
                setGpData(gpdata);
                setDemographicPatient(showdata)
                dispatch({ type: 'GPDETAILS', payload: gpdata })
            }
        }
        else {
            let a = popupdata;
            a.episodeId = showEpisode.episodeId ? parseInt(showEpisode.episodeId) : "";
            a.patientId = showEpisode.patientId ? parseInt(showEpisode.patientId) : "";
            a.updatedByUser = global.loggedUserId;
            dispatch({ type: 'GPDETAILS', payload: a })
        }
    }

    const getReferalForm = (e) => {
        e.preventDefault();
        let referaldata = { ...referalData }
        let showdata = { ...showEpisode }
        const data = new FormData(e.target);
        let referalformerr = {};
        for (let [key, value] of data.entries()) {
            referalformerr[key] = value;
            referaldata[key] = value;
            showdata.patientEpisode[key] = value;
        }
        let errres = {
            referralSourceId: (referalformerr?.referralSourceId?.trim() == "" || referalformerr?.referralSourceId == null) ? true : false,
            referrerName: (referalformerr?.referrerName?.trim() == "" || referalformerr?.referrerName == null) ? referalformerr?.referralSourceId == 67 ? false : true : false,
            referralPracticeName: (referalformerr?.referralPracticeName?.trim() == "" || referalformerr?.referralPracticeName == null) ? referalformerr?.referralSourceId == 67 ? false : true : false,
        }
        console.log(referalformerr)
        //console.log(referaldata);
        setCurrentReferal(errres)
        showdata.patientEpisode.referralSourceName = episode.episodereferalsource[showdata.patientEpisode.referralSourceId]
        referaldata.episodeId = showEpisode.episodeId ? parseInt(showEpisode.episodeId) : "";
        referaldata.patientId = showEpisode.patientId ? parseInt(showEpisode.patientId) : "";
        referaldata.updatedByUser = global.loggedUserId;
        if (!Object.values(errres).some(value => value === true)) {
            setReferalData(referaldata);
            setShowReferal(false)
            setShowEpisode(showdata);
            dispatch({ type: 'REFERALDETAILS', payload: referaldata })
        }
    }

    const getBillingForm = (e) => {
        // debugger;
        e.preventDefault();
        let billingdata = {}
        let showdata = JSON.parse(JSON.stringify(showEpisode))
        const data = new FormData(e.target);
        let billingformerr = {};
        for (let [key, value] of data.entries()) {
            if(key == "billingInsuranceCompanyId"){
                billingformerr[key] = episode.episodeinsurancecompany[value-1]["id"]
                billingdata[key] = episode.episodeinsurancecompany[value-1]["id"]
                showdata.patientEpisode[key] = episode.episodeinsurancecompany[value-1]["id"]
            }
            else{
                billingformerr[key] = value
                billingdata[key] = value
                showdata.patientEpisode[key] = value
            }
        }
        let errres = {
            billingTypeId: (billingformerr?.billingTypeId?.trim() == "" || billingformerr?.billingTypeId == undefined || billingformerr?.billingTypeId == null) ? true : false,

            billingInsuranceCompanyId: (billingformerr?.billingInsuranceCompanyId == "" || billingformerr?.billingInsuranceCompanyId == undefined || billingformerr?.billingInsuranceCompanyId == null) ? true : false,

            solicitorFirmName: (billingformerr?.solicitorFirmName?.trim() == "" || billingformerr?.solicitorFirmName == undefined || billingformerr.solicitorFirmName == null) ? true : false,

            embassyId: (billingformerr?.embassyId?.trim() == "" || billingformerr?.embassyId == null || billingformerr?.embassyId == undefined) ? true : false,

            embassyContactName: (billingformerr?.embassyContactName?.trim() == "" || billingformerr?.embassyContactName == null || billingformerr?.embassyContactName == undefined) ? true : false,
        }
        if (billingformerr.billingTypeId == "306") {
            delete errres.billingInsuranceCompanyId
            delete errres.solicitorFirmName
            delete errres.embassyId
            delete errres.embassyContactName
        }
        else if (billingformerr.billingTypeId == "307") {
            delete errres.solicitorFirmName
            delete errres.embassyId
            delete errres.embassyContactName
        }
        else if (billingformerr.billingTypeId == "308") {
            delete errres.billingInsuranceCompanyId
            delete errres.embassyId
            delete errres.embassyContactName
        }
        else if (billingformerr.billingTypeId == "309") {
            delete errres.billingInsuranceCompanyId
            delete errres.solicitorFirmName
        }
        //console.log(billingdata);
        setCurrentBilling(errres)
        showdata.patientEpisode.referralSourceName = episode.episodereferalsource[showdata.patientEpisode.referralSourceId]
        billingdata.episodeId = showEpisode.episodeId ? parseInt(showEpisode.episodeId) : "";
        billingdata.patientId = showEpisode.patientId ? parseInt(showEpisode.patientId) : "";
        billingdata.updatedByUser = global.loggedUserId;
        billingdata.firmId = billingdata.solicitorFirmName;
        billingdata.solicitorFirmName = episode.episodesolicitorfirm[billingdata.solicitorFirmName];
        billingdata.outstandingBalance = billingdata.outstandingBalance ? parseInt(billingdata.outstandingBalance) : 0;
        if (!Object.values(errres).some(value => value === true)) {
            setBillingData(billingdata);
            setShowEpisode(showdata);
            setShowBilling(false)
            dispatch({ type: 'BILLINGDETAILS', payload: billingdata })
        }
    }

    useEffect(() => {
        // debugger;
        let a = { ...showEpisode };
        if (Object.keys(a).length != 0) {
            Object.keys(episode.episodebillingdetails).some((data) => {
                a.patientEpisode[data] = episode.episodebillingdetails[data];
            })
            setShowEpisode(a);
        }
    }, [episode.episodebillingdetails])

    const getCollaboratorForm = (e) => {
        e.preventDefault();
        let collaboratordata = { ...collaboratorData }
        let currentdata = { ...currentCollaborator }
        let showdata = { ...showEpisode }
        let formdata = {};

        const data = new FormData(e.target);
        for (let [key, value] of data.entries()) {
            formdata[key] = value;
            collaboratordata[key] = value;
            // if (currentCollaborator.index !== -1) {
            //     showdata.patientEpisode.collaborators[currentCollaborator.index][key] = value
            // }
        }

        if (currentCollaborator.type == "edit") {
            collaboratordata.collaboratorId = currentCollaborator.crntfield.id ? currentCollaborator.crntfield.id : null;
            collaboratordata.collaboratoredit = true;
        }
        else{
            delete collaboratordata.collaboratoredit;
        }
        collaboratordata.patientId = showEpisode.patientId ? showEpisode.patientId : '';
        collaboratordata.episodeId = showEpisode.episodeId ? showEpisode.episodeId : '';
        collaboratordata.updatedByUser = global.loggedUserId;

        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/g;

        let errres = {
            errpractice: (formdata.practice.trim() == "" || formdata.practice == null || formdata.practice == undefined) ? true : false,
            errname: (formdata.name.trim() == "" || formdata.name == null || formdata.name == undefined) ? true : false,
            erremail: (formdata.email.trim() == "" || formdata.email == null || formdata.email == undefined) ? "Email is required" : (!emailPattern.test(formdata.email)) ? "Enter a valid email" : "",
        }
        currentdata['err'] = errres;
        setCurrentCollaborator(currentdata);
        if (!Object.values(errres).some(value => value === true) && Object.keys(errres.erremail) == "") {
            setCollaboratorData(collaboratordata);
            setShowEpisode(showdata);
            setShowCollaborator(false);
            dispatch({ type: 'COLLABORATORDETAILS', payload: collaboratordata })
            // if(currentCollaborator.type != "edit"){
            //     showdata.patientEpisode.collaborators.push(collaboratordata);
            // }
            // else{
            //     showdata.patientEpisode.collaborators.map((item, i)=>{
            //         if(item.id == currentdata.crntfield.id){
            //             showdata.patientEpisode.collaborators[i] = currentdata.crntfield
            //         }
            //     })
            // }
            // setShowEpisode(showdata);
        }
    }

    const deleteCollaborator = (id, index) => {
        // console.log(id);
        setDeleteWarn({
            type:"Collaborator",
            status: true,
            rem: id,
            e: index
        })
        console.log(id, index)
    }

    const patientstatus = (e) => {
        setPatientStsId(e.target.value)
        if (e.target.value == '361') {
            setHospitalShow(true)
        }
        else {
            setHospitalShow(false)
            setPatientStatusIp(false)
            setWarnstatus(true)
        }
        let a = {...showEpisode};
        a.patientEpisode.patientStatusId = e.target.value;
        setShowEpisode(a);
    }

    const handleHospitalData = (type) => {
        // debugger;
        //console.log(showEpisode.patientEpisode.patientStatusId);
        if (type == "popupYES") {
            let a = inputHospital;
            let dat = { ...showEpisode }
            dat.patientEpisode.patientStatusHospitalName = a;
            setShowEpisode(dat)
            let b = {
                episodeId: showEpisode.episodeId ? parseInt(showEpisode.episodeId) : "",
                patientId: showEpisode.patientId ? parseInt(showEpisode.patientId) : "",
                updatedByUser: global.loggedUserId,
                patientStatusId: parseInt(patientStsId),
                patientStatusHospitalName: a
            }
            if(parseInt(patientStsId) == 361){
                setPatientStatusIp(true)
            }
            else{
                delete b.patientStatusHospitalName;
            }
            dispatch({ type: 'HOSPITALNAME', payload: b })
            setWarnstatus(false)
        }
        else if (type == "popupNO") {
            let a = { ...showEpisode }
            a.patientEpisode.patientStatusId = layouts.episodepatient.patientEpisode.patientStatusId;
            setShowEpisode(a);
            setWarnstatus(false)
            if(layouts.episodepatient.patientEpisode.patientStatusId == 361){
                setPatientStatusIp(true)
            }
        }
    }

    const handlePrimaryConsultantChange = (e, type) => {
        if (type == "popup") {
            let a = {
                episodeId: showEpisode.episodeId ? parseInt(showEpisode.episodeId) : 0,
                patientId: showEpisode.patientId ? parseInt(showEpisode.patientId) : 0,
                updatedByUser: global.loggedUserId,
                primaryConsultantUserId: showEpisode?.patientEpisode?.primaryConsultantUserId ? showEpisode.patientEpisode.primaryConsultantUserId : "",
            }
            dispatch({ type: 'PRIMARY_CONSULTANT', payload: a })
            setWarning(false)
        }
        else if (type == "popupNO") {
            let a = { ...showEpisode }
            a.patientEpisode.primaryConsultantUserId = primaryConsult
            setShowEpisode(a);
        }
        else {
            setWarning(true);
            let a = { ...showEpisode }
            setPrimaryConsult(showEpisode.patientEpisode.primaryConsultantUserId)
            a.patientEpisode.primaryConsultantUserId = e
            setShowEpisode(a);
        }
    }

    const handlePlanChange = (e) => {
        setPlanChange(e.target.value)
        let a = { ...showEpisode }
        a.episodePlans ? (a.episodePlans.plan = e.target.value) : (a.episodePlans = { plan: e.target.value })
        setShowEpisode(a);
    }

    const sumbitPlanChange = (type) => {
        // debugger;
        if (type == 'popupYES') {
            let a = showEpisode.episodePlans.plan;
            let b = {
                episodeId: showEpisode.episodeId ? parseInt(showEpisode.episodeId) : "",
                patientId: showEpisode.patientId ? parseInt(showEpisode.patientId) : "",
                updatedByUser: global.loggedUserId,
                plan: a
            }
            dispatch({ type: 'PLANHISTORY', payload: b })
        }
        else if (type == 'popupNO') {
            let a = JSON.parse(JSON.stringify(showEpisode));
            a.episodePlans.plan = props.data.episodePlans ? props.data.episodePlans.plan : ""
            setShowEpisode(a);
        }
    }

    const handleNotesChange = (e) => {
        setNotesChange(e.target.value)
        let a = { ...showEpisode }
        a.episodeNotes ? (a.episodeNotes.notes = e.target.value) : (a.episodeNotes = { notes: e.target.value })
        setShowEpisode(a);
    }

    const sumbitNotesChange = (type) => {
        if (type == 'popupYES') {
            let a = showEpisode.episodeNotes.notes;
            let b = {
                episodeId: showEpisode.episodeId ? parseInt(showEpisode.episodeId) : "",
                patientId: showEpisode.patientId ? parseInt(showEpisode.patientId) : "",
                updatedByUser: global.loggedUserId,
                notes: a
            }
            dispatch({ type: 'NOTESHISTORY', payload: b })
        }
        else if (type == 'popupNO') {
            let a = { ...showEpisode }
            a.episodeNotes.notes = props.data.episodeNotes ? props.data.episodeNotes.notes : ""
            setShowEpisode(a);
        }
    }

    const dispatch = useDispatch();

    useEffect(() => {
        let option = [...diagnosisOption]
        if (Object.keys(events.eventdiagnosis).length != 0) {
            Object.keys(events.eventdiagnosis).map((item) => {
                let a = {
                    label: events.eventdiagnosis[item],
                    value: item
                }
                option.push(a)
            })
        }
        setDiagnosisOption(option);
    }, [events.eventdiagnosis])

    useEffect(()=>{
        if(layouts.newaddepisodediagnosis != ""){
            let a = [...diagnosisOption];
            let obj = {
                label: layouts?.newaddepisodediagnosis?.diagnosisName,
                value: layouts?.newaddepisodediagnosis?.diagnosisId
            }
            a.push(obj);
            setDiagnosisOption(a);
        }
    },[layouts.newaddepisodediagnosis])

    useEffect(() => {
        let option = [];
        if (Object.keys(events.eventprocedurename).length != 0) {
            Object.keys(events.eventprocedurename).some((item) => {
                let a = {
                    label: events.eventprocedurename[item],
                    value: item
                }
                option.push(a);
            })
        }
        setProcedureNameOption(option);
    }, [events.eventprocedurename])

    useEffect(() => {
        let option = {...tempeventData};
        let operationoption = {...procedure};
        if (events.eventprocedurename1 != "") {
            if(showEvents.type != "Operation" ){
                option.procedureId = Object.keys(events.eventprocedurename1)[0];
                setTempEventData(option)
            }
            else{
                if(showEvents.new){
                    operationoption.procedureId = {
                        id: Object.keys(events.eventprocedurename1)[0],
                        name: Object.values(events.eventprocedurename1)[0],
                        value: Object.keys(events.eventprocedurename1)[0],
                        label: Object.values(events.eventprocedurename1)[0]
                    }
                    setProcedure(operationoption)
                }
                else{
                    option.procedureId = Object.keys(events.eventprocedurename1)[0];
                    setTempEventData(option)
                }
            }
        }
    }, [events.eventprocedurename1])

    useEffect(() => {
        let option = [];
        if (Object.keys(events.eventprocedurecode).length != 0) {
            Object.keys(events.eventprocedurecode).some((item) => {
                let a = {
                    label: events.eventprocedurecode[item],
                    value: item
                }
                option.push(a);
            })
        }
        setProcedureCodeOption(option);
    }, [events.eventprocedurecode])

    useEffect(() => {
        let option = [];
        if (layouts?.episodepatient?.patientEpisodeDiagnoses?.length != 0 && layouts?.episodepatient.patientEpisodeDiagnoses) {
            layouts?.episodepatient?.patientEpisodeDiagnoses.map((item) => {
                let a = {
                    label: (item.sideName != "" && item.sideName != "N/A" ? item.sideName + '-' : "") + item.diagnosisName,
                    value: item.episodeDiagnosisId,
                    sideId: item.sideId ? item.sideId : "",
                    diagnosisId: item.diagnosisId ? item.diagnosisId : ""
                }
                option.push(a)
            })
        }
        setDioCancelSide(option);
    }, [JSON.stringify(layouts.episodepatient)])

    useEffect(() => {
        let plan = episode.episodeshowplan;
        let notes = episode.episodeshownotes;
        setPlanHistory(plan)
        setNotesHistory(notes)
    }, [episode])

    useEffect(() => {
        dispatch({ type: 'EVENTSIDE' })
        dispatch({ type: 'EPISODEPATIENTSTATUS' })
        dispatch({ type: 'EPISODEBILLINGTYPE' })
        dispatch({ type: 'EPISODEREFERALSOURCE' })
        dispatch({ type: 'EPISODEEMBASSYID' })
        dispatch({ type: 'EPISODEINSURANCECOMPANY' })
        dispatch({ type: 'ADDDIAGNOSIS', payload: global.orgId })
    }, [])

    useEffect(() => {
        //console.log("data", props.gpdata)
        setDemographicPatient(props.gpdata)
    }, [props.gpdata])

    const handleEvent = (type, new1, data) => {
        setShowEvents({
            status: true,
            type: (type == "Clinic Appt" || type == "Clinic appointment") ? "Clinic appointment"
                : (type == "Outpatient Procedures" || type == "Outpatient procedure") ? "Outpatient procedure"
                    : (type == "Inpatient Visit" || type == "Inpatient visit") ? "Inpatient visit"
                        : "Operation",
            new: new1,
            eventId: (type == "Clinic Appt" || type == "Clinic appointment") ? data?.eventOutpatientApptId
                : (type == "Outpatient Procedures" || type == "Outpatient procedure") ? data?.eventOutpatientProcedureId
                    : (type == "Inpatient Visit" || type == "Inpatient visit") ? data?.eventInpatientVisitId
                        : data?.eventOperationId
        });
        if (type == 'Clinic appointment' || type == "Clinic Appt") {
            let now = new Date()
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            let date = now.toISOString().slice(0, 16)
            let myArray = date.split("T");
            myArray[0] = myArray[0].split('-').reverse().join("/");
            myArray = myArray.join("T")
            let a = {};
            if (!data) {
                a.scheduleDate = myArray;
                a.billingId= {
                    value: layouts.episodepatient.patientEpisode.billingTypeId,
                    id: layouts.episodepatient.patientEpisode.billingTypeId,
                    name: layouts.episodepatient.patientEpisode.billingTypeName
                }
            }
            else {
                dispatch({ type: "GETEVENT1", payload: data.eventOutpatientApptId })
            }
            setTempEventData(a)
        }
        if (type == 'Outpatient procedure' || type == "Outpatient Procedures") {
            let now = new Date()
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            let date = now.toISOString().slice(0, 16)
            let myArray = date.split("T");
            myArray[0] = myArray[0].split('-').reverse().join("/");
            myArray = myArray.join("T")
            let a = {}
            if (!data) {
                a.procedureDate = myArray;
                a.billingId= {
                    value: layouts.episodepatient.patientEpisode.billingTypeId,
                    id: layouts.episodepatient.patientEpisode.billingTypeId,
                    name: layouts.episodepatient.patientEpisode.billingTypeName
                }
            }
            else {
                dispatch({ type: "GETEVENT2", payload: data.eventOutpatientProcedureId })
            }
            setTempEventData(a)
        }
        if (type == 'Operation') {
            let a = {};
            if (!data) {
                a.isXrayRequired = false;
                a.billingId= {
                    value: layouts.episodepatient.patientEpisode.billingTypeId,
                    id: layouts.episodepatient.patientEpisode.billingTypeId,
                    name: layouts.episodepatient.patientEpisode.billingTypeName
                }
            }
            else {
                dispatch({ type: "GETEVENT3", payload: data.eventOperationId })
            }
            setTempEventData(a)
        }
        if (type == 'Inpatient visit' || type == "Inpatient Visit") {
            let now = new Date()
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            let date = now.toISOString().slice(0, 16)
            let myArray = date.split("T");
            myArray[0] = myArray[0].split('-').reverse().join("/");
            myArray = myArray.join("T")
            let a = {}
            if (!data) {
                a.procedureDate = myArray;
                a.procedureId = 2043;
                a.procedureCode = "353";
                a.billingId= {
                    value: layouts.episodepatient.patientEpisode.billingTypeId,
                    id: layouts.episodepatient.patientEpisode.billingTypeId,
                    name: layouts.episodepatient.patientEpisode.billingTypeName
                }
            }
            else {
                dispatch({ type: "GETEVENT4", payload: data.eventInpatientVisitId })
            }
            setTempEventData(a)
        }

        dispatch({ type: 'EVENTPROCEDURENAMELOAD' })
        dispatch({ type: 'EVENTPROCEDURECODELOAD' })
    }

    const deleteEvent = () =>{
        let obj = {
            ...currentEventDeleteId,
            reasonId: deleteReason,
            deleteNotes: deleteNotes,
            episodeId: showEpisode.episodeId,
            updateByUser: global.loggedUserId
        }
        if(!(deleteReason == 378 && obj.deleteNotes == "")){
            dispatch({type:"DELETEEVENT",payload: obj})
        }   
    }

    useEffect(() => {
        if (Object.keys(layouts.getevent1).length != 0) {
            let a = {
                organisationId: global.orgId,
                scheduleDate: layouts.getevent1.scheduleDate.split("T")[0].split('-').reverse().join("/") + "T" + layouts.getevent1.scheduleDate.split("T")[1].slice(0, 5),
                fee: layouts.getevent1.fee,
                locationId: layouts.getevent1.locationId,
                OutpatientApptCategoryId: layouts.getevent1.categoryId,
                typeId: layouts.getevent1.typeId,
                billingId: {
                    id: layouts.getevent1.billingId,
                    name: ""
                },
                durationInMinutes: layouts.getevent1.durationInMinutes,
                notes: layouts.getevent1.notes,
            }
            setTempEventData(a);
        }
    }, [layouts.getevent1])

    useEffect(() => {
        if (Object.keys(layouts.getevent2).length != 0) {
            let a = {
                organisationId: global.orgId,
                procedureDate: layouts.getevent2.procedureDate.split("T")[0].split('-').reverse().join("/") + "T" + layouts.getevent2.procedureDate.split("T")[1].slice(0, 5),
                procedureId: layouts.getevent2.procedureId,
                procedureCode: layouts.getevent2.procedureCode,
                fee: layouts.getevent2.fee,
                billingId: {
                    id: layouts.getevent2.billingId,
                    name: ""
                },
                notes: layouts.getevent2.notes,
            }
            setTempEventData(a);
        }
    }, [layouts.getevent2])

    useEffect(() => {
        if (Object.keys(layouts.getevent3).length != 0) {
            let a = {
                organisationId: global.orgId,
                operationDate: (layouts.getevent3.operationDate != null) ? layouts.getevent3.operationDate.split("T")[0].split('-').reverse().join("/") + "T" + layouts.getevent3.operationDate.split("T")[1].slice(0, 5) : null,
                billingId: {
                    id: layouts.getevent3.billingId,
                    name: ""
                },
                locationId: layouts.getevent3.locationId,
                anaeastheticId: layouts.getevent3.anaeastheticId,
                estimatedTimeInMin: layouts.getevent3.estimatedTimeInMin,
                lengthOfStay: layouts.getevent3.lengthOfStay,
                isXrayRequired: layouts.getevent3.isXrayRequired,
                additionalTheaterInfo: layouts.getevent3.additionalTheaterInfo,
                tcistatusId: layouts.getevent3.tcistatusId,
                side: layouts.getevent3.side,
                procedureId: layouts.getevent3.procedureId,
                procedureCode: layouts.getevent3.procedureCode,
                fee: layouts.getevent3.fee,
            }
            setTempEventData(a);
        }
    }, [layouts.getevent3])

    useEffect(() => {
        if (Object.keys(layouts.getevent4).length != 0) {
            let a = {
                organisationId: global.orgId,
                procedureDate: layouts.getevent4.procedureDate.split("T")[0].split('-').reverse().join("/") + "T" + layouts.getevent4.procedureDate.split("T")[1].slice(0, 5),
                procedureCode: layouts.getevent4.procedureCode,
                hospitalId: layouts.getevent4.locationId,
                locationId: layouts.getevent4.locationId,
                fee: layouts.getevent4.fee,
                billingId: {
                    id: layouts.getevent4.billingId,
                    name: ""
                },
            }
            setTempEventData(a);
        }
    }, [layouts.getevent4])

    const tempeventDatafn = (key, value, formno, file) => {
        let a = { ...tempeventData };
        let p = { ...procedure };
        if (!file) {
            if ((key == 'procedureId' || key == 'procedureCode' || key == 'fee' || key == 'side') && formno == "form3" && showEvents.new) {
                let res = { ...procedure };
                res[key] = value;
                setProcedure(res);
                if(value != ""){
                    delete (p[key]);
                }
            }
            else if ((value + "") != '' || typeof value == "boolean") {
                if (key == 'scheduleDate' && formno == "form1" || key == 'procedureDate' && formno == "form2" || key == 'operationDate' && formno == "form3" || key == 'procedureDate' && formno == "form4") {
                    value = value.split("T")[0].split('-').reverse().join("/") + "T" + value.split("T")[1];
                }
                a[key] = value;
            }
            else {
                delete (a[key]);
            }
            if(key=="OutpatientApptCategoryId"){
                if(global.currentPrimaryConsultant !== ""){
                    if(global.getClinicAppointmentMinuts !== ""){
                        if(value.name=="New" && global.getClinicAppointmentMinuts.newClinicAppointmentMinuts != null){
                            a.durationInMinutes = global?.getClinicAppointmentMinuts?.newClinicAppointmentMinuts
                        }
                        else if(global.getClinicAppointmentMinuts.followUpClinicAppointmentMinuts != null){
                            a.durationInMinutes = global?.getClinicAppointmentMinuts?.followUpClinicAppointmentMinuts
                        }
                    }
                    a.fee = value.name!="New" ? (layouts?.clinicfee?.followupFee ? layouts?.clinicfee?.followupFee : a.fee) : (layouts?.clinicfee?.newFee ? layouts?.clinicfee?.newFee : a.fee)
                }
            }
            if(key=="billingId"){
                if(formno == "form1"){

                    let obj = {
                        userId: global.currentPrimaryConsultant,
                        billingTypeId: value.id,
                        insurerId : value.id == 307 ? global.insurerName.insurerId : ""
                    }

                    dispatch({type:"GETCLINICFEE",payload:obj})
                }
                if(formno == "form2" || formno == "form3"){
                    if(value.id == 306){
                        let i = {...procedure};
                        if(a.procedureId && formno == "form2"){
                            let obj1 = {
                                procedureNameId: a.procedureId,
                                organisationId: global.orgId
                            }
                            dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })   
                        }
                        if(i.procedureId && formno == "form3"){
                            let obj1 = {
                                procedureNameId: i.procedureId?.id,
                                organisationId: global.orgId
                            }
                            dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })   
                        }
                    }
                    else{
                        delete a.fee;
                        dispatch({type:"EVENTPROCEDUREFEE_SUCCESS" , payload: ""})
                    }
                }
            }
            if(key=="locationId" || key=="hospitalId"){
                let found = false;
                for (var i = 0; i < locationddl.length; i++) {
                    if (locationddl[i].value == value.locationId) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    let obj = {
                        name: value.locationId,
                        createByUser: global.loggedUserId
                    }
                    dispatch({ type: 'ADDHOSPITAL', payload: obj })
                }
            }
            if (key == "procedureId") {
                if(formno == "form2"){
                    let found = false;
                    for (var i = 0; i < procedureNameOption.length; i++) {
                        if (procedureNameOption[i].value == value) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        dispatch({ type: 'EVENTPROCEDURECODE', payload: value })
                        if (a?.billingId?.id == 306) {
                            let obj1 = {
                                procedureNameId: value,
                                organisationId: global.orgId
                            }
                            dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })
                        }
                    }
                    else {
                        console.log("else..");
                        let obj = {
                            organisationId: global.orgId,
                            procedureName: value,
                            updatedByUser: global.loggedUserId
                        }
                        dispatch({ type: 'ADDPROCEDURENAME', payload: obj })
                        setProcedureCodeOption([])
                    }
                }
                if(formno == "form3"){
                    let found = false;
                    for (var i = 0; i < procedureNameOption.length; i++) {
                        if (procedureNameOption[i].value == (showEvents.new ? value.id : value)) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        dispatch({ type: 'EVENTPROCEDURECODE', payload: (showEvents.new ? value.id : value) })
                        if(showEvents.new){
                            let i = {...procedure};
                            if (a?.billingId?.id == 306) {
                                let obj1 = {
                                    procedureNameId: value.value,
                                    organisationId: global.orgId
                                }
                                dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })
                            }
                        }
                        else{
                            if (a.procedureCode && a?.billingId?.id == 306) {
                                let obj1 = {
                                    procedureNameId: value,
                                    organisationId: global.orgId,
                                    procedureCodeId: a?.procedureCode
                                }
                                dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })
                            }
                        }
                    }
                    else {
                        console.log("else..");
                        let obj = {
                            organisationId: global.orgId,
                            procedureName: (showEvents.new ? value.value : value),
                            updatedByUser: global.loggedUserId
                        }
                        dispatch({ type: 'ADDPROCEDURENAME', payload: obj })
                        setProcedureCodeOption([])
                    }
                }
            }
            if (key == "procedureCode") {
                if(formno == "form2"){
                    let found = false;
                    for (var i = 0; i < procedureCodeOption.length; i++) {
                        if (procedureCodeOption[i].value == value) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        dispatch({ type: 'EVENTPROCEDURENAME1', payload: value })
                    }
                    else {
                        if (a.procedureId) {
                            console.log("else..");
                            let obj = {
                                organisationId: global.orgId,
                                procedureNameid: a?.procedureId,
                                procedureCode: value,
                                updatedByUser: global.loggedUserId
                            }
                            dispatch({ type: 'ADDPROCEDURECODE', payload: obj })
                            a.fee = 0;
                        }
                        else {
                            setWarnprocedurecode(true)
                        }
                    }
                }
                if (formno == "form3") {
                    let found = false;
                    for (var i = 0; i < procedureCodeOption.length; i++) {
                        if (procedureCodeOption[i].value == (showEvents.new ? value.id : value)) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        dispatch({ type: 'EVENTPROCEDURENAME1', payload: (showEvents.new ? value.id : value) })
                        let i = { ...procedure }
                        if(showEvents.new){
                            if (i.procedureId && a?.billingId?.id == 306) {
                                let obj1 = {
                                    procedureCodeId : value.id,
                                    organisationId : global.orgId,
                                    procedureNameId : i?.procedureId.id
                                }
                                dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })
                            }
                        }
                        else{
                            if (a.procedureId && a?.billingId?.id == 306) {
                                let obj1 = {
                                    procedureCodeId : value,
                                    organisationId : global.orgId,
                                    procedureNameId : a?.procedureId
                                }
                                dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })
                            }
                        }
                    }
                    else {
                        let i = { ...procedure }
                        let t = { ...tempeventData }
                        let obj = {
                            organisationId: global.orgId,
                            procedureNameid: showEvents.new ? i.procedureId.id : t.procedureId,
                            procedureCode: (showEvents.new ? value.value : value),
                            updatedByUser: global.loggedUserId
                        }
                        dispatch({ type: 'ADDPROCEDURECODE', payload: obj })
                    }
                }
            }
        }
        else {
            if (value.currentTarget.files && value.currentTarget.files[0]) {

                a[key] = {
                    name: value.currentTarget.files[0].name,
                    url: ''
                }
                let reader = new FileReader();
                reader.onload = (e) => {
                    a[key].url = reader.result
                };
                reader.readAsDataURL(value.currentTarget.files[0]);
            }
        }
        setTempEventData(a)
        console.log(a);
    }

    const getEventData = (e, extra) => {
        if (extra == 'procedures') {
            let a = { ...tempeventData };
            let b = { ...procedure };
            // console.log(procedure)
            a['procedures'] = a['procedures'] ? a['procedures'] : [];
            a['procedures'].push(b)
            if (a.err) {
                a.err.procedure = "";
            }
            setProcedure([])
            setTempEventData(a)

            dispatch({ type: 'EVENTPROCEDURENAMELOAD' })
            dispatch({ type: 'EVENTPROCEDURECODELOAD' })
        }
        else {
            e.preventDefault();
            let err = {}
            const data = new FormData(e.target);
            let a = { ...tempeventData };
            for (let [key, value] of data.entries()) {
                data[key] = value;
                if (!(key == "fileName" || key == "additionalTheaterInfo")) {
                    if (!((key == "procedureId" || key == "fee" || key == "procedureCode" || key == "side" || key == "locationId" || key == "operationDate") && (showEvents.type == "Operation"))) {
                        if ((value.trim() == "" || value.trim() == null || value.trim() == undefined)) {
                            err[key] = key + " required"
                        }
                    }
                }
            }

            if (!data.OutpatientApptCategoryId && showEvents.type == "Clinic appointment") {
                err.OutpatientApptCategoryId = "categoryId required"
            }
            if ((!a?.procedures) && showEvents.type == "Operation" && showEvents.new) {
                err.procedure = "minimum one procedure required"
            }
            if (a?.procedures?.length == 0 && showEvents.type == "Operation") {
                err.procedure = "minimum one procedure required"
            }
            if (Object.keys(err).length == 0) {
                setTempEventData({});
                if (showEvents.type == "Clinic appointment") {
                    let res = {
                        patientEpisodeId: showEpisode.episodeId,
                        eventOutpatientApptDtos: [],
                        eventOutpatientProcedureDtos: [],
                        eventOperationDtos: [],
                        eventInpatientVisitDtos: []
                    }
                    a.billingId = (typeof a.billingId == "object") ? (a.billingId ? a.billingId.id : '') : (a.billingId);
                    a.OutpatientApptCategoryId = (typeof a.OutpatientApptCategoryId == "object") ? (a.OutpatientApptCategoryId ? a.OutpatientApptCategoryId.id : '') : (a.OutpatientApptCategoryId);
                    a.fileName = a.fileName ? a.fileName.name : '';
                    if(showEvents.new){
                        a.locationName = a.locationId ? a.locationId.locationName : null;
                        a.locationId = a.locationId ? a.locationId.locationId : null
                    }
                    a.fileLink = "";
                    a.notes = "";
                    a.patientEpisodeId = showEpisode.episodeId;
                    a.updatedByUser = global.loggedUserId;
                    a.organisationId = global.orgId;
                    delete a.err;
                    res.eventOutpatientApptDtos.push(a);
                    if (showEvents.new) {
                        dispatch({ type: "OUTPATIENTAPPT", payload: res })
                    }
                    else {
                        a.eventId = showEvents.eventId;
                        dispatch({ type: "UPDATEOUTPATIENTAPPT", payload: a })
                    }
                    setShowEvents({
                        status: false,
                        type: ""
                    })
                    setProcedure({})
                    setTempEventData(a);
                    
                }
                if (showEvents.type == "Outpatient procedure") {
                    let res = {
                        patientEpisodeId: showEpisode.episodeId,
                        eventOutpatientApptDtos: [],
                        eventOutpatientProcedureDtos: [],
                        eventOperationDtos: [],
                        eventInpatientVisitDtos: []
                    }
                    a.billingId = (typeof a.billingId == "object") ? (a.billingId ? a.billingId.id : '') : (a.billingId);
                    a.procedureId = (typeof a.procedureId == "object") ? (a.procedureId ? a.procedureId.id : '') : (a.procedureId);
                    a.procedureCode = (typeof a.procedureCode == "object") ? (a.procedureCode ? a.procedureCode.id : '') : (a.procedureCode);
                    a.fileName = a.fileName ? a.fileName.name : '';
                    a.fileLink = "";
                    a.notes = "";
                    a.patientEpisodeId = showEpisode.episodeId;
                    a.updatedByUser = global.loggedUserId;
                    a.organisationId = global.orgId;
                    delete a.err;
                    res.eventOutpatientProcedureDtos.push(a)
                    if (showEvents.new) {
                        dispatch({ type: "OUTPATIENTPROCEDURE", payload: res })
                    }
                    else {
                        a.eventId = showEvents.eventId;
                        dispatch({ type: "UPDATEOUTPATIENTPROCEDURE", payload: a })
                    }
                    setShowEvents({
                        status: false,
                        type: ""
                    })
                }
                if (showEvents.type == "Operation") {
                    let res = {
                        patientEpisodeId: showEpisode.episodeId,
                        eventOutpatientApptDtos: [],
                        eventOutpatientProcedureDtos: [],
                        eventOperationDtos: [],
                        eventInpatientVisitDtos: []
                    }
                    let c = [];
                    a.billingId = (typeof a.billingId == "object") ? (a.billingId ? a.billingId.id : '') : (a.billingId);
                    a.fileName = a.fileName ? a.fileName.name : '';
                    a.fileLink = "";
                    a.notes = "";
                    a.patientEpisodeId = showEpisode.episodeId;
                    a.organisationId= global.orgId;
                    a.lengthOfStay= Number(a.lengthOfStay);
                    a.updatedByUser = global.loggedUserId;
                    a.organisationId = global.orgId;
                    if(showEvents.new){
                        a.locationName = a.locationId ? a.locationId.locationName : null;
                        a.locationId = a.locationId ? a.locationId.locationId : null;
                    }
                    delete a.err;

                    if (a.procedures) {
                        a.procedures.some((dat, i) => {
                            const obj = {
                                ...a,
                                procedureCode: dat.procedureCode.id,
                                procedureId: dat.procedureId.id,
                                fee: dat.fee,
                                side: Number(dat.side.id)
                            }
                            delete obj.procedures;
                            c.push(obj)
                        })
                    }
                    res.eventOperationDtos = c;
                    if (showEvents.new) {
                        dispatch({ type: "OPERATION", payload: res })
                    }
                    else {
                        a.eventId = showEvents.eventId;
                        dispatch({ type: "UPDATEOPERATION", payload: a })
                    }
                    setShowEvents({
                        status: false,
                        type: ""
                    })
                    setProcedure({})
                }
                if (showEvents.type == "Inpatient visit") {
                    let res = {
                        patientEpisodeId: showEpisode.episodeId,
                        eventOutpatientApptDtos: [],
                        eventOutpatientProcedureDtos: [],
                        eventOperationDtos: [],
                        eventInpatientVisitDtos: []
                    }
                    a.billingId = (typeof a.billingId == "object") ? (a.billingId ? a.billingId.id : '') : (a.billingId);
                    a.fileName = a.fileName ? a.fileName.name : '';
                    a.fileLink = "";
                    a.notes = "";
                    a.patientEpisodeId = showEpisode.episodeId;
                    a.procedureId = 2043;
                    a.procedureCode = parseInt(a.procedureCode);
                    a.updatedByUser = global.loggedUserId;
                    a.organisationId = global.orgId;
                    if(showEvents.new){
                        a.locationId = a.hospitalId ? a.hospitalId.locationId : null;
                        a.locationName = a.hospitalId ? a.hospitalId.locationName : null;
                        a.hospitalName = a.hospitalId ? a.hospitalId.hospitalName : null;
                        a.hospitalId = a.hospitalId ? a.hospitalId.hospitalId : null;
                    }
                    delete a.err;
                    res.eventInpatientVisitDtos.push(a);
                    if (showEvents.new) {
                        dispatch({ type: "INPATIENTVISIT", payload: res })
                    }
                    else {
                        a.eventId = showEvents.eventId;
                        dispatch({ type: "UPDATEINPATIENTVISIT", payload: a })
                    }
                    setShowEvents({
                        status: false,
                        type: ""
                    })
                }
            }
            else {
                let a = { ...tempeventData };
                a.err = err;
                setTempEventData(a);
            }
        }
    }

    const innerhandleDelete = (index) => {
        // debugger;
        let i = { ...tempeventData };
        let res = i.procedures.filter((item, i) => i !== index);
        i.procedures = res;
        //console.log(res)
        setTempEventData(i)
    }

    const selectEpisode = (episodeId) => {
        dispatch({ type: "SELECT_EPISODE", payload: episodeId })
        setShowCreateNewEpisode(false)
    }

    useEffect(() => {
        if (!error.clear) {
            dispatch({ type: 'ADD_EPISODE', payload: formData })
        }
    }, [error])

    const submitForm = async (e) => {
        // debugger;
        e.preventDefault();
        let formdata = { ...formData }
        const data = new FormData(e.target);
        for (let [key, value] of data.entries()) {
            formdata[key] = value
        }
        let err = { ...error }
        let res1 = {};
        let res2 = {};
        formdata.PatientEpisodes = formdata.PatientEpisodes ? formdata.PatientEpisodes : {};
        formdata.PatientEpisodes.collaborators = formdata.PatientEpisodes.collaborators ? formdata.PatientEpisodes.collaborators : [];
        formdata.PatientEpisodes.patientEpisodeEvents = formdata.PatientEpisodes.patientEpisodeEvents ? formdata.PatientEpisodes.patientEpisodeEvents : [];
        Object.keys(formdata).some((data, i) => {

            requiredField.episode.some((field, j) => {

                if (data == field) {
                    if (formdata[data] == "" || formdata[data] == undefined) {
                        if (field == "email") {
                            if (formdata.category == "1") {
                                res2[field] = 'Email is required'
                            }
                        }
                        else {
                            res2[field] = field + ' is required'
                        }
                    }
                }
            })
            requiredField.gp.some((field, j) => {
                if (data == field) {
                    if (formdata[data] == "" || formdata[data] == undefined) {
                        if (field == "email") {
                            if (formdata.category == "1") {
                                res1[field] = 'Email is required'
                            }
                        }
                        else {
                            res1[field] = field + ' is required'
                        }
                    }
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

        let gpdata = {};

        Object.keys(formdata).some((data, i) => {
            episodeFields.some((field, j) => {
                if (Object.keys(formdata).includes(field)) {
                    delete formdata[field];
                }
            })
            if (data.includes('gp')) {
                gpdata[data] = formdata[data];
                delete formdata[data];
            }
        })

        err.episode = res2;
        err.gp = res1;
        if (Object.keys(err.episode).length == 0 && Object.keys(err.gp).length == 0) {
            err.clear = false;
            getGpForm("", gpdata)
        }
        setFormdata(formdata);
        await episoderef.current.getformData()
        await eventsref.current.getName()
        await eventsref.current.getapiName()
        formdata.patientId = showEpisode?.patientId;
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
        console.log(formdata, err);
        setError(err);
    }

    useEffect(() => {
        if (Object.keys(layouts.patient).length !== 0) {
            if (layouts?.patient?.status == 200) {
                setAddEpisode(false)
                setShowCreateNewEpisode(false)
                setFormdata({});
                setEvent({})
                setCollaborator({})
                setapiEvent({})
            }
            if (layouts?.patient?.data?.patientEpisodes?.patientEpisodeEvents.length !== 0) {
                if (apievent?.eventInpatientVisitDtos?.length > 0 || apievent?.eventOperationDtos?.length > 0 || apievent?.eventOutpatientApptDtos?.length > 0 || apievent?.eventOutpatientProcedureDtos?.length > 0) {
                    let a = apievent;
                    a.patientEpisodeId = layouts.patient.data.episodeId;
                    dispatch({ type: 'ADDEVENTS', payload: a })
                }
            }
            let err = JSON.parse(JSON.stringify(error));
            err.clear = true;
            setError(err);
        }
    }, [layouts.patient]);

    const collaboratorEdit = (data, type, index) => {
        let obj = {
            crntfield: data,
            type: type,
            index: index
        }
        setCurrentCollaborator(obj)
        setShowCollaborator(true)
    }

    useEffect(() => {
        let a = { ...tempeventData };
        let b = { ...procedure };
        if (Object.keys(a).length != 0) {
            a.fee = events.eventprocedurefee;
            setTempEventData(a)
        }
        if (Object.keys(b).length != 0) {
            b.fee = events.eventprocedurefee;
            setProcedure(b)
        }
    }, [events.eventprocedurefee])

    useEffect(() => {
        let b = { ...tempeventData };
        let c = { ...procedure };
        if (Object.keys(b).length != 0 && showEvents.type == "Outpatient procedure") {
            b.procedureId = events.addprocedurename.key;
            delete b.procedureCode
            setTempEventData(b)
        }
        if (showEvents.type == "Operation") {
            if(showEvents.new){
                if(showEvents.new){
                    if(Object.keys(c).length != 0 ){
                        c.procedureId = {
                            id: events.addprocedurename.key,
                            label: events.addprocedurename.value,
                            name: events.addprocedurename.value,
                            value: events.addprocedurename.key,
                        }
                        delete c.procedureCode
                        setProcedure(c)
                    }
                }
            }
            else{
                b.procedureId = events.addprocedurename.key;
                delete b.procedureCode
                setTempEventData(b)
            }
        }
        let a = [...procedureNameOption];
        let obj = {
            label: events.addprocedurename.value,
            value: events.addprocedurename.key,
        }
        a.push(obj);
        setProcedureNameOption(a);

    }, [events.addprocedurename])

    useEffect(() => {
        let b = { ...tempeventData };
        let c = { ...procedure };
        if (Object.keys(b).length != 0 && showEvents.type == "Outpatient procedure") {
            b.procedureCode = events.addprocedurecode.key;
            setTempEventData(b)
        }
        if (showEvents.type == "Operation") {
            if(showEvents.new){
                if(Object.keys(c).length != 0 ){
                    c.procedureCode = {
                        id: events.addprocedurecode.key,
                        label: events.addprocedurecode.value,
                        name: events.addprocedurecode.value,
                        value: events.addprocedurecode.key,
                    }
                    setProcedure(c)
                }
            }
            else{
                b.procedureCode = events.addprocedurecode.key;
                setTempEventData(b)
            }
        }
        let a = [...procedureCodeOption];
        let obj = {
            label: events.addprocedurecode.value,
            value: events.addprocedurecode.key,
        }
        a.push(obj);
        setProcedureCodeOption(a);

    }, [events.addprocedurecode])

    useEffect(() => {
        if(layouts.clinicfee != ""){
            let a = { ...tempeventData };
            a.fee = a.OutpatientApptCategoryId?.id == 320 ? layouts?.clinicfee?.followupFee : layouts?.clinicfee?.newFee
            setTempEventData(a);
        }
    }, [layouts.clinicfee])

    useEffect(()=>{
        let option = [];
        Object.keys(events.eventhospitalname).map((data, i) =>{
            let d = {
                value: data,
                label:events.eventhospitalname[data]
            }
            option.push(d);
        })
        setLocationddl(option);
    },[events.eventhospitalname])

    useEffect(() => {
        if(layouts.addhospital != ""){
            let b = { ...tempeventData };
            if (showEvents.type != "Outpatient procedure"){
                b.locationId = {
                    locationId : layouts.addhospital.key,
                    locationName: layouts.addhospital.value
                };
            }
            else{
                b.hospitalId = {
                    hospitalId : layouts.addhospital.key,
                    hospitalName: layouts.addhospital.value,
                    locationId : layouts.addhospital.key,
                    locationName: layouts.addhospital.value
                };
            }
            setTempEventData(b)
            let a = [...locationddl];
            let obj = {
                label: layouts.addhospital.value,
                value: layouts.addhospital.key,
            }
            a.push(obj);
            setLocationddl(a);
        }
    }, [layouts.addhospital])

    return (
        <>
            <div className='row m-lg-0'>
                <div className='col-md-6'>
                    <div className='mt-4'>
                        <h3>EPISODE INFORMATION</h3>
                        <div className='border-frame'>
                            <div className='details_Input'>
                                <div className="form-floating mb-2">
                                    <select
                                        className="form-select"
                                        id="ReferralSource"
                                        aria-label="Floating label select Source"
                                        name="primaryConsultantUserId"
                                        disabled={!global.layoutedit}
                                        value={showEpisode ? showEpisode.patientEpisode?.primaryConsultantUserId : ""}
                                        onChange={(e) => {
                                            handlePrimaryConsultantChange(e.target.value, "outer");
                                            // setShowEpisode(e.target.value);
                                        }}
                                    >
                                        <option hidden></option>
                                        {
                                            Object.keys(episode.episodeprimaryconsultant).map((data, i) =>
                                                <option value={data}>{episode.episodeprimaryconsultant[data]}</option>
                                            )
                                        }
                                    </select>
                                    <label className='form-label mb-2'>Primary Consultant</label>
                                </div>

                                <div className='my-3'>
                                    <div className="form-floating mb-2">
                                        <label className='form-label pt-1 m-0 input-label-asw'>Diagnosis</label>
                                        <CreatableSelect
                                            value={diocancelside}
                                            isMulti
                                            styles={customSelectStyle}
                                            isClearable={false}
                                            placeholder={false}
                                            createOptionPosition="first"
                                            name="colors"
                                            options={diagnosisOption}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={(e) => { handleChange(e) }}
                                            isDisabled={!global.layoutedit}
                                        />
                                    </div>
                                </div>

                                <div className="my-3 position-relative">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="button-tooltip">Update GP Details</Tooltip>}
                                    >
                                        <button className="editicon" onClick={(e) => { setShowGP(true) }} disabled={!global.layoutedit}><GrEdit /></button>
                                    </OverlayTrigger>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" readOnly id="PracticeName" disabled={!global.layoutedit}
                                            defaultValue={demographicPatient?.patientDemographic ?
                                                (
                                                    (demographicPatient?.patientDemographic?.gpName ? (demographicPatient?.patientDemographic?.gpName) : '') +
                                                    (demographicPatient?.patientDemographic?.gpName?.length > 0 ? ', ' : '') +
                                                    (demographicPatient?.patientDemographic?.gpPractice ? (demographicPatient?.patientDemographic?.gpPractice) : '') +
                                                    (demographicPatient?.patientDemographic?.gpPractice?.length > 0 ? ', ' : '') +
                                                    (demographicPatient?.patientDemographic?.gpAddress1 ? (demographicPatient?.patientDemographic?.gpAddress1) : '') +
                                                    (demographicPatient?.patientDemographic?.gpAddress1?.length > 0 ? ', ' : '') +
                                                    (demographicPatient?.patientDemographic?.gpPostCode ? (demographicPatient?.patientDemographic?.gpPostCode) : '')
                                                )
                                                : ""}
                                        />
                                        <label className="form-label" htmlFor="PracticeName">GP Details</label>
                                    </div>
                                </div>

                                <div className='my-3 position-relative'>

                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="button-tooltip">Update Referrer</Tooltip>}
                                    >
                                        <button className="editicon" onClick={(e) => { setShowReferal(true) }} disabled={!global.layoutedit}><GrEdit /></button>
                                    </OverlayTrigger>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" readOnly id="PracticeName" disabled={!global.layoutedit}
                                            defaultValue={showEpisode?.patientEpisode ?
                                                (
                                                    (showEpisode.patientEpisode?.referralSourceName ? (showEpisode.patientEpisode?.referralSourceName) : '') +
                                                    (showEpisode.patientEpisode?.referrerName ? ("- " + showEpisode.patientEpisode?.referrerName) : '') +
                                                    (showEpisode.patientEpisode?.referralPracticeName ? ("- " + showEpisode.patientEpisode?.referralPracticeName) : '')
                                                )
                                                : ""
                                            }
                                        />
                                        <label className="form-label" htmlFor="PracticeName">Referrer Details</label>
                                    </div>
                                </div>

                                <div className='my-3 position-relative'>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="button-tooltip">Add Collaborator</Tooltip>}
                                    >
                                        <button className="editicon" onClick={(e) => { collaboratorEdit({}, "new", -1) }} disabled={!global.layoutedit}><HiOutlinePlus /></button>
                                    </OverlayTrigger>

                                    <div className="form-floating ">
                                        <label className="pt-1 input-label-asw" htmlFor="PracticeName">Collaborator Details</label>
                                        <div className="label-custom">
                                            {
                                                layouts?.episodepatient?.patientEpisode?.collaborators.map((data, i) =>
                                                    <div className="d-inline-block me-2" key={"collaborator"+i}>
                                                        <div className="d-flex align-items-center">
                                                            <span onClick={(e) => { collaboratorEdit(data, "edit", i) }} >
                                                                {data.name}
                                                            </span>
                                                            <span className="cross-icon" onClick={() => { deleteCollaborator(data.id, i) }}>
                                                                <FaTimes />
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <button className='btn btn-plan' disabled={!global.layoutedit} onClick={() => { setShowCreateNewEpisode(true) }}>
                                        Switch / Create New Episode
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="events-sec">
                        <div className="d-flex align-items-center justify-content-between layout mb-1">
                            <h3 className="m-0">EVENTS</h3>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip">Add Events</Tooltip>}
                            >
                                <div className="dropdown">
                                    <button className="editicon" id="dropdownMenuBtn1" data-bs-toggle="dropdown" aria-expanded="false" disabled={!global.layoutedit}>
                                        <HiOutlinePlus />
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuBtn1">
                                        <li><a className="dropdown-item" onClick={() => { handleEvent('Clinic appointment', true) }} >Clinic appointment</a></li>
                                        <li><a className="dropdown-item" onClick={() => { handleEvent('Outpatient procedure', true) }} >Outpatient procedure</a></li>
                                        <li><a className="dropdown-item" onClick={() => { handleEvent('Operation', true) }} >Operation</a></li>
                                        <li><a className="dropdown-item" onClick={() => { handleEvent('Inpatient visit', true) }} >Inpatient visit</a></li>
                                    </ul>
                                </div>
                            </OverlayTrigger>
                        </div>
                        <div className='border-frame'>
                            <div className='details_Input'>
                                <div className='table-responsive'>
                                    <table className="table table-borderless event-table m-0">
                                        <thead>
                                            <tr>
                                                <th>Category</th>
                                                <th>Date</th>
                                                <th>Billing </th>
                                                <th>Fee</th>
                                                <th>Document</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                layouts.eventspatient?.map((data, i) =>
                                                    <tr onClick={() => { handleEvent(data.eventType, false, data) }} key={"eventno"+i}>
                                                        <td>
                                                            {
                                                                data?.eventType == "Inpatient Visit" ?
                                                                (data.eventType+" - "+data.locationName)  
                                                                :(data.categoryName ? data.categoryName : '')
                                                            }
                                                        </td>
                                                        {/* <td>{data.eventDate ? data.eventDate?.split("T")[0].split("-").reverse().join("/") + " " + data.eventDate?.split("T")[1] : ''}</td> */}
                                                        <td>{data.eventDate ? data.eventDate?.split("T")[0].split("-").reverse().join("/") : ''}</td>
                                                        < td > {data.billingName ? data.billingName : ''}</td>
                                                        <td>£{data.fee ? data.fee : ''}</td>
                                                        <td>{data.fileName ? data.fileName : ''}</td>
                                                        <td>
                                                            <button 
                                                                className="btn text-primary text-decoration-underline"
                                                                onClick={(e)=>{
                                                                    e.stopPropagation();
                                                                    setEventdeleteshow(true);
                                                                    setDeleteReason("")
                                                                    setCurrentEventDeleteId({
                                                                        eventOutpatientApptId: data?.eventOutpatientApptId,
                                                                        eventOperationId: data?.eventOperationId,
                                                                        eventInpatientVisitId: data?.eventInpatientVisitId,
                                                                        eventOutpatientProcedureId: data?.eventOutpatientProcedureId,
                                                                    });
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <h3>RESULTS</h3>
                        <div className='border-frame'>
                            <div className=''>
                                <div className='details_Input'>
                                    <div className='table-responsive'>
                                        <table className="table table-borderless event-table m-0">
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Date</th>
                                                    <th>Uploaded by </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="mt-4">
                        <h3>STATUS</h3>
                        <div className='border-frame'>
                            <div className='details_Input'>

                                <div className={patientstatusip ? "form-floating mb-2" : "form-floating"}>
                                    <select 
                                        className="form-select" 
                                        id="BillingStatusId" 
                                        name="patientStatusId" 
                                        aria-label="Floating label select Source" 
                                        value={showEpisode ? showEpisode.patientEpisode?.patientStatusId : ""} 
                                        onChange={patientstatus} 
                                        disabled={!global.layoutedit}
                                    >
                                        <option hidden></option>
                                        {
                                            Object.keys(episode.episodepatientstatus).map((data, i) =>
                                                <option value={data}>{episode.episodepatientstatus[data]}</option>
                                            )
                                        }
                                    </select>
                                    <label htmlFor="BillingStatusId">Status</label>

                                </div>
                                {
                                    patientstatusip ?
                                        <>
                                            <div className="form-floating">
                                                <input type="text" id="stsHospitalName" className={props.validationerr ? props.validationerr.hospitalName ? 'is-invalid form-control' : 'form-control' : 'form-control'} defaultValue={Object.keys(showEpisode).length != 0 ? showEpisode.patientEpisode?.patientStatusHospitalName : inputHospital} name="patientStatusHospitalName" />
                                                <label htmlFor="stsHospitalName">Hospital Name</label>
                                            </div>
                                        </>
                                        : <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        {/* <BillingType readonly={true} page={"homepage"} setShowBilling={setShowBilling} billingTypeHandler={billingTypeHandler} data={showEpisode.patientEpisode} getAddress={{}} clearAddress={{}} showType={showType} address={{}} /> */}
                        <div className="billingDetail-asw position-relative">
                            <div className="d-flex align-items-center justify-content-between layout mb-1">
                                <h3 className="m-0">BILLING DETAILS</h3>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="button-tooltip">Update Billing</Tooltip>}
                                >
                                    <button className="editicon" onClick={(e) => { setShowBilling(true) }} disabled={!global.layoutedit}><GrEdit /></button>
                                </OverlayTrigger>
                            </div>
                            <div className='border-frame'>
                                <div className='details_Input'>
                                    <div className="d-flex align-tems-center">
                                        <p className="m-0">BillingType : </p>
                                        <p className="m-0">{showEpisode?.patientEpisode ? (
                                            (showEpisode?.patientEpisode?.billingTypeId) == 306 ? 'Self Funding' : '' ||
                                                (showEpisode?.patientEpisode?.billingTypeId) == 307 ? 'Insurance Cover' : '' ||
                                                    (showEpisode?.patientEpisode?.billingTypeId) == 308 ? 'Instructing Solicitor' : '' ||
                                                        (showEpisode?.patientEpisode?.billingTypeId) == 309 ? 'Embassy' : '') : ""}</p>
                                    </div>
                                    {
                                        (showEpisode?.patientEpisode?.billingTypeId) == 307 ?
                                            <>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Insurance Company : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.billingInsuranceCompanyName : ""} </p>
                                                </div>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Policy Number : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.billingInsurancePolicyNumber : ""}</p>
                                                </div>
                                            </>
                                            : <></>
                                    }
                                    {
                                        (showEpisode?.patientEpisode?.billingTypeId) == 308 ?
                                            <>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Solicitor Firm Name : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.solicitorFirmName : ""} </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode?.solicitorFirmName?.length > 0 ? ' ': ''}</p>
                                                
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.solicitorAddress1 : ""}</p>
                                                    <p className="m-0">{showEpisode?.patientEpisode?.solicitorAddress1?.length > 0 ? ' ': ''}</p>
                                                   
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.solicitorPostCode : ""}</p>
                                                </div>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Firm Contact Name : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.solicitorName : ""}</p>
                                                </div>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Solicitor Preferred Phone : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.solicitorPreferredPhone : ""}</p>
                                                </div>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Solicitor Contact Email : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.solicitorContactEmail : ""}</p>
                                                </div>
                                            </>
                                            : <></>
                                    }
                                    {
                                        (showEpisode?.patientEpisode?.billingTypeId) == 309 ?
                                            <>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Embassy : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.embassyName : ""} </p>
                                                </div>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Embassy Contact Name : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.embassyContactName : ""}</p>
                                                </div>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Embassy Address : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.embassyAddress1 : ""} </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode?.embassyAddress1?.length > 0 ? ', ': ''}</p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.embassyAddress2 : ""}</p>
                                                    <p className="m-0">{showEpisode?.patientEpisode?.embassyAddress2?.length > 0 ? ', ': ''}</p>
        
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.embassyAddress3 : ""}</p>
                                                    <p className="m-0">{showEpisode?.patientEpisode?.embassyAddress3?.length > 0 ? ' ': ''}</p>
                                                
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.embassyPostCode : ""}</p>
                                                </div>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Embassy Contact Mail : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.embassyContactEmail : ""} </p>
                                                </div>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Embassy Preferred Phone : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.embassyPreferredPhone : ""}</p>
                                                </div>
                                                <div className="d-flex align-tems-center">
                                                    <p className="m-0">Embassy Secondary Phone : </p>
                                                    <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.embassySecondaryPhone : ""} </p>
                                                </div>
                                            </>
                                            : <></>
                                    }
                                    <div className="d-flex align-tems-center">
                                        <p className="m-0">Name / Address : </p>
                                        <p className="m-0">
                                            {showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.billingName : ""} 
                                            {showEpisode?.patientEpisode?.billingName?.length > 0 ? ' - ': ''}
                                            {showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.billingAddress1 : ""}
                                            {showEpisode?.patientEpisode?.billingAddress1?.length > 0 ? ' ' : ''}
                                            {showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.billingPostCode : ""} 
                                        </p>
                                    </div>
                                   
                                    <div className="d-flex align-tems-center">
                                        <p className="m-0">Phone : </p>
                                        <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.billingContact : ""} </p>
                                    </div>
                                    <div className="d-flex align-tems-center">
                                        <p className="m-0">Email : </p>
                                        <p className="m-0">{showEpisode?.patientEpisode ? showEpisode?.patientEpisode?.billingEmail : ""} </p>
                                    </div>
                                    <div className="d-flex align-tems-center">
                                        <p className="m-0">Outstanding Balance : </p>
                                        <p className="m-0">{showEpisode?.patientEpisode ? (showEpisode?.patientEpisode?.outstandingBalance ? "£ " + showEpisode?.patientEpisode?.outstandingBalance : "£ 0") : ""} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="d-flex align-items-center justify-content-between layout mb-1">
                            <h3 className="m-0">PLAN</h3>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip">Plans History</Tooltip>}
                            >
                                <button className="editicon" onClick={(e) => { setShowPlan(true) }} disabled={!global.layoutedit}><GrHistory /></button>
                            </OverlayTrigger>
                        </div>
                        <div className='border-frame'>
                            <div className="form-floating pt-4 notes">
                                <textarea className="form-control tick" id='Plan' disabled={!global.layoutedit} name='plan'
                                    value={
                                        showEpisode ?
                                            (
                                                (showEpisode?.episodePlans ?
                                                    showEpisode?.episodePlans?.plan
                                                    : ""
                                                )
                                            ) : ""
                                    }
                                    onChange={(e) => { handlePlanChange(e) }}>
                                </textarea>
                                <label htmlFor="Plan">Plan</label>
                                {
                                    !((!global.layoutedit) || (showEpisode?.episodePlans?.plan == episode.episodeshowplan[0]?.plan)) ?
                                        <div className="d-flex btns align-items-center justify-content-end pe-4">
                                            <button className="check" onClick={() => { sumbitPlanChange("popupYES") }} disabled={(!global.layoutedit) || (showEpisode?.episodePlans?.plan == episode.episodeshowplan[0]?.plan ? true : false)}><FaCheck /></button>
                                            <button className="ms-2 times" onClick={() => { sumbitPlanChange("popupNO") }} disabled={(!global.layoutedit) || (showEpisode?.episodePlans?.plan == episode.episodeshowplan[0]?.plan ? true : false)}><FaTimes /></button>
                                        </div>
                                        : <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="d-flex align-items-center justify-content-between layout mb-1">
                            <h3 className="m-0">NOTES</h3>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip">Notes History</Tooltip>}
                            >
                                <button className="editicon" onClick={(e) => { setShowNotes(true) }} disabled={!global.layoutedit}><GrHistory /></button>
                            </OverlayTrigger>
                        </div>
                        <div className='border-frame'>
                            <div className="form-floating pt-4 notes">
                                <textarea
                                    className="form-control tick"
                                    disabled={!global.layoutedit}
                                    id='Notes' name="notes"
                                    value={
                                        showEpisode ?
                                            (
                                                (showEpisode?.episodeNotes ?
                                                    showEpisode?.episodeNotes?.notes
                                                    : ""
                                                )
                                            )
                                            : ""
                                    }
                                    onChange={(e) => { handleNotesChange(e) }}>
                                </textarea>
                                <label htmlFor="Notes">Notes</label>
                                {
                                    !((!global.layoutedit) || (showEpisode?.episodeNotes?.notes == episode.episodeshownotes[0]?.notes)) ?
                                        <div className="d-flex btns align-items-center justify-content-end pe-4">
                                            <button
                                                className="check"
                                                onClick={() => { sumbitNotesChange("popupYES") }}
                                                disabled={(!global.layoutedit) || (showEpisode?.episodeNotes?.notes == episode.episodeshownotes[0]?.notes ? true : false)}
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                className="ms-2 times"
                                                onClick={() => { sumbitNotesChange("popupNO") }}
                                                disabled={(!global.layoutedit) || (showEpisode?.episodeNotes?.notes == episode.episodeshownotes[0]?.notes ? true : false)}>
                                                <FaTimes />
                                            </button>
                                        </div>
                                        : <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex align-items-center justify-content-between layout mb-1">
                            <h3 className="m-0">TASKS</h3>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip">Add Tasks</Tooltip>}
                            >
                                <button className="editicon" disabled={!global.layoutedit}><HiOutlinePlus /></button>
                            </OverlayTrigger>
                        </div>
                        <div className='border-frame'>
                            <div className=''>
                                <div className='details_Input'>
                                    <div className='table-responsive'>
                                        <table className="table table-borderless event-table m-0">
                                            <thead>
                                                <tr>
                                                    <th>Task/s</th>
                                                    <th>Assignee</th>
                                                    <th>Created by </th>
                                                    <th>Priority</th>
                                                    <th>Completed Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Modal className='warning-modal' centered show={hospitalShow} onHide={() => { setHospitalShow(false) }}>
                <Modal.Header>
                    <Modal.Title>Hospital Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-2">
                        <input type="text" id="stsHospitalName" className={props.validationerr ? props.validationerr.hospitalName ? 'is-invalid form-control' : 'form-control' : 'form-control'} name="HospitalName" onChange={(e) => { changeHospitalName(e) }} />
                        <label htmlFor="stsHospitalName">Hospital Name</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-plan' onClick={(e) => { setHospitalShow(false);setWarnstatus(true) }} disabled={!global.layoutedit}>
                        Save
                    </Button>
                    <Button className='btn-plan' onClick={() => { setHospitalShow(false); handleHospitalData("popupNO")  }} disabled={!global.layoutedit}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className='component-modal' centered show={eventdeleteshow} backdrop="static" onHide={() => { setEventdeleteshow(false) }}>
                <Modal.Header>
                    <Modal.Title>Select Reason to Delete the Event..</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-2">
                        <select
                            id="eventdeletereason" 
                            className={props.validationerr ? props.validationerr.hospitalName ? 'is-invalid form-select' : 'form-select' : 'form-select'} 
                            name="eventdeletereason" 
                            onChange={(e) => { 
                                setDeleteReason(e.target.value);
                                if(e.target.value != 378){
                                    setDeleteNotes("");
                                }
                            }} 
                        >
                            <option hidden>Select Reason</option>
                            {
                                Object.keys(layouts.eventdeletereason).map((data)=>
                                    <option value={data}>{layouts.eventdeletereason[data]}</option>
                                )
                            }
                        </select>
                        <label htmlFor="stsHospitalName">Reason</label>
                    </div>
                    {
                        deleteReason == 378 ? 
                        <div className="form-floating notes pt-4 mb-2">
                            <textarea 
                                type="text" 
                                id="deleteNotes"
                                className={props.validationerr ? props.validationerr.hospitalName ? 'is-invalid form-control' : 'form-control' : 'form-control'} 
                                name="deleteNotes" 
                                onChange={(e) => { setDeleteNotes(e.target.value) }} 
                            ></textarea>
                            <label htmlFor="stsHospitalName">Other Reason</label>
                        </div> :
                        <></>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        className='btn-plan' 
                        onClick={(e) => { deleteEvent();setEventdeleteshow(false)  }} 
                        disabled={!(global.layoutedit && deleteReason)}
                        data-reason = {deleteReason}
                        data-edit ={global.layoutedit}
                    >
                        Submit
                    </Button>
                    <Button className='btn-plan' onClick={() => { setEventdeleteshow(false)  }} disabled={!global.layoutedit}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className='warning-modal' backdrop="static" centered show={warnstatus} onHide={() => { setWarnstatus(false) }}>
                <Modal.Header>
                    <Modal.Title>WARNING</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Are you sure you want to change the Status ?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-plan' onClick={(e) => { handleHospitalData("popupYES") }}>
                        Yes
                    </Button>
                    <Button className='btn-plan' onClick={() => { handleHospitalData("popupNO") }}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className='warning-modal' backdrop="static" centered show={warning} onHide={() => { setWarning(false) }}>
                <Modal.Header>
                    <Modal.Title>WARNING</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Are you sure you want to change the Primary Consultant ?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-plan' onClick={(e) => { handlePrimaryConsultantChange("", "popup"); setWarning(false) }}>
                        Yes
                    </Button>
                    <Button className='btn-plan' onClick={() => { handlePrimaryConsultantChange("", "popupNO"); setWarning(false) }}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                className='warning-modal' 
                backdrop="static" 
                centered 
                show={deleteWarn.status} 
                onHide={() => { 
                    setDeleteWarn({
                        type:"",
                        status: false
                    }) 
                }}
            >
                <Modal.Header>
                    <Modal.Title>WARNING</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Are you sure you want to Delete the { deleteWarn.type } ?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        className='btn-plan' 
                        onClick={() => { 
                            if(deleteWarn.type == "Diagnosis"){
                                dispatch({ type: "REMOVEDIAGNOSIS", payload: deleteWarn.rem[0] })
                                setDioCancelSide(deleteWarn.e);
                                setDeleteWarn({
                                    type:"",
                                    status: false
                                })
                            }
                            else{
                                let a = { ...showEpisode };
                                let res = a.patientEpisode.collaborators.filter((item, i) => i !== deleteWarn.e);
                                a.patientEpisode.collaborators = res;
                                setShowEpisode(a)
                                dispatch({ type: 'DELETECOLLABORATOR', payload: deleteWarn.rem })
                                setDeleteWarn({
                                    type:"",
                                    status: false
                                })
                            }
                        }}
                    >
                        Yes
                    </Button>
                    <Button 
                        className='btn-plan' 
                        onClick={() => { 
                            setDeleteWarn({
                                type:"",
                                status: false
                            }) 
                        }}
                    >
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                className='warning-modal'
                centered
                show={warnprocedurecode}
                onHide={() => { setWarnprocedurecode(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>WARNING</Modal.Title>
                </Modal.Header>
                <Modal.Body>You should select the procedure Name first</Modal.Body>
            </Modal>

            <Modal className='component-modal' size='sm' backdrop="static" centered show={diocancelshow} onHide={() => { setDioCancelShow(false) }}>
                <Modal.Header>
                    <Modal.Title>Side</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                            Object.keys(events.eventside).map((data, i) =>
                                <div className="d-flex" key={"side"+i}>
                                    <input type="radio" className="form-check-input me-2" value={data} name="side" id={"diagnosisSide" + i} onChange={(e) => { handleSideSelect(e, data, events.eventside[data]) }} />
                                    <label htmlFor={"diagnosisSide" + i} className="form-check-label">{events.eventside[data]}</label>
                                </div>
                            )
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-plan' onClick={(e) => { setDioCancelShow(false); handleSideChange("save") }} disabled={!global.layoutedit}>
                        Save
                    </Button>
                    <Button className='btn-plan' onClick={() => { setDioCancelShow(false); handleSideChange("cancel") }} disabled={!global.layoutedit}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className='component-modal' backdrop="static" centered show={showGP} onHide={() => { setShowGP(false) }}>
                <Modal.Body>
                    <form onSubmit={getGpForm}>
                        <GpDetails demographicChange={() => { }} validationerr={currentGp} tempDemoData={demographicPatient.patientDemographic} readonly={false} />
                        <Modal.Footer className="px-0">
                            <Button
                                className='btn-plan'
                                type='submit'
                                disabled={!global.layoutedit}
                            >
                                Save
                            </Button>
                            <Button
                                className='btn-plan'
                                type='button'
                                onClick={() => {
                                    setShowGP(false)
                                }}
                                disabled={!global.layoutedit}
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                className='component-modal'
                backdrop="static"
                centered show={showReferal}
                onHide={() => { setShowReferal(false) }}
            >
                <Modal.Body>
                    <form onSubmit={getReferalForm}>
                        <ReferrerDetails validationerr={currentReferal} tempDemoData={showEpisode.patientEpisode} />
                        <Modal.Footer className="px-0">
                            <Button className='btn-plan' type='submit' disabled={!global.layoutedit}>
                                Save
                            </Button>
                            <Button
                                className='btn-plan'
                                type='button'
                                onClick={() => {
                                    let a = { ...showEpisode };
                                    a.patientEpisode.referralSourceId = props.data?.patientEpisode?.referralSourceId
                                    a.patientEpisode.referralSourceName = props.data?.patientEpisode?.referralSourceName
                                    a.patientEpisode.referralPracticeName = props.data?.patientEpisode?.referralPracticeName
                                    a.patientEpisode.referrerName = props.data?.patientEpisode?.referrerName
                                    a.patientEpisode.referrerSourceEmail = props.data?.patientEpisode?.referrerSourceEmail
                                    a.patientEpisode.referrerSourceAddress1 = props.data?.patientEpisode?.referrerSourceAddress1
                                    a.patientEpisode.referrerSourceAddress2 = props.data?.patientEpisode?.referrerSourceAddress2
                                    a.patientEpisode.referrerSourceAddress3 = props.data?.patientEpisode?.referrerSourceAddress3
                                    a.patientEpisode.referrerSourcePostCode = props.data?.patientEpisode?.referrerSourcePostCode
                                    setShowEpisode(a);
                                    setShowReferal(false)
                                }}
                                disabled={!global.layoutedit}
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                className='component-modal'
                backdrop="static"
                centered
                show={showCollaborator}
                onHide={() => { setShowCollaborator(false) }}
            >
                <Modal.Header closeButton>
                    <h3>Collaborator</h3>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { getCollaboratorForm(e) }}>
                        <CollaboratorForm collaborator={currentCollaborator} column={"Landing"} addcollaboratorfn={() => { }} collaboratorfn={(type, data1, data2) => { collaboratorfn(type, data1, data2) }} />
                        <Modal.Footer>
                            <Button className='btn-plan' type="submit" disabled={!global.layoutedit}>
                                Save
                            </Button>
                            <Button className='btn-plan' type="button"
                                onClick={() => {
                                    let a = { ...showEpisode };
                                    a.patientEpisode.collaborators = layouts?.episodepatient?.patientEpisode?.collaborators
                                    setShowEpisode(a);
                                    setShowCollaborator(false)
                                }} disabled={!global.layoutedit}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                className='component-modal'
                backdrop="static"
                centered
                show={showBilling}
                onHide={() => { setShowBilling(false) }}
            >
                <Modal.Body>
                    <form onSubmit={getBillingForm}>
                        <BillingType data={showEpisode.patientEpisode} page={'homepage_popup'} billingTypeHandler={billingTypeHandler} getAddress={{}} validationerr={currentBilling} clearAddress={{}} showType={showType} address={{}} />
                        <Modal.Footer>
                            <Button className='btn-plan' type="submit">
                                Save
                            </Button>
                            <Button
                                className='btn-plan'
                                type="button"
                                onClick={() => {
                                    let a = { ...showEpisode };
                                    a.patientEpisode.billingTypeId = props.data?.patientEpisode?.billingTypeId
                                    a.patientEpisode.billingTypeName = props.data?.patientEpisode?.billingTypeName
                                    a.patientEpisode.billingName = props.data?.patientEpisode?.billingName
                                    a.patientEpisode.billingAddress1 = props.data?.patientEpisode?.billingAddress1
                                    a.patientEpisode.billingAddress2 = props.data?.patientEpisode?.billingAddress2
                                    a.patientEpisode.billingAddress3 = props.data?.patientEpisode?.billingAddress3
                                    a.patientEpisode.billingPostCode = props.data?.patientEpisode?.billingPostCode
                                    a.patientEpisode.billingContact = props.data?.patientEpisode?.billingContact
                                    a.patientEpisode.billingEmail = props.data?.patientEpisode?.billingEmail
                                    a.patientEpisode.billingInsuranceCompanyId = props.data?.patientEpisode?.billingInsuranceCompanyId
                                    a.patientEpisode.billingInsurancePolicyNumber = props.data?.patientEpisode?.billingInsurancePolicyNumber
                                    a.patientEpisode.embassyId = props.data?.patientEpisode?.embassyId
                                    a.patientEpisode.embassyContactName = props.data?.patientEpisode?.embassyContactName
                                    a.patientEpisode.embassyContactEmail = props.data?.patientEpisode?.embassyContactEmail
                                    a.patientEpisode.embassyPreferredPhone = props.data?.patientEpisode?.embassyPreferredPhone
                                    a.patientEpisode.embassySecondaryPhone = props.data?.patientEpisode?.embassySecondaryPhone
                                    a.patientEpisode.solicitorId = props.data?.patientEpisode?.solicitorId
                                    a.patientEpisode.firmId = props.data?.patientEpisode?.firmId
                                    a.patientEpisode.solicitorFirmName = props.data?.patientEpisode?.solicitorFirmName
                                    a.patientEpisode.solicitorAddress1 = props.data?.patientEpisode?.solicitorAddress1
                                    a.patientEpisode.solicitorAddress2 = props.data?.patientEpisode?.solicitorAddress2
                                    a.patientEpisode.solicitorAddress3 = props.data?.patientEpisode?.solicitorAddress3
                                    a.patientEpisode.solicitorPostCode = props.data?.patientEpisode?.solicitorPostCode
                                    a.patientEpisode.solicitorPreferredPhone = props.data?.patientEpisode?.solicitorPreferredPhone
                                    a.patientEpisode.solicitorContactEmail = props.data?.patientEpisode?.solicitorContactEmail
                                    setShowEpisode(a);
                                    setShowBilling(false)
                                    setShowType(props.data?.patientEpisode?.billingTypeId == 307 ? "self" : props.data?.patientEpisode?.billingTypeId == 308 ? "solicitor" : props.data?.patientEpisode?.billingTypeId == 309 ? "embassy" : "")
                                }}
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                className='component-modal plan-note-modal'
                centered
                size="xl"
                show={showPlan}
                onHide={() => { setShowPlan(false) }}
            >
                <Modal.Header closeButton>
                    <h3>PLAN</h3>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <div className='details_Input mt-3'>
                            <div className='table-responsive'>
                                <table className="table table-borderless event-table">
                                    <thead>
                                        <tr>
                                            {/* <th>Table - Id(key)</th> */}
                                            <th>Plan</th>
                                            <th>UpdatedDate </th>
                                            <th>UpdatedByUser</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            planHistory?.map((data, i) =>
                                                <tr key={"planhistory"+i}>
                                                    {/* <td>{data.episodeNoteId ? data.episodeNoteId : ''}</td> */}
                                                    <td>{data.plan ? data.plan : ''}</td>
                                                    <td>{data.dateUpdated ? data.dateUpdated : ''}</td>
                                                    <td>{data.updatedByUserName ? data.updatedByUserName : ''}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                </Modal.Body>
            </Modal>

            <Modal
                className='component-modal plan-note-modal'
                centered
                size="xl"
                show={showNotes}
                onHide={() => { setShowNotes(false) }}
            >
                <Modal.Header closeButton>
                    <h3>NOTE</h3>
                </Modal.Header>

                <Modal.Body>
                    <>
                        <div className='details_Input mt-3'>
                            <div className='table-responsive'>
                                <table className="table table-borderless event-table">
                                    <thead>
                                        <tr>
                                            {/* <th>Table - Id(key)</th> */}
                                            <th>Notes</th>
                                            <th>UpdatedDate </th>
                                            <th>UpdatedByUser</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            notesHistory?.map((data, i) =>
                                                <tr key={"Notehistory"+i}>
                                                    {/* <td>{data.episodeNoteId ? data.episodeNoteId : ''}</td> */}
                                                    <td>{data.notes ? data.notes : ''}</td>
                                                    <td>{data.dateUpdated ? data.dateUpdated : ''}</td>
                                                    <td>{data.updatedByUserName ? data.updatedByUserName : ''}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                </Modal.Body>
            </Modal>

            <Modal
                className='component-modal episode_modal'
                centered
                show={showCreateNewEpisode}
                size={"xl"}
                onHide={() => { setShowCreateNewEpisode(false) }}
            >
                <Modal.Header closeButton>
                    <h3>Episodes</h3>
                </Modal.Header>

                <Modal.Body>
                    <>
                        <div className='details_Input mt-3 h-100'>
                            <button className="mb-3 btn-plan px-3 py-1" onClick={() => { setAddEpisode(true) }}>
                                Add New Episode
                            </button>
                            <div className='table-responsive'>
                                <table className="table table-borderless event-table episode-table">
                                    <thead>
                                        <tr>
                                            {/* <th>Table - Id(key)</th> */}
                                            <th>Consultant</th>
                                            <th>Diagnosis (es)  </th>
                                            <th>Billing type</th>
                                            {/* <th>Date Created</th> */}
                                            <th>Last Modified</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            episode.switchepisodes.episodeInfo?.map((data, i) =>
                                                <tr
                                                    key={"episode"+i}
                                                    className={(data.patientEpisodeId == showEpisode.episodeId) ? "disabled" : ""}
                                                    onClick={() => { if (data.patientEpisodeId != showEpisode.episodeId) selectEpisode(data.patientEpisodeId) }}
                                                >
                                                    {/* <td>{data.episodeNoteId ? data.episodeNoteId : ''}</td> */}
                                                    <td>{data.primaryConsultantName ? data.primaryConsultantName : ''}</td>
                                                    <td>{data.diagnosisName ? data.diagnosisName : ''}</td>
                                                    <td>{data.billingTypeName ? data.billingTypeName : ''}</td>
                                                    {/* <td>{data.dateCreated ? new Date(data.dateCreated).toLocaleString() : ''}</td> */}
                                                    <td>{data.dateUpdated ? new Date(data.dateUpdated).toLocaleString() : ''}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                </Modal.Body>
            </Modal>

            <Modal
                className='component-modal events_modal'
                centered
                show={showEvents.status}
                backdrop="static"
                size="xl"
                onHide={() => {
                    setShowEvents({
                        type: "",
                        status: false
                    });
                    setTempEventData({})
                    setProcedure({})
                }}
            >
                <Modal.Body>
                    <Modal.Header closeButton />
                    <form onSubmit={(e) => { getEventData(e, "") }}>
                        {
                            showEvents.type == "Clinic appointment" ?
                                <OutPatientAppointment customSelectStyle={customSelectStyle} customSelecterrStyle={customSelecterrStyle} locationddl={locationddl} newevent={showEvents.new} page={"homepage"} tempeventDatafn={tempeventDatafn} tempeventData={tempeventData} /> :
                                showEvents.type == "Outpatient procedure" ?
                                    <OutPatientProcedure newevent={showEvents.new} customSelecterrStyle={customSelecterrStyle} page={"homepage"} procedureNameOption={procedureNameOption} procedureCodeOption={procedureCodeOption} customSelectStyle={customSelectStyle} tempeventDatafn={tempeventDatafn} tempeventData={tempeventData} /> :
                                    showEvents.type == "Operation" ?
                                        <Operation locationddl={locationddl} customSelecterrStyle={customSelecterrStyle} newevent={showEvents.new} page={"homepage"} procedureNameOption={procedureNameOption} procedureCodeOption={procedureCodeOption} customSelectStyle={customSelectStyle} tempeventDatafn={tempeventDatafn} getEventData={(e, extra) => { getEventData(e, extra) }} tempeventData={tempeventData} procedure={procedure} innerhandleDelete={innerhandleDelete} /> :
                                        <InPatientVisit customSelectStyle={customSelectStyle} customSelecterrStyle={customSelecterrStyle} locationddl={locationddl} newevent={showEvents.new} page={"homepage"} tempeventDatafn={tempeventDatafn} tempeventData={tempeventData} />
                        }
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                show={addEpisode}
                backdrop="static"
                className='layout-modal'
                onHide={() => setAddEpisode(false)}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {/* <Modal.Header closeButton /> */}
                <Modal.Body>
                    <form onSubmit={submitForm} className="h-100" id='myForm'>
                        <div className='formdata'>
                            <ModalEpisode page={"homepage_popup"} gp={true} ref={episoderef} getData={(e) => { setCollaborator(e) }} address={{}} validationerr={error.episode} gpvalidationerr={error.gp} />
                            <ModalEvents ref={eventsref} getData={(e) => { setEvent(e) }} getapiData={(e) => { setapiEvent(e) }} />
                        </div>
                        <div className='d-flex justify-content-end my-3'>
                            <button className='btn btn-plan me-5' type='submit'> Save</button>
                            <button 
                                className='btn btn-plan me-5' 
                                type='button' 
                                onClick={() => {
                                    setAddEpisode(false)
                                    dispatch({ type: 'CURRENTPRIMARYCONSULTANT',payload:layouts.episodepatient.patientEpisode.primaryConsultantUserId })
                                }}
                            > 
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default LayoutEpisode;