import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import CreatableSelect from 'react-select/creatable';

function InPatientVisit(props) {
    const events = useSelector((state) => state.events)
    const layouts = useSelector((state) => state.layouts)
    const global = useSelector((state) => state.global)
    console.log(props.tempeventData)
    const dispatch = useDispatch();
    useEffect(()=>{
        return()=>{
            dispatch({type:"ADDHOSPITAL_SUCCESS",payload:''})
        }
    },[])
    return (
        <>
            <div className="details_Input py-2 container-fluid">
                <h5><b>Inpatient visit</b></h5>
                <div className="row">
                    <div className=" col-md-6">
                        <div className="form-floating">
                            <input 
                                type="datetime-local" 
                                max={"9999-12-31"} 
                                maxLength="4" 
                                pattern="[1-9][0-9]{3}" 
                                className={(props?.tempeventData?.err?.scheduleDate == "" || props?.tempeventData?.err?.scheduleDate == null || props?.tempeventData?.err?.scheduleDate == undefined)  ? "form-control" : "form-control is-invalid"}  
                                id="inv-Date" 
                                name="procedureDate" 
                                value={
                                    props.tempeventData.procedureDate ? (
                                        props.tempeventData.procedureDate.split("T")[0].split('/').reverse().join("-") + "T" + 
                                        props.tempeventData.procedureDate.split("T")[1]
                                    ) : ''
                                } 
                                onChange={(e) => {
                                    props.tempeventDatafn('procedureDate', e.target.value, 'form4')
                                }} 
                            />
                            <label htmlFor="inv-Date">Date</label>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.scheduleDate}</small>
                    </div>
                    <div className=" col-md-6">
                        <div className="form-floating">

                            <label className="form-label pt-1 m-0 input-label-asw" htmlFor="locationOPEvent">Hospital</label>
                            <CreatableSelect
                                id="hospitalName"
                                createOptionPosition="first"
                                name="hospitalId"
                                options={props.locationddl}
                                styles={props?.tempeventData?.err?.hospitalId ? props.customSelecterrStyle : props.customSelectStyle}
                                value = {
                                    (props.locationddl.filter(option => 
                                        option.value == (props.tempeventData?.hospitalId?.locationId ? props.tempeventData?.hospitalId?.locationId : props.tempeventData?.hospitalId ) ))
                                }
                                onChange={(e) => {
                                    props.tempeventDatafn(
                                        'hospitalId', 
                                        {
                                            hospitalName: e.label,
                                            hospitalId: e.value,
                                            locationName: e.label,
                                            locationId: e.value
                                        },
                                        'form4'
                                    )
                                }}
                            />
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.hospitalId}</small>
                    </div>

                    <div className={props.tempeventData?.billingId?.id == 307 ? "col-md-3" : "col-md-6" }>
                        <div className="form-floating">
                            <select 
                                className={(props?.tempeventData?.err?.billingId == '' || props?.tempeventData?.err?.billingId == null || props?.tempeventData?.err?.billingId == undefined) ? "form-select" : "form-select is-invalid"} 
                                id="inv-Billing" 
                                name='billingId' 
                                aria-label="Floating label select Source" 
                                value={(typeof props.tempeventData?.billingId == "object") ? ( props.tempeventData?.billingId ? props.tempeventData?.billingId.id : '') : ( props.tempeventData?.billingId)} 
                                onChange={(e) => { 
                                    props.tempeventDatafn('billingId', { id: parseInt(e.target.value), label: events.eventbillingid[e.target.value] }, 'form4') 
                                }} 
                            >
                                <option hidden></option>
                                {
                                    Object.keys(events.eventbillingid).map((data, i) =>
                                        <option value={data}>{events.eventbillingid[data]}</option>
                                    )
                                }
                            </select>
                            <label htmlFor="inv-Billing">Billing</label>
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
                    {/* <div className=" col-md-6 d-none">
                        <div className="form-floating">
                            <input type="number" className="form-control" id="inv-procedurename" name="procedureId" value={props.tempeventData.procedureId ? props.tempeventData.procedureId : ''} onChange={(e) => { props.tempeventDatafn('procedureId', parseInt(e.target.value), 'form4') }} />
                            <label htmlFor="inv-procedurename">Procedure Name</label>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.procedureId}</small>
                    </div> */}
                    
                    <div className=" col-md-6">
                        <div className="form-floating outpatient_fee">
                            <input type="number" className={(props?.tempeventData?.err?.fee == '' || props?.tempeventData?.err?.fee == null || props?.tempeventData?.err?.fee == undefined) ? "form-control" : "form-control is-invalid"} step='0.01' id="inv-fee" name="fee" value={props.tempeventData.fee ? props.tempeventData.fee : ''} onChange={(e) => { props.tempeventDatafn('fee', parseFloat(e.target.value), 'form4') }} />
                            <label htmlFor="inv-fee">Fee</label>
                            <span className="">£</span>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.fee}</small>
                    </div>
                    <div className=" col-md-6">
                        <div className="form-floating">
                            <input type="text"  className={(props?.tempeventData?.err?.procedureCode == '' || props?.tempeventData?.err?.procedureCode == null || props?.tempeventData?.err?.procedureCode == undefined) ? "form-control" : "form-control is-invalid"} id="inv-code" name="procedureCode" value={(props.tempeventData.procedureCode || props.tempeventData.procedureCode == '') ? props.tempeventData.procedureCode : ''} onChange={(e) => { props.tempeventDatafn('procedureCode', Number(e.target.value), 'form4') }} />
                            <label htmlFor="inv-code">Procedure Code</label>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.procedureCode}</small>
                    </div>
                    <div className=" col-md-12">
                        <div className="file-uplaod mb-2 p-0">
                            <input type="file" name="fileName" id="OperationUploadLetter" className="form-control" onChange={(e) => { props.tempeventDatafn('fileName', e, 'form4', true) }} />
                            <label htmlFor="OperationUploadLetter">Upload Letter</label>
                        </div>
                    </div>
                    <div className='d-flex justify-content-start pt-2'>
                        <button className='btn btn-plan me-2' type="submit"
                            // disabled={Object.keys(props.tempeventData).length >= 5 ? false : true}
                            onClick={() => { if(props.page != "homepage") (props.eventDatafn('form4')) }} >  {props.newevent ? "Add" : "Update" } <FaArrowRight /></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InPatientVisit;