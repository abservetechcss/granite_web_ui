import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import CreatableSelect from 'react-select/creatable';

function OutPatientAppointment(props) {
    const events = useSelector((state) => state.events)
    const layouts = useSelector((state) => state.layouts)
    const global = useSelector((state) => state.global)
    console.log(props)
    const dispatch = useDispatch();
    useEffect(()=>{
        return()=>{
            dispatch({type:"ADDHOSPITAL_SUCCESS",payload:''})
        }
    },[])
    return (
        <>
            <div className="details_Input py-2 container-fluid">
                <h5><b>Clinic Appointment</b></h5>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input
                                type="datetime-local"
                                max={"9999-12-31"}
                                maxLength="4"
                                pattern="[1-9][0-9]{3}"
                                className={(props?.tempeventData?.err?.scheduleDate == "" || props?.tempeventData?.err?.scheduleDate == null || props?.tempeventData?.err?.scheduleDate == undefined) ? "form-control" : "form-control is-invalid"}
                                id="scheduleDate"
                                name="scheduleDate"
                                value={props.tempeventData?.scheduleDate ? (
                                    props.tempeventData?.scheduleDate.split("T")[0].split('/').reverse().join("-") + "T" + props.tempeventData?.scheduleDate.split("T")[1]
                                ) : ''} onChange={(e) => { props.tempeventDatafn('scheduleDate', e.target.value, 'form1') }} />
                            <label htmlFor="scheduleDate">Date</label>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.scheduleDate}</small>
                    </div>
                    <div className="col-md-3">
                        <div className="form-floating">
                            <label className="form-label pt-1 m-0 input-label-asw" htmlFor="locationOPEvent">Location</label>
                            <CreatableSelect
                                id="locationEvent"
                                createOptionPosition="first"
                                name="locationId"
                                options={props.locationddl}
                                styles={props?.tempeventData?.err?.locationId ? props.customSelecterrStyle : props.customSelectStyle}
                                value = {
                                    (props.locationddl.filter(option => 
                                        option.value == ((props.tempeventData?.locationId?.locationId) ? props.tempeventData?.locationId?.locationId : props.tempeventData?.locationId) ))
                                }
                                onChange={(e) => {
                                    props.tempeventDatafn(
                                        'locationId',
                                        {
                                            locationName: e.label,
                                            locationId: e.value
                                        },
                                        'form1'
                                    )
                                }}
                            />
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.locationId}</small>
                    </div>
                    <div className="col-md-3">
                        <div className="form-floating">
                            <select
                                className={(props?.tempeventData?.err?.durationInMinutes == '' || props?.tempeventData?.err?.durationInMinutes == null || props?.tempeventData?.err?.durationInMinutes == undefined) ? "form-select" : "form-select is-invalid"}
                                name="durationInMinutes"
                                id="Schedule-duration"
                                disabled={props.tempeventData?.OutpatientApptCategoryId ? false : true}
                                value={props.tempeventData?.durationInMinutes ? props.tempeventData?.durationInMinutes : ''}
                                onChange={(e) => {
                                    props.tempeventDatafn('durationInMinutes', parseInt(e.target.value), 'form1')
                                }}
                            >
                                <option hidden></option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                                <option value="60">60</option>
                            </select>
                            {/* <input type="number" name="durationInMinutes" id="Schedule-duration" className="form-control" value={props.tempeventData?.durationInMinutes ? props.tempeventData?.durationInMinutes : ''} onChange={(e) => { props.tempeventDatafn('durationInMinutes', parseInt(e.target.value), 'form1') }} /> */}
                            <label htmlFor="Schedule-duration">Duration (Mins)</label>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.durationInMinutes}</small>
                    </div>
                    <div className="col-md-6">
                        <div className={(props?.tempeventData?.err?.OutpatientApptCategoryId == "" || props?.tempeventData?.err?.OutpatientApptCategoryId == null || props?.tempeventData?.err?.OutpatientApptCategoryId == undefined) ? "d-flex patient-radio px-3 align-items-center" : "d-flex patient-radio px-3 align-items-center is-invalid"} >
                            <div className="col-lg-3">
                                <label htmlFor="categoryId">Category</label>
                            </div>
                            <div className="form-floating col-lg-9">
                                <div className="d-flex flex-wrap">

                                    {
                                        Object.keys(events.eventcategoryid).map((data, i) =>
                                            <div
                                                className="d-flex form-check me-lg-4 me-md-2 me-2"
                                                key={"categoryId" + i}
                                            >
                                                <input
                                                    type="radio"
                                                    className="form-check-input me-2"
                                                    value={data}
                                                    name="OutpatientApptCategoryId"
                                                    id={"categoryId" + i}
                                                    onChange={(e) => {
                                                        props.tempeventDatafn('OutpatientApptCategoryId', { id: parseInt(e.target.value), name: events.eventcategoryid[e.target.value] }, 'form1')
                                                    }}
                                                    // defaultChecked={props?.tempeventData?.categoryName == events.eventcategoryid[data] ? true : false}
                                                    // checked={props?.tempeventData?.OutpatientApptCategoryId == data ? true : false}
                                                    checked={(typeof props.tempeventData?.OutpatientApptCategoryId == "object") ? ( props.tempeventData?.OutpatientApptCategoryId.id == data ? true : false) : ( props.tempeventData?.OutpatientApptCategoryId == data ? true : false) }
                                                />
                                                <label htmlFor={"categoryId" + i} className="form-check-label">{events.eventcategoryid[data]}</label>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.OutpatientApptCategoryId}</small>

                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <select
                                className={(props?.tempeventData?.err?.typeId == '' || props?.tempeventData?.err?.typeId == null || props?.tempeventData?.err?.typeId == undefined) ? "form-select" : "form-select is-invalid"}
                                id="typeId"
                                name='typeId'
                                aria-label="Floating label select Source"
                                value={props.tempeventData?.typeId ? props.tempeventData?.typeId : ''}
                                onChange={(e) => { props.tempeventDatafn('typeId', parseInt(e.target.value), 'form1') }}
                            >
                                <option hidden></option>
                                {
                                    Object.keys(events.eventtypeid).map((data, i) =>
                                        <Fragment key={"type" + i}>
                                            <option value={data}>{events.eventtypeid[data]}</option>
                                        </Fragment>
                                    )
                                }
                            </select>
                            <label htmlFor="typeId">Type</label>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.typeId}</small>
                    </div>
                    <div className={props.tempeventData?.billingId?.id == 307 ? "col-md-3" : "col-md-6"}>
                        <div className="form-floating">
                            <select
                                className={(props?.tempeventData?.err?.billingId == '' || props?.tempeventData?.err?.billingId == null || props?.tempeventData?.err?.billingId == undefined) ? "form-select" : "form-select is-invalid"}
                                id="typeId"
                                name='billingId'
                                aria-label="Floating label select Source"
                                value={(typeof props.tempeventData?.billingId == "object") ? ( props.tempeventData?.billingId ? props.tempeventData?.billingId.id : '') : ( props.tempeventData?.billingId) }
                                onChange={(e) => {
                                    props.tempeventDatafn('billingId', { id: parseInt(e.target.value), label: events.eventbillingid[e.target.value] }, 'form1')
                                }}
                            >
                                <option hidden></option>
                                {
                                    Object.keys(events.eventbillingid).map((data, i) => (
                                        <Fragment key={"outpatientApptOption" + i}>
                                            <option value={data}>{events.eventbillingid[data]}</option>
                                        </Fragment>)
                                    )
                                }
                            </select>
                            <label htmlFor="typeId">Billing</label>
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
                        </div> :
                        <></>
                    }
                    <div className="col-md-6">
                        <div className="form-floating outpatient_fee">
                            <input
                                type="number"
                                name="fee"
                                step='0.01'
                                id="ScheduleFee"
                                disabled={(props.tempeventData.billingId && props.tempeventData.OutpatientApptCategoryId) ? false: true }
                                className={(props?.tempeventData?.err?.fee == '' || props?.tempeventData?.err?.fee == null || props?.tempeventData?.err?.fee == undefined) ? "form-control" : "form-control is-invalid"}
                                value={props.tempeventData?.fee ? props.tempeventData?.fee : ''}
                                onChange={(e) => { props.tempeventDatafn('fee', parseFloat(e.target.value), 'form1') }}
                            />
                            <label htmlFor="ScheduleFee">Fee</label>
                            <span className="">£</span>
                        </div>
                        <small className="invalid mb-2 d-block">{props?.tempeventData?.err?.fee}</small>
                    </div>

                    <div className="col-md-12">
                        <div className="file-uplaod mb-2 p-0">
                            <input type="file" name="fileName" id="Upload Letter" className="form-control" onChange={(e) => { props.tempeventDatafn('fileName', e, 'form1', true) }} />
                            <label htmlFor="Upload Letter">Upload Letter</label>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-start pt-2'>
                    <button className='btn btn-plan me-2' type={props.page == "homepage" ? "submit" : "button"}
                        // disabled={Object.keys(props.tempeventData).length >= 7 ? false : true}
                        onClick={() => { if (props.page != "homepage") (props.eventDatafn('form1')) }}>  {props.newevent ? "Add" : "Update" } <FaArrowRight /></button>
                </div>
            </div>
        </>
    );
}

export default OutPatientAppointment;