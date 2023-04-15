import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import CreatableSelect from 'react-select/creatable';




function OutPatientProcedure(props) {

    const events = useSelector((state) => state.events)
    const layouts = useSelector((state) => state.layouts)
    const global = useSelector((state) => state.global)
    const dispatch = useDispatch();
    console.log(props.tempeventData)
    useEffect(()=>{
        return()=>{
            dispatch({type:"EVENTPROCEDURENAME1_SUCCESS",payload:''})
        }
    },[])
    return (
        <>
            <div className="details_Input py-2 container-fluid">
                <h5><b>Outpatient procedure</b></h5>
                <div className="row">
                    <div className="row-col-md-6">
                        <div className="form-floating">
                            <input type="datetime-local" max={"9999-12-31"} maxLength="4" pattern="[1-9][0-9]{3}"
                                className={(props?.tempeventData?.err?.procedureDate == "" || props?.tempeventData?.err?.procedureDate == null || props?.tempeventData?.err?.procedureDate == undefined) ? "form-control" : "form-control is-invalid"} name="procedureDate" value={props.tempeventData.procedureDate ? (
                                    props.tempeventData.procedureDate.split("T")[0].split('/').reverse().join("-") + "T" + props.tempeventData.procedureDate.split("T")[1]
                                ) : ''} onChange={(e) => { props.tempeventDatafn('procedureDate', e.target.value, 'form2') }} id="FeeEvent" />
                            <label htmlFor="FeeEvent">Date</label>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.procedureDate}</small>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <label className="form-label pt-1 m-0 input-label-asw" htmlFor="ProcedureName">Procedure Name</label>
                            <CreatableSelect
                                createOptionPosition="first"
                                // className={(props?.tempeventData?.err?.procedureId == '' || props?.tempeventData?.err?.procedureId == null || props?.tempeventData?.err?.procedureId == undefined) ? "form-select" : "form-select is-invalid"}
                                id="ProcedureName"
                                name='procedureId'
                                options={props.procedureNameOption}
                                styles={props?.tempeventData?.err?.procedureId ? props.customSelecterrStyle : props.customSelectStyle}
                                aria-label="Floating label select Source"
                                value = {
                                    (props.newevent && props.page != "homepage") ? (props.tempeventData.procedureId ? props.tempeventData.procedureId : '' ) :
                                        (props.procedureNameOption.filter(option => 
                                            option.value == props.tempeventData?.procedureId ))
                                }
                                onChange={(e) => {
                                    var reg = /^\d+$/;
                                    if(props.newevent && props.page != "homepage"){
                                        props.tempeventDatafn(
                                            'procedureId',
                                            {
                                                id: e.value.match(reg) == null ? e.value : parseInt(e.value),
                                                name: events.eventprocedurename[e.value] ? events.eventprocedurename[e.value] : e.value,
                                                value: e.value.match(reg) == null ? e.value : parseInt(e.value),
                                                label: events.eventprocedurename[e.value] ? events.eventprocedurename[e.value] : e.value,
                                            },
                                            'form2'
                                        )
                                    }
                                    else{
                                        props.tempeventDatafn(
                                            'procedureId',
                                            e.value,
                                            'form2'
                                        )
                                    }
                                }}
                                isDisabled={props.tempeventData?.billingId ? false : true}
                            />
                            {/* <option hidden></option>
                                {
                                    Object.keys(events.eventprocedurename).map((data, i) =>
                                        <option value={data}>{events.eventprocedurename[data]}</option>
                                    )
                                }
                            </select> */}
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.procedureId}</small>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <label className="form-label pt-1 m-0 input-label-asw" htmlFor="CodeEvent">Procedure Code</label>
                            <CreatableSelect
                                // className={(props?.tempeventData?.err?.procedureCode == '' || props?.tempeventData?.err?.procedureCode == null || props?.tempeventData?.err?.procedureCode == undefined) ? "form-select" : "form-select is-invalid"}
                                id="CodeEvent"
                                name='procedureCode'
                                createOptionPosition="first"
                                options={props.procedureCodeOption}
                                isDisabled={props.tempeventData?.billingId ? false : true}
                                styles={props?.tempeventData?.err?.procedureCode ? props.customSelecterrStyle : props.customSelectStyle}
                                aria-label="Floating label select Source"
                                value = {
                                    (props.newevent && props.page != "homepage") ? (props.tempeventData.procedureCode ? props.tempeventData.procedureCode : '' ) :
                                        (props.procedureCodeOption.filter(option => 
                                            option.value == props.tempeventData?.procedureCode ))
                                }
                                onChange={(e) => {
                                    var reg = /^\d+$/;
                                    if(props.newevent && props.page != "homepage"){
                                        props.tempeventDatafn(
                                            'procedureCode',
                                            {
                                                id: e.value.match(reg) == null ? e.value : parseInt(e.value),
                                                name: events.eventprocedurecode[e.value] ? events.eventprocedurecode[e.value] : e.value,
                                                value: e.value.match(reg) == null ? e.value : parseInt(e.value),
                                                label: events.eventprocedurecode[e.value] ? events.eventprocedurecode[e.value] : e.value,
                                            },
                                            'form2'
                                        )
                                    }
                                    else{
                                        props.tempeventDatafn(
                                            'procedureCode',
                                            e.value,
                                            'form2'
                                        )
                                    }
                                }}
                                disabled={!props?.tempeventData?.procedureId?.id}
                            />
                            {/* <option hidden></option>
                                {
                                    Object.keys(events.eventprocedurecode).map((data, i) =>
                                        <option value={data}>{events.eventprocedurecode[data]}</option>
                                    )
                                }
                            </select> */}
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.procedureCode}</small>
                    </div>
                    <div className={props.tempeventData?.billingId?.id == 307 ? "col-md-3" : "col-md-6" }>
                        <div className="form-floating ">
                            <select
                                className={(props?.tempeventData?.err?.billingId == '' || props?.tempeventData?.err?.billingId == null || props?.tempeventData?.err?.billingId == undefined) ? "form-select" : "form-select is-invalid"}
                                id="BillingEvent"
                                name='billingId'
                                aria-label="Floating label select Source"
                                value={(typeof props.tempeventData?.billingId == "object") ? (props.tempeventData?.billingId ? props.tempeventData?.billingId.id : '') : (props.tempeventData?.billingId)}
                                onChange={(e) => {
                                    props.tempeventDatafn('billingId', { id: parseInt(e.target.value), label: events.eventbillingid[e.target.value] }, 'form2')
                                }}
                            >
                                <option hidden></option>
                                {
                                    Object.keys(events.eventbillingid).map((data, i) =>
                                        <option value={data}>{events.eventbillingid[data]}</option>
                                    )
                                }
                            </select>
                            <label htmlFor="BillingEvent">Billing</label>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.billingId}</small>
                    </div>

                    {
                        props.tempeventData?.billingId?.id == 307 ?
                        <div className="col-md-3">
                            <a href={global.insurerName.insurerLink} rel="noreferrer" className="form-floating cursor-pointer" target="_blank">
                                <input
                                    readOnly
                                    disabled={true}
                                    type="text"
                                    className="form-control"
                                    id="insurerName"
                                    name='insurerName'
                                    value={props.page == "homepage" ? layouts.episodepatient.patientEpisode.billingInsuranceCompanyName : global.insurerName.insurerName}
                                />
                                <label htmlFor="typeId">Insurer Name</label>
                            </a>
                            <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.billingId}</small>
                        </div> :
                        <></>
                    }
                    <div className="col-md-6">
                        <div className="form-floating outpatient_fee">
                            {/* <select className={(props?.tempeventData?.err?.fee == '' || props?.tempeventData?.err?.fee == null || props?.tempeventData?.err?.fee == undefined) ? "form-select" : "form-select is-invalid"} name="fee" value={props.tempeventData.fee ? props.tempeventData.fee : ''} onChange={(e) => { props.tempeventDatafn('fee', parseFloat(e.target.value), 'form2') }} id="FeeEvent" disabled={!props?.tempeventData?.procedureCode} aria-label="Floating label select Source">
                                <option hidden></option>
                                {
                                    Object.keys(events.eventprocedurefee).map((data, i) =>
                                        <option value={data}>{events.eventprocedurefee[data]}</option>
                                    )
                                }
                            </select> */}
                            <input type="number" className="form-control" step='0.01' name="fee" value={props.tempeventData?.fee ? props.tempeventData.fee : ''} onChange={(e) => { props.tempeventDatafn('fee', parseFloat(e.target.value), 'form2') }} id="FeeEvent" disabled={!props?.tempeventData?.procedureCode} />
                            <label htmlFor="FeeEvent">Fee</label>
                            <span className="">£</span>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.fee}</small>
                    </div>

                    <div className="col-md-12">
                        <div className="file-uplaod mb-2 p-0">
                            <input type="file" name="fileName" id="Upload Letter" className="form-control" onChange={(e) => { props.tempeventDatafn('fileName', e, 'form2', true) }} />
                            <label htmlFor="Upload Letter">Upload Letter</label>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-start pt-2'>
                    <button className='btn btn-plan me-2' type="submit"
                        // disabled={Object.keys(props.tempeventData).length >= 5 ? false : true}
                        onClick={() => { if (props.page != "homepage") (props.eventDatafn('form2')) }}> {props.newevent ? "Add" : "Update" } <FaArrowRight /></button>
                </div>
            </div>
        </>
    );
}

export default OutPatientProcedure;