import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import Select from 'react-select';
import { eventSide } from "../../../actions/events";
import { connect, useDispatch, useSelector } from "react-redux";
import OutPatientAppointment from "../layoutcomponents/OutPatientAppointment";
import OutPatientProcedure from "../layoutcomponents/outpatientprocedure";
import Operation from "../layoutcomponents/operation";
import InPatientVisit from "../layoutcomponents/inpatientvisit";
import { Modal } from "react-bootstrap";


const ModalEvents = forwardRef((props, ref) => {

    const [event, setEvent] = useState("");
    const [eventcount, setEventCount] = useState(0);
    const [tempeventData, setTempEventData] = useState({});
    const [eventData, setEventData] = useState([]);
    const [procedure, setProcedure] = useState({});
    const [procedureNameOption, setProcedureNameOption] = useState([])
    const [procedureCodeOption, setProcedureCodeOption] = useState([])
    const [patientEpisodeEvents, setPatientEpisodeEvents] = useState([]);
    const [warnprocedurecode, setWarnprocedurecode] = useState(false);
    const [requiredField, setRequiredField] = useState({
        form1: ['scheduleDate', 'OutpatientApptCategoryId', 'locationId', 'typeId', 'billingId', 'fee', 'durationInMinutes'],
        form2: ['procedureDate', 'procedureId', 'procedureCode', 'billingId', 'fee'],
        form3: ['anaeastheticId', 'estimatedTimeInMin', 'billingId', 'lengthOfStay', 'isXrayRequired', 'tcistatusId'],
        form4: ['procedureDate', 'hospitalId', 'procedureCode', 'billingId', 'fee'],
    })
    const [apiEvents, setApiEvents] = useState(
        {
            eventOutpatientApptDtos: [],
            eventOutpatientProcedureDtos: [],
            eventOperationDtos: [],
            eventInpatientVisitDtos: []
        }
    );

    const handleEvent = (e) => {
        setEvent(e)
        if (e == 'Clinic appointment') {
            let now = new Date()
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            let date = now.toISOString().slice(0, 16)
            let myArray = date.split("T");
            myArray[0] = myArray[0].split('-').reverse().join("/");
            myArray = myArray.join("T")
            let a = {
                scheduleDate: myArray,
                countId: eventcount,
                billingId: global.billingtype ? global.billingtype : ""
            }
            setTempEventData(a)
        }
        if (e == 'Outpatient procedure') {
            let now = new Date()
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            let date = now.toISOString().slice(0, 16)
            let myArray = date.split("T");
            myArray[0] = myArray[0].split('-').reverse().join("/");
            myArray = myArray.join("T")
            let a = {
                procedureDate: myArray,
                countId: eventcount,
                billingId: global.billingtype ? global.billingtype : ""
            }
            setTempEventData(a)
        }
        if (e == 'Operation') {
            let a = {
                isXrayRequired: false,
                countId: eventcount,
                billingId: global.billingtype ? global.billingtype : ""
            }
            setTempEventData(a)
        }
        if (e == 'inpatient visit') {
            let now = new Date()
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            let date = now.toISOString().slice(0, 16)
            let myArray = date.split("T");
            myArray[0] = myArray[0].split('-').reverse().join("/");
            myArray = myArray.join("T")
            let a = {
                procedureDate: myArray,
                procedureId: 2043,
                procedureCode: "353",
                countId: eventcount,
                billingId: global.billingtype ? global.billingtype : ""
            }
            setTempEventData(a)
        }

        dispatch({ type: 'EVENTPROCEDURENAMELOAD' })
        dispatch({ type: 'EVENTPROCEDURECODELOAD' })
    }

    const tempeventDatafn = (key, value, formno, file) => {
        let a = { ...tempeventData };
        if (!file) {
            if ((key == 'procedureId' || key == 'procedureCode' || key == 'fee' || key == 'side') && formno == "form3") {
                let res = { ...procedure };
                if (value == '' || (isNaN(value) && key == "fee") || value == undefined) {
                    delete res[key];
                }
                else {
                    res[key] = value;
                }
                setProcedure(res);
            }
            else if (value != '' || typeof value == "boolean") {
                if (key == 'scheduleDate' && formno == "form1" || key == 'procedureDate' && formno == "form2" || key == 'operationDate' && formno == "form3" || key == 'procedureDate' && formno == "form4") {
                    value = value.split("T")[0].split('-').reverse().join("/") + "T" + value.split("T")[1];
                }
                a[key] = value;
            }
            else {
                delete (a[key]);
            }
            if (key == "OutpatientApptCategoryId") {
                if (global.currentPrimaryConsultant !== "") {

                    if (global.getClinicAppointmentMinuts != "") {
                        if (value.name == "New" && global.getClinicAppointmentMinuts.newClinicAppointmentMinuts != null) {
                            a.durationInMinutes = global?.getClinicAppointmentMinuts?.newClinicAppointmentMinuts
                        }
                        else if (global.getClinicAppointmentMinuts.followUpClinicAppointmentMinuts != null) {
                            a.durationInMinutes = global?.getClinicAppointmentMinuts?.followUpClinicAppointmentMinuts
                        }
                    }
                    if(a.billingId){
                        a.fee = value.name != "New" ? layouts?.clinicfee?.followupFee : layouts?.clinicfee?.newFee
                    }
                }
            }
            if (key == "billingId") {
                if (formno == "form1" && global.currentPrimaryConsultant !== "") {
                    let obj = {
                        userId: global.currentPrimaryConsultant,
                        billingTypeId: value.id,
                        insurerId: value.id == 307 ? global.insurerName.insurerId : ""
                    }
                    if(global.insurerName != "" || value.id != 307){
                        dispatch({ type: "GETCLINICFEE", payload: obj })
                    }
                }
                if (formno == "form2" || formno == "form3") {
                    let i = { ...procedure };
                    if (value.id == 306) {
                        if (a.procedureId && formno == "form2") {
                            let obj1 = {
                                procedureNameId: a.procedureId?.id,
                                organisationId: global.orgId
                            }
                            dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })
                        }
                        if (i.procedureId && formno == "form3") {
                            let obj1 = {
                                procedureNameId: i.procedureId?.id,
                                organisationId: global.orgId
                            }
                            dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })
                        }
                    }
                    else {
                        if (formno == "form2") {
                            delete a.fee;
                        }
                        if (formno == "form3") {
                            delete i.fee;
                        }
                        dispatch({ type: "EVENTPROCEDUREFEE_SUCCESS", payload: "" })
                    }
                    setProcedure(i);
                }
            }
            if (key == "locationId" || key == "hospitalId") {
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
            if (key == "procedureId" && formno == "form2") {
                let found = false;
                for (var i = 0; i < procedureNameOption.length; i++) {
                    if (procedureNameOption[i].value == value.id) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    dispatch({ type: 'EVENTPROCEDURECODE', payload: value.id })
                    delete a.procedureCode
                    if (a?.billingId?.id == 306) {
                        let obj1 = {
                            procedureNameId: value.id,
                            organisationId: global.orgId,
                        }
                        dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })
                    }
                }
                else {
                    console.log("else..");
                    let obj = {
                        organisationId: global.orgId,
                        procedureName: value.value,
                        updatedByUser: global.loggedUserId
                    }
                    dispatch({ type: 'ADDPROCEDURENAME', payload: obj })
                    setProcedureCodeOption([])
                }
            }
            if (key == "procedureCode" && formno == "form2") {
                let found = false;
                for (var i = 0; i < procedureCodeOption.length; i++) {
                    if (procedureCodeOption[i].value == value.id) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    dispatch({ type: 'EVENTPROCEDURENAME1', payload: value.id })
                }
                else {
                    if (a.procedureId) {
                        console.log("else..");
                        let obj = {
                            organisationId: global.orgId,
                            procedureNameid: a?.procedureId?.id,
                            procedureCode: value.value,
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
            if (key == "procedureId" && formno == "form3") {
                let found = false;
                for (var i = 0; i < procedureNameOption.length; i++) {
                    if (procedureNameOption[i].value == (value.id)) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    dispatch({ type: 'EVENTPROCEDURECODE', payload: (value.id) })
                    let i = { ...procedure }
                    i.procedureId = value;
                    delete i.procedureCode
                    if (a?.billingId?.id == 306) {
                        let obj1 = {
                            procedureNameId: (value.value),
                            organisationId: global.orgId,
                        }
                        dispatch({ type: 'EVENTPROCEDUREFEE', payload: obj1 })
                    }
                    setProcedure(i);
                }
                else {
                    console.log("else..");
                    let obj = {
                        organisationId: global.orgId,
                        procedureName: (value.value),
                        updatedByUser: global.loggedUserId
                    }
                    dispatch({ type: 'ADDPROCEDURENAME', payload: obj })
                    setProcedureCodeOption([])
                }
            }
            if (key == "procedureCode" && formno == "form3") {
                let found = false;
                for (var i = 0; i < procedureCodeOption.length; i++) {
                    if (procedureCodeOption[i].value == (value.id)) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    dispatch({ type: 'EVENTPROCEDURENAME1', payload: value.id })
                    let i = { ...procedure }
                }
                else {
                    let i = { ...procedure }
                    let obj = {
                        organisationId: global.orgId,
                        procedureNameid: i.procedureId.id,
                        procedureCode: (value.value),
                        updatedByUser: global.loggedUserId
                    }
                    dispatch({ type: 'ADDPROCEDURECODE', payload: obj })
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
        // console.log(a);
    }

    useImperativeHandle(ref, () => ({

        getName() {
            props.getData(patientEpisodeEvents)
        },
        getapiName() {
            props.getapiData(apiEvents)
        },
        validate() {
            // console.log('got inside');
        }

    }));

    const eventDatafn = (formno, extra) => {
        if (extra == 'procedures') {
            let a = { ...tempeventData };
            let b = { ...procedure };
            // console.log(procedure)
            a['procedures'] = a['procedures'] ? a['procedures'] : [];
            a['procedures'].push(b)
            setProcedure([])
            setTempEventData(a)
            dispatch({ type: 'EVENTPROCEDURENAMELOAD' })
            dispatch({ type: 'EVENTPROCEDURECODELOAD' })
        }
        else {
            let err = {};
            let dummy = { ...tempeventData };
            requiredField[formno].some((item, l) => {
                if (!((item == "procedureId" || item == "fee" || item == "procedureCode" || item == "side") && (formno == "form3"))) {
                    if ((dummy[item] === "" || dummy[item] === null || dummy[item] === undefined)) {
                        err[item] = item + " required"
                    }
                }
            })
            if ((dummy?.procedures?.length == 0 || !dummy?.procedures) && event == "Operation") {
                err.procedure = "minimum one procedure required"
            }

            if (Object.keys(err).length == 0) {
                let a = [...eventData];
                let c = { ...apiEvents };
                let data = {
                    name: formno,
                    data: JSON.parse(JSON.stringify(tempeventData))
                }
                let event = [...patientEpisodeEvents]
                let b = {
                    eventName: formno == "form1" ? "Clinic appointment" : formno == "form2" ? "Outpatient procedure" : formno == "form3" ? "Operation" : "inpatient visit"
                }
                event.push(b)
                //debugger;
                if (formno == "form1") {
                    dummy.billingId = dummy.billingId ? dummy.billingId.id : '';
                    dummy.OutpatientApptCategoryId = dummy.OutpatientApptCategoryId ? dummy.OutpatientApptCategoryId.id : '';
                    dummy.fileName = dummy.fileName ? dummy.fileName.name : '';
                    dummy.patientEpisodeId = 0;
                    dummy.fileLink = null;
                    dummy.updatedByUser = global.loggedUserId;
                    dummy.locationName = dummy.locationId ? dummy.locationId.locationName : null;
                    dummy.locationId = dummy.locationId ? dummy.locationId.locationId : null;
                    delete dummy.err;
                    dummy.organisationId = global.orgId;
                    c["eventOutpatientApptDtos"].push(dummy)
                    setEventCount(eventcount + 1);
                    a.push(data);
                }
                if (formno == "form2") {
                    dummy.procedureCode = dummy.procedureCode ? dummy.procedureCode.id : '';
                    dummy.billingId = dummy.billingId ? dummy.billingId.id : '';
                    dummy.procedureId = dummy.procedureId ? dummy.procedureId.id : '';
                    dummy.patientEpisodeId = 0;
                    dummy.fileName = dummy.fileName ? dummy.fileName.name : null;
                    dummy.fileLink = null;
                    dummy.updatedByUser = global.loggedUserId;
                    dummy.locationId = dummy.location ? dummy.location : null;
                    delete dummy.err;
                    dummy.organisationId = global.orgId;
                    c.eventOutpatientProcedureDtos.push(dummy)
                    setEventCount(eventcount + 1);
                    a.push(data);
                }
                if (formno == "form3") {
                    let co = eventcount;
                    let aa = JSON.parse(JSON.stringify(dummy?.procedures));
                    let aaa = JSON.parse(JSON.stringify(data.data.procedures));
                    // dummy.procedureCode = dummy.procedure.procedureCode ? dummy.procedure.procedureCode.id : null;
                    dummy.billingId = dummy.billingId ? dummy.billingId.id : '';
                    dummy.fileName = dummy.fileName ? dummy.fileName.name : null;
                    dummy.patientEpisodeId = 0;
                    dummy.fileLink = null;
                    dummy.updatedByUser = global.loggedUserId;
                    dummy.locationName = dummy.locationId ? dummy.locationId.locationName : null;
                    dummy.locationId = dummy.locationId ? dummy.locationId.locationId : null;
                    delete dummy.procedures;
                    delete data.data.procedures;
                    dummy.organisationId = global.orgId;
                    aa.some((dat, i) => {
                        const obj = {
                            ...dummy,
                            procedureCode: dat.procedureCode.id,
                            procedureId: dat.procedureId.id,
                            fee: dat.fee,
                            side: dat.side.id,
                            countId: co + i
                        }
                        delete obj.err;
                        c.eventOperationDtos.push(obj)
                    })
                    aaa.some((dat, i) => {
                        const obj = {
                            ...data,
                            data: {
                                ...data.data,
                                procedureCode: dat.procedureCode,
                                procedureId: dat.procedureId,
                                fee: dat.fee,
                                side: dat.side,
                                countId: co + i
                            },

                        }
                        a.push(obj);
                    })
                    setEventCount(aa.length + eventcount);
                }
                if (formno == "form4") {
                    dummy.billingId = dummy.billingId ? dummy.billingId.id : '';
                    dummy.procedureId = dummy.procedureId ? 2043 : "";
                    dummy.patientEpisodeId = 0;
                    dummy.fileName = dummy.fileName ? dummy.fileName.name : '';
                    dummy.fileLink = null;
                    dummy.notes = "null";
                    dummy.updatedByUser = global.loggedUserId;
                    dummy.hospitalName = dummy.hospitalId ? dummy.hospitalId.hospitalName : null;
                    dummy.locationId = dummy.hospitalId ? dummy.hospitalId.locationId : null;
                    dummy.locationName = dummy.hospitalId ? dummy.hospitalId.locationName : null;
                    dummy.hospitalId = dummy.hospitalId ? dummy.hospitalId.hospitalId : null;
                    delete dummy.err;
                    dummy.organisationId = global.orgId;
                    c.eventInpatientVisitDtos.push(dummy)
                    setEventCount(eventcount + 1);
                    a.push(data);
                }
                setPatientEpisodeEvents(event)

                // a.push(data);
                setEventData(a);
                //console.log("a", a);
                setTempEventData({});
                setProcedure({})
                setEvent(false);
                setApiEvents(c)
            }
            else {
                let temp = { ...tempeventData };
                temp.err = err;
                setTempEventData(temp);
            }
        }
    }

    const options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    const customSelectStyle = {
        control: (provided, state) => ({
            ...provided,
            background: '#f5f5f5',
            boxShadow: 'unset',
            border: '0px solid transparent',
            borderBottom: state.isFocused ? '3px solid #44b5ff' : '3px solid #c5c5c5',
            color: '#000',
            minHeight: '58px',
            paddingBottom: '0px',
            paddingTop: '15px',
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
            zIndex: '99',
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

    const handleDelete = (index, id, formno) => {
        // debugger;
        let a = [...eventData];
        const res = a.filter((item, i) => i !== index);
        setEventData(res)

        let aa = JSON.parse(JSON.stringify(apiEvents));
        if (formno == "form1") {
            let resop = aa["eventOutpatientApptDtos"].filter((item) => item.countId != id)
            aa["eventOutpatientApptDtos"] = resop
            setApiEvents(aa)
        }
        if (formno == "form2") {
            let resop = aa["eventOutpatientProcedureDtos"].filter((item) => item.countId != id)
            aa["eventOutpatientProcedureDtos"] = resop
            setApiEvents(aa)
        }
        if (formno == "form3") {
            let resop = aa["eventOperationDtos"].filter((item) => item.countId != id)
            aa["eventOperationDtos"] = resop
            setApiEvents(aa)
        }
        if (formno == "form4") {
            let resop = aa["eventInpatientVisitDtos"].filter((item) => item.countId != id)
            aa["eventInpatientVisitDtos"] = resop
            setApiEvents(aa)
        }
        //console.log(eventcount);
    }

    const innerhandleDelete = (index) => {
        // debugger;
        let i = { ...tempeventData };
        let res = i.procedures.filter((item, i) => i !== index);
        i.procedures = res;
        //console.log(res)
        setTempEventData(i)

    }

    const dispatch = useDispatch();
    const layouts = useSelector((state) => state.layouts)
    const events = useSelector((state) => state.events)
    const global = useSelector((state) => state.global)
    const [locationddl, setLocationddl] = useState([]);

    useEffect(() => {
        if (events.eventprocedurename != '') {
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
        }
    }, [events.eventprocedurename])

    useEffect(() => {
        let option = { ...tempeventData };
        let operationoption = { ...procedure };
        if (events.eventprocedurename1 != "") {
            if (event != "Operation") {
                option.procedureId = {
                    id: Object.keys(events.eventprocedurename1)[0],
                    name: Object.values(events.eventprocedurename1)[0],
                    value: Object.keys(events.eventprocedurename1)[0],
                    label: Object.values(events.eventprocedurename1)[0]
                }
                setTempEventData(option)
            }
            else {
                operationoption.procedureId = {
                    id: Object.keys(events.eventprocedurename1)[0],
                    name: Object.values(events.eventprocedurename1)[0],
                    value: Object.keys(events.eventprocedurename1)[0],
                    label: Object.values(events.eventprocedurename1)[0]
                }
                setProcedure(operationoption)
            }
        }
    }, [events.eventprocedurename1])

    useEffect(() => {
        if (events.eventprocedurename != '') {
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
        }
    }, [events.eventprocedurecode])

    useEffect(() => {
        if (events.eventprocedurefee != '') {
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
        }
    }, [events.eventprocedurefee])

    useEffect(() => {
        if (events.addprocedurename != '') {
            let b = { ...tempeventData };
            let c = { ...procedure };
            if (Object.keys(b).length != 0 && event == "Outpatient procedure") {
                b.procedureId = {
                    id: events.addprocedurename.key,
                    label: events.addprocedurename.value,
                    name: events.addprocedurename.value,
                    value: events.addprocedurename.key,
                }
                delete b.procedureCode
                setTempEventData(b)
            }
            if (Object.keys(c).length != 0 && event == "Operation") {
                c.procedureId = {
                    id: events.addprocedurename.key,
                    label: events.addprocedurename.value,
                    name: events.addprocedurename.value,
                    value: events.addprocedurename.key,
                }
                delete c.procedureCode
                setProcedure(c)
            }
            let a = [...procedureNameOption];
            let obj = {
                label: events.addprocedurename.value,
                value: events.addprocedurename.key,
            }
            a.push(obj);
            setProcedureNameOption(a);
        }

    }, [events.addprocedurename])

    useEffect(() => {
        if (events.addprocedurecode != '') {
            let b = { ...tempeventData };
            let c = { ...procedure };
            if (Object.keys(b).length != 0 && event == "Outpatient procedure") {
                b.procedureCode = {
                    id: events.addprocedurecode.key,
                    label: events.addprocedurecode.value,
                    name: events.addprocedurecode.value,
                    value: events.addprocedurecode.key,
                }
                setTempEventData(b)
            }
            if (Object.keys(c).length != 0 && event == "Operation") {
                c.procedureCode = {
                    id: events.addprocedurecode.key,
                    label: events.addprocedurecode.value,
                    name: events.addprocedurecode.value,
                    value: events.addprocedurecode.key,
                }
                setProcedure(c)
            }
            let a = [...procedureCodeOption];
            let obj = {
                label: events.addprocedurecode.value,
                value: events.addprocedurecode.key,
            }
            a.push(obj);
            setProcedureCodeOption(a);
        }
    }, [events.addprocedurecode])

    useEffect(() => {
        if (layouts.clinicfee != "") {
            let a = { ...tempeventData };
            a.fee = a.OutpatientApptCategoryId?.id === 320 ? layouts?.clinicfee?.followupFee : layouts?.clinicfee?.newFee
            setTempEventData(a);
        }
    }, [layouts.clinicfee])

    useEffect(() => {
        let option = [];
        Object.keys(events.eventhospitalname).map((data, i) => {
            let d = {
                value: data,
                label: events.eventhospitalname[data]
            }
            option.push(d);
        })
        setLocationddl(option);
    }, [events.eventhospitalname])

    useEffect(() => {
        if (layouts.addhospital != "") {
            let b = { ...tempeventData };
            if (event != "inpatient visit") {
                b.locationId = {
                    locationId: layouts.addhospital.key,
                    locationName: layouts.addhospital.value
                };
            }
            else {
                b.hospitalId = {
                    hospitalId: layouts.addhospital.key,
                    hospitalName: layouts.addhospital.value,
                    locationId: layouts.addhospital.key,
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
        <div className="mt-4">
            <h3>EVENTS</h3>
            <div className="pop-layout p-lg-4 p-md-3 p-2">
                <div className='my-2'>
                    <div className='border-frame'>
                        <div className="mb-2">
                            <div className="table-responsive">
                                <table className="table table-borderless event-table">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Date</th>
                                            <th>Billing</th>
                                            <th>Fee</th>
                                            <th>Document</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            eventData.map((data, i) => {
                                                if (data.name == 'form1') {
                                                    return (
                                                        <tr key={'item' + i}>
                                                            <td>Clinic appt - {data?.data?.OutpatientApptCategoryId?.name}</td>
                                                            <td>{data?.data?.scheduleDate.split("T").join(" ")}</td>
                                                            <td>{data?.data?.billingId?.label}</td>
                                                            <td>£ {data?.data?.fee}</td>
                                                            <td>{data?.data?.fileName ? data?.data?.fileName?.name : ''}</td>
                                                            {/* <td><img width='50' height='50' src={data.data.upload_letter.url}></img></td> */}
                                                            <td>
                                                                {/* <a href="#" className="me-1">Edit</a> */}
                                                                <a href="#" className="me-1" onClick={() => handleDelete(i, data.data.countId, data.name)}>Delete</a>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                if (data.name == 'form2') {
                                                    return (
                                                        <tr key={'item' + i}>
                                                            <td>Outpatient procedure ({data?.data?.procedureId?.name})</td>
                                                            <td>{data?.data?.procedureDate?.split("T").join(" ")}</td>
                                                            <td>{data?.data?.billingId?.label}</td>
                                                            <td>£ {data?.data?.fee}</td>
                                                            <td>{data?.data?.fileName ? data.data.fileName.name : ''}</td>
                                                            <td>
                                                                {/* <a href="#" className="me-1">Edit</a> */}
                                                                <a href="#" className="me-1" onClick={() => handleDelete(i, data.data.countId, data.name)}>Delete</a>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                if (data.name == 'form3') {
                                                    return (
                                                        <tr key={'item' + i} className="align-middle">
                                                            <td>Operation ({data.data.side.name + " - " + data.data.procedureId.name})</td>
                                                            <td>{data.data.operationDate != null ? data.data.operationDate.split("T").join(" ") : null}</td>
                                                            <td>{data?.data?.billingId?.label}</td>
                                                            <td>£ {data.data.fee}</td>
                                                            <td>{data.data.fileName ? data.data.fileName.name : ''}</td>
                                                            <td>
                                                                {/* <a href="#" className="me-1">Edit</a> */}
                                                                <a href="#" className="me-1" onClick={() => handleDelete(i, data.data.countId, data.name)}>Delete</a>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                if (data.name == 'form4') {
                                                    return (
                                                        <tr key={'item' + i}>
                                                            <td>Inpatient visit ({data?.data?.hospitalId.hospitalName})</td>
                                                            <td>{data?.data?.procedureDate.split("T").join(" ")}</td>
                                                            <td>{data?.data?.billingId?.label}</td>
                                                            <td>£ {data?.data?.fee}</td>
                                                            <td>{data?.data?.fileName ? data.data.fileName.name : ''}</td>
                                                            <td>
                                                                {/* <a href="#" className="me-1">Edit</a> */}
                                                                <a href="#" className="me-1" onClick={() => handleDelete(i, data.data.countId, data.name)}>Delete</a>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='d-flex flex-wrap justify-content-start'>
                            {/* <button className='btn btn-plan'>Add Events</button> */}

                            {
                                event == "" ?
                                    <div className="dropdown">
                                        <button className="btn btn-plan dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            Add Events
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" onClick={() => { handleEvent('Clinic appointment') }}>Clinic appointment</a></li>
                                            <li><a className="dropdown-item" onClick={() => { handleEvent('Outpatient procedure') }}>Outpatient procedure</a></li>
                                            <li><a className="dropdown-item" onClick={() => { handleEvent('Operation') }}>Operation</a></li>
                                            <li><a className="dropdown-item" onClick={() => { handleEvent('inpatient visit') }}>Inpatient visit</a></li>
                                        </ul>
                                    </div> :
                                    <button
                                        className="btn btn-plan"
                                        type="button"
                                        onClick={() => {
                                            setEvent('');
                                            setTempEventData({})
                                            setProcedure({})
                                            dispatch({ type: "EVENTPROCEDUREFEE_SUCCESS", payload: "" })
                                        }}
                                    >
                                        <FaTimes /> Cancel
                                    </button>
                            }
                        </div>

                        {
                            event == 'Clinic appointment' ?
                                <OutPatientAppointment page="addpatient" customSelectStyle={customSelectStyle} locationddl={locationddl} newevent={true} tempeventDatafn={tempeventDatafn} eventDatafn={eventDatafn} tempeventData={tempeventData} />
                                : <></>
                        }
                        {
                            event == 'Outpatient procedure' ?
                                <OutPatientProcedure page="addpatient" newevent={true} tempeventDatafn={tempeventDatafn} procedureNameOption={procedureNameOption} procedureCodeOption={procedureCodeOption} customSelectStyle={customSelectStyle} eventDatafn={eventDatafn} tempeventData={tempeventData} />
                                : <></>
                        }
                        {
                            event == 'Operation' ?
                                <Operation page="addpatient" newevent={true} tempeventDatafn={tempeventDatafn} locationddl={locationddl} procedureNameOption={procedureNameOption} procedureCodeOption={procedureCodeOption} customSelectStyle={customSelectStyle} eventDatafn={eventDatafn} tempeventData={tempeventData} procedure={procedure} innerhandleDelete={innerhandleDelete} />
                                : <></>
                        }
                        {
                            event == 'inpatient visit' ?
                                <InPatientVisit page="addpatient" customSelectStyle={customSelectStyle} newevent={true} locationddl={locationddl} tempeventDatafn={tempeventDatafn} eventDatafn={eventDatafn} tempeventData={tempeventData} />
                                : <></>
                        }
                    </div>
                </div>
            </div>
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
        </div >

    );
})



export default ModalEvents;