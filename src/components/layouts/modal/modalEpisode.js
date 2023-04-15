import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FaPlus, FaArrowRight } from "react-icons/fa";
import { episodePatientstatus, episodeReferalsource, episodeBillingtype } from "../../../actions/episode";
import { connect, useDispatch, useSelector } from "react-redux";
import ReferrerDetails from "../layoutcomponents/referrerDetails";
import BillingType from "../layoutcomponents/billingType";
import Collaborator from "../layoutcomponents/collaborator";
import GpDetails from "../layoutcomponents/gpDetails";



const ModalEpisode = forwardRef((props, ref) => {

    const [collaborator, setCollaborator] = useState({ crntfield: {} });
    const [address, setAddress] = useState({});
    const [showType, setShowType] = useState(false);
    const [patientstatusip, setPatientStatusIp] = useState(false);
    const [embassyType, setEmbassyType] = useState(false);
    const [solicitorType, setSolicitorType] = useState(false);
    const [billingProp, setBillingProp] = useState({});
    const [billingTypeId, setBillingTypeId] = useState("");

    console.log(props.validationerr)

    useEffect(() => {
        setAddress(props.address)
    }, [props])

    useEffect(()=>{
        if (layouts.episodepatient.patientEpisode.patientStatusId == '361' && props.page == "homepage_popup") {
            setPatientStatusIp(true)
        }
        else {
            setPatientStatusIp(false)
        }
    },[])

    const collaboratorfn = (type, data1, data2) => {
        if (type === 'show') {
            let i = { ...collaborator }
            i.show = i.show ? !i.show : true;
            i.crntfield = {};
            i.field = i.field ? i.field : [];
            i.err = [];
            setCollaborator(i)
        }
        if (type === 'field') {
            let i = { ...collaborator }
            i['crntfield'][data1] = data2;
            setCollaborator(i)
            // console.log(i)
        }
    }

    const addcollaboratorfn = () => {
        // debugger;
        let j = { ...collaborator };
        let res = {
            practice: j['crntfield'].practice,
            name: j['crntfield'].name,
            email: j['crntfield'].email,
            address1: null,
            address2: null,
            address3: null,
            postCode: null
        }
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        let errres = {
            errpractice: (j['crntfield'].practice === '' || j['crntfield'].practice === null || j['crntfield'].practice === undefined) ? true : false,
            errname: (j['crntfield'].name === '' || j['crntfield'].name === null || j['crntfield'].name === undefined) ? true : false,
            erremail: (
                (j['crntfield'].email === '' || j['crntfield'].email === null || j['crntfield'].email === undefined) ?
                    "Email is required" : (!emailPattern.test(j['crntfield'].email)) ? "Enter a valid email" : ""),
        }
        j['err'] = errres;
        // console.log(errres);
        if (j.field.length >= 0 && !Object.values(errres).some(value => value === true) && Object.keys(errres.erremail) == "") {
            j['field'].push(res);
            j.showtable = true;
            j.show = false;
            j.crntfield = {};
        }
        setCollaborator(j)
    }

    useImperativeHandle(ref, () => ({

        getformData() {
            //console.log(collaborator)
            // let a = (collaborator.field.length > 0) ? collaborator.field : collaborator;
            props.getData(collaborator)
        },
        validate() {
            //console.log('got inside');
        }

    }));

    const getAddress = () => {
        props.getAddress()
        setAddress(props.address)
    }

    const clearAddress = () => {
        let a = { ...address };
        let res = a;
        Object.keys(a).map((e) => {
            res[e] = "";
        })
        setAddress(res)
    }

    // console.log(props);
    const innerhandleDelete = (index) => {
        let i = { ...collaborator };
        //console.log(i)
        let res = i.field.filter((item, i) => i !== index);
        i.field = res;
        //console.log(res)
        setCollaborator(i)
    }

    const patientstatus = (e) => {
        if (e.target.value == '361') {
            setPatientStatusIp(true)
        }
        else {
            setPatientStatusIp(false)
        }
    }

    const handlePrimaryConsultantChange = (e, type) => {
        dispatch({ type: 'CURRENTPRIMARYCONSULTANT', payload: e })
        dispatch({ type: 'GETCLINICAPPOINTMENTMINUTE', payload: e })
        if(billingTypeId !== "" || (props.page == "homepage_popup" && layouts.episodepatient?.patientEpisode?.billingTypeId)){
            console.log(showType)
            let obj = {
                userId: e,
                billingTypeId: props.page == "homepage_popup" ? layouts.episodepatient?.patientEpisode?.billingTypeId : billingTypeId,
                insurerId : billingTypeId == 307 ? global.insurerName.insurerId : ""
            }

            dispatch({type:"GETCLINICFEE",payload:obj})
        }
   }

    const billingTypeHandler = (e) => {
        setShowType(e.value == 307 ? "self" : e.value == 308 ? "solicitor" : e.value == 309 ? "embassy" : "")
        setBillingTypeId(e.value)
        dispatch({type:"BILLINGTYPE",payload:e});
        let a = JSON.parse(JSON.stringify(billingProp));
        a.billingTypeId = e.value;
        setBillingProp(a);
        let obj = {
            userId: global.currentPrimaryConsultant,
            billingTypeId: e.value-1,
            insurerId: e.value == 307 ? global.insurerName.insurerId : ""
        }
        if(global.insurerName != "" || e.value != 307){
            dispatch({ type: "GETCLINICFEE", payload: obj })
        }
    }

    const dispatch = useDispatch();
    const episode = useSelector((state) => state.episode)
    const layouts = useSelector((state) => state.layouts)
    const global = useSelector((state) => state.global)

    useEffect(() => {
        dispatch({ type: 'EPISODEPATIENTSTATUS' })
        dispatch({ type: 'EPISODEREFERALSOURCE' })
        dispatch({ type: 'EPISODEBILLINGTYPE' })
        // dispatch({ type: 'EPISODEPRIMARYCONSULTANT', payload: global.orgId })
        dispatch({ type: 'EPISODEINSURANCECOMPANY' })
        dispatch({ type: 'EPISODEEMBASSYID' })
        dispatch({ type: 'EPISODESOLIITORFIRM' })
    }, [])

    useEffect(() => {
        if(props.page != "addpatient"){
            setShowType(
                layouts.episodepatient?.patientEpisode?.billingTypeId == 307 ? "self" :
                layouts.episodepatient?.patientEpisode?.billingTypeId == 308 ? "solicitor" :
                layouts.episodepatient?.patientEpisode?.billingTypeId == 309 ? "embassy" :
                layouts.episodepatient?.patientEpisode?.billingTypeId == 361 ? "patientstatus" : ""
            )
            setBillingProp(layouts?.episodepatient?.patientEpisode);
        }
    }, [layouts.episodepatient])

    return (
        <div className="mt-4">
            <h3>EPISODE INFORMATION</h3>
            <div className="pop-layout p-lg-4 p-md-3 p-2">
                <div className='row m-lg-0'>
                    {
                        props.page == "homepage_popup" ?
                            <div className='my-2'>
                                <GpDetails page={props.page} validationerr={props.gpvalidationerr} demographicChange={{}} tempDemoData={layouts.demographicpatient.patientDemographic} readonly={{}} />
                            </div>
                            : <></>
                    }
                    <div className='col-md-6'>
                        <div className='my-2'>
                            <div className="border-frame">
                                <div className='details_Input'>
                                    <div className='details_Input p-0'>
                                        <div className="form-floating my-2">
                                            <select 
                                                className={props.validationerr ? props.validationerr.primaryConsultantUserId ? 'is-invalid form-select' : 'form-select' : 'form-select'} 
                                                name="primaryConsultantUserId" 
                                                id="PrimaryConsultant" 
                                                // value={
                                                //     Object.keys(episode.episodeprimaryconsultant).length > 1 ? 
                                                //     null 
                                                //     : Object.keys(episode.episodeprimaryconsultant).map((data, i) => (data))
                                                // } 
                                                defaultValue={props.page == "homepage_popup" ? layouts.episodepatient.patientEpisode.primaryConsultantUserId : ""}
                                                onChange={(e) => {
                                                    handlePrimaryConsultantChange(e.target.value, "outer");
                                                }}
                                            >
                                                <option hidden></option>
                                                {
                                                    Object.keys(episode.episodeprimaryconsultant).map((data, i) =>
                                                        <option value={data}>{episode.episodeprimaryconsultant[data]}</option>
                                                    )
                                                }
                                            </select>
                                            <label htmlFor="PrimaryConsultant">*Primary Consultant</label>
                                            <small className="text-danger">{props.validationerr ? props.validationerr.primaryConsultantUserId ? 'Consultant Name is required' : '' : ''}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-2'>
                            <ReferrerDetails validationerr={props.validationerr} tempDemoData={{}} />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='my-2'>
                            <div className="border-frame">
                                <div className='details_Input'>
                                    <div className='details_Input p-0'>
                                        <div className="form-floating my-2">
                                            <select 
                                                className={props.validationerr ? props.validationerr.patientStatusId ? 'is-invalid form-select' : 'form-select' : 'form-select'} 
                                                name="patientStatusId" 
                                                id="patientStatus" 
                                                onChange={patientstatus}
                                                defaultValue={props.page == "homepage_popup" ? layouts.episodepatient.patientEpisode.patientStatusId : ""}
                                            >
                                                <option hidden></option>
                                                {
                                                    Object.keys(episode.episodepatientstatus).map((data, i) =>
                                                        <option value={data}>{episode.episodepatientstatus[data]}</option>
                                                    )
                                                }
                                            </select>
                                            <label htmlFor="patientStatus">*Patient Status</label>
                                            <small className="text-danger">{props.validationerr ? props.validationerr.patientStatusId ? 'Patient Status is required' : '' : ''}</small>
                                        </div>
                                        {
                                            patientstatusip ?
                                                <>
                                                    <div className="form-floating mb-2">
                                                        <input 
                                                            type="text" 
                                                            id="stsHospitalName" 
                                                            className={props.validationerr ? props.validationerr.hospitalName ? 'is-invalid form-control' : 'form-control' : 'form-control'} 
                                                            name="patientStatusHospitalName" 
                                                            defaultValue={props.page == "homepage_popup" ? layouts.episodepatient.patientEpisode.patientStatusHospitalName : ""}
                                                        />
                                                        <label htmlFor="stsHospitalName">Hospital Name</label>
                                                    </div>
                                                </>
                                                : <></>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='my-2'>
                            <BillingType data={props.page == "homepage_popup" ? billingProp : {}} readonly={false} validationerr={props.validationerr} page={props.page} billingTypeHandler={billingTypeHandler} getAddress={getAddress} clearAddress={clearAddress} showType={showType} address={address} />
                        </div>
                    </div>
                    <div className='my-2'>
                        <Collaborator collaboratorfn={collaboratorfn} collaborator={collaborator} innerhandleDelete={innerhandleDelete} addcollaboratorfn={addcollaboratorfn} />
                    </div>
                    <div className='my-2'>
                        <h3>NOTES</h3>
                        <div className='border-frame'>
                            <div className=''>
                                <div className="form-floating mb-2 pt-4 notes">
                                    <textarea className="form-control" name="Notes" id='Notes'></textarea>
                                    <label htmlFor="Notes">Notes</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})


export default ModalEpisode;