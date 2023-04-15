import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import CreatableSelect from 'react-select/creatable';

function Operation(props) {
    const events = useSelector((state) => state.events)
    const layouts = useSelector((state) => state.layouts)
    const global = useSelector((state) => state.global)
    console.log(props)
    const dispatch = useDispatch();
    useEffect(()=>{
        return()=>{
            dispatch({type:"ADDHOSPITAL_SUCCESS",payload:''})
            dispatch({type:"EVENTPROCEDURENAME1_SUCCESS",payload:''})
        }
    },[])
    return (
        <>
            <div className="details_Input py-2 container-fluid">
                <h5><b>Operation</b></h5>
                <div className="row">
                    <div className=" col-md-6">
                        <div className="form-floating mb-2">
                            <input type="datetime-local" max={"9999-12-31"} maxLength="4" pattern="[1-9][0-9]{3}" className={(props?.tempeventData?.err?.operationDate == "" || props?.tempeventData?.err?.operationDate == null || props?.tempeventData?.err?.operationDate == undefined) ? "form-control" : "form-control is-invalid"} id="OperationDate" name="operationDate" value={props.tempeventData.operationDate ? (
                                props.tempeventData.operationDate.split("T")[0].split('/').reverse().join("-") + "T" + props.tempeventData.operationDate.split("T")[1]
                            ) : ''} onChange={(e) => { props.tempeventDatafn('operationDate', e.target.value, 'form3') }} />
                            <label htmlFor="OperationDate">Date</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <label className="form-label pt-1 m-0 input-label-asw" htmlFor="locationOPEvent">Location</label>
                            <CreatableSelect
                                id="locationOPEvent"
                                createOptionPosition="first"
                                aria-label="Floating label select Source"
                                name="locationId"
                                options={props.locationddl}
                                styles={props?.tempeventData?.err?.locationId ? props.customSelecterrStyle : props.customSelectStyle}
                                value = {
                                    (props.locationddl.filter(option => 
                                        option.value == (props.tempeventData?.locationId?.locationId ? props.tempeventData?.locationId?.locationId : props.tempeventData?.locationId) ))
                                }
                                onChange={(e) => {
                                    props.tempeventDatafn(
                                        'locationId',
                                        {
                                            locationName: e.label,
                                            locationId: e.value
                                        },
                                        'form3'
                                    )
                                }}
                            />
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.locationId}</small>
                    </div>
                    <div className=" col-md-6">
                        <div className="form-floating mb-2">
                            <select
                                className={(props?.tempeventData?.err?.billingId == '' || props?.tempeventData?.err?.billingId == null || props?.tempeventData?.err?.billingId == undefined) ? "form-select" : "form-select is-invalid"}
                                id="OperationBilling"
                                name='billingId'
                                aria-label="Floating label select Source"
                                value={(typeof props.tempeventData?.billingId == "object") ? (props.tempeventData?.billingId ? props.tempeventData?.billingId.id : '') : (props.tempeventData?.billingId)}
                                onChange={(e) => {
                                    props.tempeventDatafn('billingId', { id: parseInt(e.target.value), label: events.eventbillingid[e.target.value] }, 'form3')
                                }}
                            >
                                <option hidden></option>
                                {
                                    Object.keys(events.eventbillingid).map((data, i) =>
                                        <option value={data}>{events.eventbillingid[data]}</option>
                                    )
                                }
                            </select>
                            <label htmlFor="OperationBilling">Billing</label>
                        </div>
                    </div>
                    {
                        props.tempeventData?.billingId?.id == 307 ?
                        <div className="col-md-6">
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
                    <div className="col-md-12">
                        <div className="procedure row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-2 p-0">
                                    <label className="form-label pt-1 m-0 input-label-asw" htmlFor="ProcedureName">Procedure/s</label>
                                    <CreatableSelect
                                        createOptionPosition="first"
                                        id="ProcedureName"
                                        aria-label="Floating label select Source"
                                        name="procedureId"
                                        options={props.procedureNameOption}
                                        styles={props.customSelectStyle}
                                        isDisabled={props.tempeventData?.billingId ? false : true}
                                        value = {
                                            props.newevent? (props.procedure.procedureId ? props.procedure.procedureId : "" ) :
                                                (props.procedureNameOption.filter(option => 
                                                    option.value == props.tempeventData?.procedureId ))
                                        }
                                        onChange={(e) => {
                                            if(props.newevent){
                                                var reg = /^\d+$/;
                                                props.tempeventDatafn(
                                                    'procedureId', {
                                                    id: e.value.match(reg) == null ? e.value : parseInt(e.value),
                                                    name: events.eventprocedurename[e.value] ? events.eventprocedurename[e.value] : e.value,
                                                    value: e.value.match(reg) == null ? e.value : parseInt(e.value),
                                                    label: events.eventprocedurename[e.value] ? events.eventprocedurename[e.value] : e.value
                                                }, 'form3')
                                            }
                                            else{
                                                props.tempeventDatafn(
                                                    'procedureId', e.value, 'form3')
                                            }
                                        }}
                                    />
                                    {/* <option hidden></option>
                                    {
                                        Object.keys(events.eventprocedurename).map((data, i) =>
                                            <option value={data}>{events.eventprocedurename[data]}</option>
                                        )
                                    }
                                </select> */}
                                </div>
                            </div>
                            <div className=" col-md-6">
                                <div className="form-floating mb-2">
                                    <select
                                        className="form-select"
                                        id="OperationSide"
                                        aria-label="Floating label select Source"
                                        name="side"
                                        value={props?.newevent ? (props.procedure.side ? props.procedure.side.id : '') : (props.tempeventData.side ? props.tempeventData.side : '')}
                                        onChange={(e) => {
                                            props.tempeventDatafn('side', { id: e.target.value, name: events.eventside[e.target.value] }, 'form3')
                                        }}
                                    >
                                        <option hidden></option>
                                        {
                                            Object.keys(events.eventside).map((data, i) =>
                                                <option value={data}>{events.eventside[data]}</option>
                                            )
                                        }
                                    </select>
                                    <label htmlFor="OperationSide">Side</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating mb-2">
                                    <label className="form-label pt-1 m-0 input-label-asw" htmlFor="OperationProcedureCode">Procedure code/s</label>
                                    <CreatableSelect
                                        id="OperationProcedureCode"
                                        createOptionPosition="first"
                                        aria-label="Floating label select Source"
                                        name="procedureCode"
                                        options={props.procedureCodeOption}
                                        styles={props.customSelectStyle}
                                        isDisabled={props.tempeventData?.billingId ? false : true}
                                        // value={}
                                        value = {
                                            props.newevent ? (props.procedure.procedureCode ? props.procedure.procedureCode : '' ) :
                                                (props.procedureCodeOption.filter(option => 
                                                    option.value == props.tempeventData?.procedureCode ))
                                        }
                                        onChange={(e) => {
                                            if(props.newevent){
                                                var reg = /^\d+$/;
                                                props.tempeventDatafn(
                                                    'procedureCode', {
                                                    id: e.value.match(reg) == null ? e.value : parseInt(e.value),
                                                    name: events.eventprocedurecode[e.value] ? events.eventprocedurecode[e.value] : e.value,
                                                    value: e.value.match(reg) == null ? e.value : parseInt(e.value),
                                                    label: events.eventprocedurecode[e.value] ? events.eventprocedurecode[e.value] : e.value
                                                }, 'form3')
                                            }
                                            else{
                                                props.tempeventDatafn(
                                                    'procedureCode', e.value, 'form3')
                                            }
                                        }}
                                        disabled={!props?.procedure?.procedureId?.id}
                                    />
                                    {/* <option hidden></option>
                                        {
                                            Object.keys(events.eventprocedurecode).map((data, i) =>
                                                <option value={data}>{events.eventprocedurecode[data]}</option>
                                            )
                                        }
                                    </select> */}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating mb-2 outpatient_fee">
                                    <input
                                        type="number"
                                        className="form-control"
                                        step='0.01'
                                        id="CodeEvent"
                                        name="fee"
                                        value={props?.newevent ? (props.procedure.fee ? props.procedure.fee : '') : (props.tempeventData.fee ? props.tempeventData.fee : '')}
                                        onChange={(e) => { props.tempeventDatafn('fee', parseFloat(e.target.value), 'form3') }} 
                                        disabled={props.newevent ? (!props?.procedure?.procedureCode?.id) : (!props?.tempeventData?.procedureCode)}
                                    />
                                    <label htmlFor="CodeEvent">Fee</label>
                                    <span className="">£</span>
                                </div>
                            </div>
                            {
                                props?.newevent ?
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center h-100">
                                            <button
                                                className="btn btn-plan"
                                                type="button"
                                                disabled={Object.keys(props.procedure).length == 4 ? false : true}
                                                onClick={(e) => { props.page != "homepage" ? (props.eventDatafn('form3', "procedures")) : props.getEventData(e, 'procedures') }}
                                            >
                                                Add <FaArrowRight />
                                            </button>
                                        </div>
                                    </div> :
                                    <></>
                            }

                            <small className="invalid">{props?.tempeventData?.err?.procedure}</small>
                        </div>
                    </div>

                    {
                        props?.newevent ?
                            <div className="procedure-table table-responsive">
                                <table className='table table-borderless event-table'>
                                    <thead>
                                        <tr>
                                            <th>Side</th>
                                            <th>Procedure</th>
                                            <th>Procedure Code</th>
                                            <th>Procedure Fee</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.tempeventData.procedures ?
                                                props.tempeventData.procedures.map((data, i) =>
                                                    <tr key={data.procedureId + i}>
                                                        <td>{data.side.name}</td>
                                                        <td>{data.procedureId.name}</td>
                                                        <td>{data.procedureCode.name}</td>
                                                        <td>{"£ " + data.fee}</td>
                                                        <td>
                                                            <a href="#dd" onClick={() => props.innerhandleDelete(i)}>Delete</a>
                                                        </td>
                                                    </tr>
                                                ) :
                                                <></>
                                        }
                                    </tbody>
                                </table>
                            </div> :
                            <></>
                    }

                    <div className=" col-md-6">
                        <div className="form-floating mb-2">
                            <select className={(props?.tempeventData?.err?.anaeastheticId == '' || props?.tempeventData?.err?.anaeastheticId == null || props?.tempeventData?.err?.anaeastheticId == undefined) ? "form-select" : "form-select is-invalid"} id="OperationAnaeasthetic" aria-label="Floating label select Source" name="anaeastheticId" value={props.tempeventData.anaeastheticId ? props.tempeventData.anaeastheticId : ''} onChange={(e) => { props.tempeventDatafn('anaeastheticId', parseInt(e.target.value), 'form3') }} >
                                <option hidden></option>
                                {
                                    Object.keys(events.eventanaeasthetic).map((data, i) =>
                                        <option value={data}>{events.eventanaeasthetic[data]}</option>
                                    )
                                }
                            </select>
                            <label htmlFor="OperationAnaeasthetic">Anaeasthetic</label>
                        </div>
                    </div>
                    <div className=" col-md-6">
                        <div className="form-floating mb-2">
                            <select className={(props?.tempeventData?.err?.estimatedTimeInMin == '' || props?.tempeventData?.err?.estimatedTimeInMin == null || props?.tempeventData?.err?.estimatedTimeInMin == undefined) ? "form-select" : "form-select is-invalid"} id="EstimatedOperation" aria-label="Floating label select Source" name="estimatedTimeInMin" value={props.tempeventData.estimatedTimeInMin ? props.tempeventData.estimatedTimeInMin : ''} onChange={(e) => { props.tempeventDatafn('estimatedTimeInMin', parseInt(e.target.value), 'form3') }} >
                                <option hidden></option>
                                {
                                    Object.keys(events.eventoperationtime).map((data, i) =>
                                        <option value={data}>{events.eventoperationtime[data]}</option>
                                    )
                                }
                            </select>
                            <label htmlFor="EstimatedOperation">Estimated Operation time</label>
                        </div>
                    </div>
                    <div className=" col-md-6">
                        <div className="form-floating mb-2">
                            {/* <input type="text" className={(props?.tempeventData?.err?.lengthOfStay == '' || props?.tempeventData?.err?.lengthOfStay == null || props?.tempeventData?.err?.lengthOfStay == undefined) ? "form-control" : "form-control is-invalid"} id="CodeEvent" name="lengthOfStay" value={props.tempeventData.lengthOfStay ? props.tempeventData.lengthOfStay : ''} onChange={(e) => { props.tempeventDatafn('lengthOfStay', e.target.value, 'form3') }} /> */}
                            <select 
                                className={(props?.tempeventData?.err?.lengthOfStay == '' || props?.tempeventData?.err?.lengthOfStay == null || props?.tempeventData?.err?.lengthOfStay == undefined) ? "form-select" : "form-select is-invalid"} 
                                id="lengthOfStay" 
                                name="lengthOfStay" 
                                value={props.tempeventData.lengthOfStay ? props.tempeventData.lengthOfStay : ''} 
                                onChange={(e) => { 
                                    props.tempeventDatafn('lengthOfStay', parseInt(e.target.value), 'form3') 
                                }} 
                            >
                                <option hidden></option>
                                {
                                    Object.keys(layouts.lengthofstay).map((data, i) =>
                                        <option value={data}>{layouts.lengthofstay[data]}</option>
                                    )
                                }
                            </select>
                            <label htmlFor="CodeEvent">Length of stay</label>
                        </div>
                    </div>
                    <div className=" col-md-6">
                        <div className="mb-2">
                            <div className={(props?.tempeventData?.err?.isXrayRequired == '' || props?.tempeventData?.err?.isXrayRequired == null || props?.tempeventData?.err?.isXrayRequired == undefined) ? "patient-radio row m-0" : "patient-radio row m-0 is-invalid"}>
                                <div className="col-lg-4">
                                    <label className="form-check-label" id="CategoryEvent">
                                        X-ray required
                                    </label>
                                </div>
                                <div className="col-lg-8">
                                    <div className="d-flex flex-wrap">
                                        <div className="form-check me-lg-4 me-md-2 me-2">
                                            <input className="form-check-input" type="radio" name="isXrayRequired" value='true' id="Xray-yes" checked={props.tempeventData.isXrayRequired ? true : false} onChange={(e) => { props.tempeventDatafn('isXrayRequired', true, 'form3') }} />
                                            <label className="form-check-label" htmlFor="Xray-yes">
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-check me-lg-4 me-md-2 me-2">
                                            <input className="form-check-input" type="radio" name="isXrayRequired" value='false' id="Xray-no" checked={!props.tempeventData.isXrayRequired ? true : false} onChange={(e) => { props.tempeventDatafn('isXrayRequired', false, 'form3') }} />
                                            <label className="form-check-label" htmlFor="Xray-no">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-6">
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="CodeEvent" name="additionalTheaterInfo" value={props.tempeventData.additionalTheaterInfo ? props.tempeventData.additionalTheaterInfo : ''} onChange={(e) => { props.tempeventDatafn('additionalTheaterInfo', e.target.value, 'form3') }} />
                            <label htmlFor="CodeEvent">Additional theatre Information</label>
                        </div>
                    </div>
                    <div className=" col-md-6">
                        <div className="form-floating mb-2">
                            <select className={(props?.tempeventData?.err?.tcistatusId == '' || props?.tempeventData?.err?.tcistatusId == null || props?.tempeventData?.err?.tcistatusId == undefined) ? "form-select" : "form-select is-invalid"} id="OperationTCI" aria-label="Floating label select Source" name="tcistatusId" value={props.tempeventData.tcistatusId ? props.tempeventData.tcistatusId : ''} onChange={(e) => { props.tempeventDatafn('tcistatusId', parseInt(e.target.value), 'form3') }} >
                                <option hidden></option>
                                {
                                    Object.keys(events.eventtcistatus).map((data, i) =>
                                        <option value={data}>{events.eventtcistatus[data]}</option>
                                    )
                                }
                            </select>
                            <label htmlFor="OperationTCI">TCI Status</label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="file-uplaod mb-2">
                            <input type="file" name="fileName" id="OperationUploadLetter" className="form-control" onChange={(e) => { props.tempeventDatafn('fileName', e, 'form3', true) }} />
                            <label htmlFor="OperationUploadLetter">Upload Letter</label>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-start pt-2'>
                    <button className='btn btn-plan me-2' type={props.page == "homepage" ? "submit" : "button"}
                        // disabled={(Object.keys(props.tempeventData).length >= 10 || props.page == "homepage") ? false : true}
                        onClick={() => { if (props.page != "homepage") (props.eventDatafn('form3')) }}>  {props.newevent ? "Add" : "Update" } <FaArrowRight /></button>
                </div>
            </div>
        </>
    );
}

export default Operation;