import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { demographicTitle, demographicGender } from "../../../actions/demographic";
import { connect, useDispatch, useSelector } from "react-redux";
import GpDetails from "../layoutcomponents/gpDetails";
import 'react-phone-input-2/lib/material.css';
import PhoneInput from "react-phone-input-2";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { GrHistory } from "react-icons/gr";
import { FaCheck, FaTimes } from "react-icons/fa";

const ModalDemographics = forwardRef((props, ref) => {

    const [showGuardian, setShowGuardian] = useState(false)
    const [address, setAddress] = useState({
        name: ""
    });
    const [showDemographics, setShowDemographics] = useState({})
    const [tempDemoData, setTempDemoData] = useState({});

    const global = useSelector((state) => state.global)

    useEffect(() => {
        if (props?.data?.patientDemographic?.categoryId == '2') {
            setShowGuardian(true)
        }
        else {
            setShowGuardian(false)
        }
    }, [props.data])

    const categoryChange = (e) => {
        if (e.target.value == 2) {
            setShowGuardian(true)
        }
        else {
            setShowGuardian(false)
        }
    }

    const Address = (e, name) => {
        let a = { ...address };
        a[name] = e;
        setAddress(a)
    }

    const demographicChange = (key, value) => {
        let a = { ...tempDemoData }
        a[key] = value;
        if (a[key] == "categoryId") {
            if (value == 2) {
                setShowGuardian(true)
            }
            else {
                setShowGuardian(false)
            }
        }
        setTempDemoData(a)
        //console.log(a);
        props.showbtn(true);
    }

    useImperativeHandle(ref, () => ({

        getAddress() {
            props.getData(address)
        },
        validate() {
            // console.log('got inside');
        },
        getdataouter() {
            props.getdataouter(tempDemoData);
        },
        restore() {
            setTempDemoData(props.data.patientDemographic)
            props.getclearError()
            // setShowDemographics(props.data.patientDemographic)
            if (props.data.patientDemographic.categoryId == 2) {
                setShowGuardian(true)
            }
            else {
                setShowGuardian(false)
            }
            props.showbtn(false);
        }

    }));

    useEffect(() => {
        // alert();
        if (props.data) {
            //console.log("useEffect", props.data)
            setShowDemographics(props.data.patientDemographic)
            setTempDemoData(props.data.patientDemographic)
        }
    }, [props.data])

    const dispatch = useDispatch();
    const demographic = useSelector((state) => state.demographic)

    useEffect(() => {
        dispatch({ type: 'DEMOGRAPHICTITLE' })
        dispatch({ type: 'DEMOGRAPHICGENDER' })
        dispatch({ type: 'DEMOGRAPHICRELATIONSHIP' })
    }, [])

    return (
        <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between layout demog-title">
                <h3>DEMOGRAPHICS</h3>
                {
                    (props.page=="homepage" && props.showButton) ? 
                    <div className="d-flex btns align-items-center justify-content-end pe-4">
                        <button className="btn-plan btn bg-transparent me-2" disabled={props.showButton ? false : true} onClick={() => { props.getdataouter(tempDemoData); }} >
                            Update
                        </button>
                        <button 
                            className="btn-plan btn bg-transparent" 
                            disabled={props.showButton ? false : true} 
                            onClick={() => {  
                                if (props.data.patientDemographic.categoryId == 2) {
                                    setShowGuardian(true)
                                }
                                else {
                                    setShowGuardian(false)
                                }
                                setTempDemoData(props.data.patientDemographic);
                                props.getclearError();
                                props.showbtn(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>:
                    <></>
                }
            </div>
            <div className="pop-layout p-lg-3 p-2">
                <div className='row m-lg-0'>
                    <div className='col-md-6'>
                        <div className='my-2'>
                            <h3>PATIENT DETAILS</h3>
                            <div className='border-frame'>
                                <div className='details_Input'>
                                    <div className={props.validationerr ? props.validationerr.categoryId ? 'is-invalid row patient-radio mx-0' : 'row patient-radio mx-0' : ''}>
                                        <div className="col-lg-3">
                                            <label className="form-check-label" id="patientCategory">
                                                *Category
                                            </label>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="d-flex flex-wrap">
                                                <div className="form-check me-lg-4 me-md-2 me-2">
                                                    <input className="form-check-input"checked={tempDemoData?.categoryId == 1 ? true : false} type="radio" name="categoryId" onChange={(e) => { categoryChange(e); demographicChange('categoryId', e.target.value) }} value='1' id="demoChild" disabled={!global.layoutedit && props.readonly} />
                                                    <label className="form-check-label" htmlFor="demoChild">
                                                        Adult
                                                    </label>
                                                </div>
                                                <div className="form-check me-lg-4 me-md-2 me-2">
                                                    <input className="form-check-input" type="radio" name="categoryId" checked={tempDemoData?.categoryId == 2 ? true : false} onChange={(e) => { categoryChange(e); demographicChange('categoryId', e.target.value) }} value='2' id="demoVunerableAdult" disabled={!global.layoutedit && props.readonly} />
                                                    <label className="form-check-label" htmlFor="demoVunerableAdult">
                                                        Child/ Vunerable Adult
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <small className="invalid mb-2 d-block">{props.validationerr ? props.validationerr.categoryId ? 'Category is required' : '' : ''}</small>
                                    <div className="form-floating mb-2">
                                        <select className={props.validationerr ? props.validationerr.titleId ? 'is-invalid form-select' : 'form-select' : ''} name="titleId" id="Title" aria-label="Floating label select Title" value={tempDemoData?.titleId} defaultValue={tempDemoData?.titleId} onChange={(e) => { demographicChange('titleId', e.target.value) }} disabled={!global.layoutedit && props.readonly}>
                                            <option hidden></option>
                                            {
                                                Object.keys(demographic.demographictitle).map((data, i) =>
                                                    <option selected={data == showDemographics?.titleId ? true : false} value={data}>{demographic.demographictitle[data]}</option>
                                                )
                                            }
                                        </select>
                                        <label htmlFor="Title">*Title</label>
                                        <small className="text-danger">{props.validationerr ? props.validationerr.titleId ? 'Title is required' : '' : ''}</small>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" name="firstName" className={props.validationerr ? props.validationerr.firstName ? "is-invalid form-control" : 'form-control' : ''} id="PatientFName" value={tempDemoData?.firstName} defaultValue={tempDemoData?.firstName} onChange={(e) => { Address(e.target.value, 'name'); demographicChange('firstName', e.target.value) }} disabled={!global.layoutedit && props.readonly} />
                                        <label htmlFor="PatientFName">*First Name</label>
                                        <small className="text-danger">{props.validationerr ? props.validationerr.firstName ? 'First Name is required' : '' : ''}</small>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" name="surname" className={props.validationerr ? props.validationerr.surname ? "is-invalid form-control" : 'form-control' : ''} id="PatientSurName" value={tempDemoData?.surname} defaultValue={tempDemoData?.surname} onChange={(e) => { Address(e.target.value, 'surname'); demographicChange('surname', e.target.value) }} disabled={!global.layoutedit && props.readonly} />
                                        <label htmlFor="PatientSurName">*Surname</label>
                                        <small className="text-danger">{props.validationerr ? props.validationerr.surname ? 'Surname is required' : '' : ''}</small>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="date" max={"9999-12-31"} maxLength="4" pattern="[1-9][0-9]{3}" name="dob" className={props.validationerr ? props.validationerr.dob ? "is-invalid form-control" : 'form-control' : ''} id="PatientDOB" defaultValue={tempDemoData ? tempDemoData?.dob?.slice(0, 10).split('/').reverse().join('-') : ""} onChange={(e) => { demographicChange('dob', e.target.value) }} disabled={!global.layoutedit && props.readonly} />
                                        < label htmlFor="PatientDOB" >* DOB</label>
                                        <small className="text-danger">{props.validationerr ? props.validationerr.dob ? 'DOB is required' : '' : ''}</small>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <select className={props.validationerr ? props.validationerr.genderId ? "is-invalid form-select" : 'form-select' : ''} name="genderId" id="gender" aria-label="Floating label select Relationship" value={tempDemoData?.genderId} defaultValue={tempDemoData?.genderId} onChange={(e) => { demographicChange('genderId', e.target.value) }} disabled={!global.layoutedit && props.readonly}>
                                            <option hidden></option>
                                            {
                                                Object.keys(demographic.demographicgender).map((data, i) =>
                                                    <option selected={data == showDemographics?.genderId ? true : false} value={data}>{demographic.demographicgender[data]}</option>
                                                )
                                            }
                                        </select>
                                        <label htmlFor="gender">*Gender</label>
                                        <small className="text-danger">{props.validationerr ? props.validationerr.genderId ? 'Gender is required' : '' : ''}</small>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="email" className={props.validationerr ? props.validationerr.email ? "is-invalid form-control" : 'form-control' : ''} name="email" id="PatientEmail" value={tempDemoData?.email} defaultValue={tempDemoData?.email} onChange={(e) => { Address(e.target.value, 'email'); demographicChange('email', e.target.value) }} disabled={!global.layoutedit && props.readonly} />
                                        <label htmlFor="PatientEmail">{showGuardian ? 'Email' : '*Email'}</label>
                                        <small className="text-danger">{props.validationerr ? props.validationerr.email ? 'Patient Email is required' : '' : ''}</small>
                                    </div>
                                    {/* <div className="form-floating mb-2">
                                        <input type="text" className={props.validationerr ? props.validationerr.preferredPhone ? "is-invalid form-control" : 'form-control' : ''} name="preferredPhone" id="PreferredPhone" value={tempDemoData?.preferredPhone} defaultValue={tempDemoData?.preferredPhone} onChange={(e) => { Address(e.target.value, 'contact'); demographicChange('preferredPhone', e.target.value) }} disabled={!global.layoutedit && props.readonly} />
                                        <label htmlFor="PreferredPhone">{showGuardian ? 'Preferred Phone' : '*Preferred Phone'}</label>
                                        <small className="text-danger">{props.validationerr ? props.validationerr.preferredPhone ? 'Preferred Phone is required' : '' : ''}</small>
                                    </div> */}
                                    <div className="mb-2">
                                        <PhoneInput
                                            inputProps={{
                                                name: 'preferredPhone',
                                                required: true
                                            }}
                                            // alwaysDefaultMask={true}
                                            // onlyCountries={["gb"]}
                                            // disableDropdown	={true}
                                            countryCodeEditable={false}
                                            containerClass=""
                                            inputClass={props.validationerr ? props.validationerr.preferredPhone ? "is-invalid w-100" : 'w-100' : ''}
                                            country={'gb'}
                                            specialLabel="*Phone"
                                            value={tempDemoData?.preferredPhone}
                                            onChange={phone => {Address(phone, 'contact'); demographicChange('preferredPhone', phone); console.log(phone)}}
                                            disabled={!global.layoutedit && props.readonly}
                                        />
                                        <small className="invalid">{props.validationerr ? props.validationerr.preferredPhone ? 'Preferred Phone is required' : '' : ''}</small>
                                    </div>
                                    {/* <div className="form-floating mb-2">
                                        <input type="text" 
                                        className="form-control" 
                                        name="secondaryPhone" id="SecondaryPhone" 
                                        value={tempDemoData?.secondaryPhone} 
                                        defaultValue={tempDemoData?.secondaryPhone} 
                                        onChange={(e) => { demographicChange('secondaryPhone', e.target.value) }} disabled={!global.layoutedit && props.readonly} />
                                        <label htmlFor="SecondaryPhone">Secondary Phone</label>
                                    </div> */}
                                    <div className="mb-2">
                                        <PhoneInput
                                            inputProps={{
                                                name: 'secondaryPhone',
                                                required: true
                                            }}
                                            countryCodeEditable={false}
                                            containerClass=""
                                            inputClass={"form-control w-100"}
                                            country={'gb'}
                                            specialLabel="Secondary Phone"
                                            value={tempDemoData?.secondaryPhone}
                                            onChange={phone => {demographicChange('secondaryPhone', phone)}}
                                            disabled={!global.layoutedit && props.readonly}
                                        />
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className={props.validationerr ? props.validationerr.address1 ? "is-invalid form-control" : 'form-control' : ''} name="address1" id="AddressLine1" value={tempDemoData?.address1} defaultValue={tempDemoData?.address1} onChange={(e) => { Address(e.target.value, 'address1'); demographicChange('address1', e.target.value) }} disabled={!global.layoutedit && props.readonly} />
                                        <label htmlFor="AddressLine1">Address Line 1</label>
                                        <small className="text-danger">{props.validationerr ? props.validationerr.address1 ? 'Address Line 1 is required' : '' : ''}</small>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" name="address2" id="AddressLine2" value={tempDemoData?.address2} defaultValue={tempDemoData?.address2} onChange={(e) => { Address(e.target.value, 'address2'); demographicChange('address2', e.target.value) }} disabled={!global.layoutedit && props.readonly} />
                                        <label htmlFor="AddressLine2">Address Line 2</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" name="address3" id="PatientCity" value={tempDemoData?.address3} defaultValue={tempDemoData?.address3} onChange={(e) => { Address(e.target.value, 'city'); demographicChange('address3', e.target.value) }} disabled={!global.layoutedit && props.readonly} />
                                        <label htmlFor="PatientCity">City</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className={props.validationerr ? props.validationerr.postCode ? "is-invalid form-control" : 'form-control' : ''} name="postCode" id="PatientPostcode" value={tempDemoData?.postCode} defaultValue={tempDemoData?.postCode} onChange={(e) => { Address(e.target.value, 'postCode'); demographicChange('postCode', e.target.value) }} maxLength="8" disabled={!global.layoutedit && props.readonly} />
                                        <label htmlFor="PatientPostcode">Postcode</label>
                                        <small className="text-danger">{props.validationerr ? props.validationerr.postCode ? 'Postcode is required' : '' : ''}</small>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" name="nhsNumber" id="NHSNumber" 
                                            value={tempDemoData?.nhsNumber} onChange={(e) => { demographicChange('nhsNumber', e.target.value) }} disabled={!global.layoutedit && props.readonly} />
                                        <label htmlFor="NHSNumber">NHS Number</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>

                        {
                            showGuardian ?
                                <div className='my-2'>
                                    <h3>GUARDIAN DETAILS</h3>
                                    <div className='border-frame'>
                                        <div className='details_Input'>
                                            <div className="form-floating mb-2">
                                                <input type="text" name="guardianFirstName" className={props.validationerr ? props.validationerr.guardianFirstName ? "is-invalid form-control" : 'form-control' : ''} id="GuardianFName" value={tempDemoData?.guardianFirstName} defaultValue={tempDemoData?.guardianFirstName} onChange={(e) => { demographicChange('guardianFirstName', e.target.value) }} />
                                                <label htmlFor="GuardianFName">*First Name</label>
                                                <small className="text-danger">{props.validationerr ? props.validationerr.guardianFirstName ? 'FIrst Name is required' : '' : ''}</small>
                                            </div>
                                            <div className="form-floating mb-2">
                                                <input type="text" name="guardianSurname" className={props.validationerr ? props.validationerr.guardianSurname ? "is-invalid form-control" : 'form-control' : ''} id="GuardianSName" value={tempDemoData?.guardianSurname} defaultValue={tempDemoData?.guardianSurname} onChange={(e) => { demographicChange('guardianSurname', e.target.value) }} />
                                                <label htmlFor="GuardianSName">*Surname</label>
                                                <small className="text-danger">{props.validationerr ? props.validationerr.guardianSurname ? 'Surname is required' : '' : ''}</small>
                                            </div>
                                            <div className="form-floating mb-2">
                                                <input type="date" max={"9999-12-31"} maxLength="4" pattern="[1-9][0-9]{3}" name="guardianDob" className={props.validationerr ? props.validationerr.guardianDob ? "is-invalid form-control" : 'form-control' : ''} defaultValue={tempDemoData ? tempDemoData?.guardianDob?.slice(0, 10).split('/').reverse().join('-') : ""} id="GuardianDOB" onChange={(e) => { demographicChange('guardianDob', e.target.value) }} />
                                                <label htmlFor="GuardianDOB">*DOB</label>
                                                <small className="text-danger">{props.validationerr ? props.validationerr.guardianDob ? 'DOB is required' : '' : ''}</small>
                                            </div>
                                            <div className="form-floating mb-2">
                                                <input type="email" name="guardianEmail" className={props.validationerr ? props.validationerr.guardianEmail ? "is-invalid form-control" : 'form-control' : ''} id="GuardianEmail" value={tempDemoData?.guardianEmail} defaultValue={tempDemoData?.guardianEmail} onChange={(e) => { demographicChange('guardianEmail', e.target.value) }} />
                                                <label htmlFor="GuardianEmail">*Email</label>
                                                <small className="text-danger">{props.validationerr ? props.validationerr.guardianEmail ? 'Email is required' : '' : ''}</small>
                                            </div>
                                            <div className="form-floating mb-2">
                                                <select className={props.validationerr ? props.validationerr.guardianRelationshipId ? "is-invalid form-select" : 'form-select' : ''} name="guardianRelationshipId" id="GuardianRelation" value={tempDemoData?.guardianRelationshipId} defaultValue={tempDemoData?.guardianRelationshipId} aria-label="Floating label select Relationship" onChange={(e) => { demographicChange('guardianRelationshipId', e.target.value) }} >
                                                    <option hidden></option>
                                                    {
                                                        Object.keys(demographic.demographicrelationship).map((data, i) =>
                                                            <option selected={data == showDemographics?.guardianRelationshipId ? true : false} value={data}>{demographic.demographicrelationship[data]}</option>
                                                        )
                                                    }
                                                </select>
                                                <label htmlFor="GuardianRelation">*Relationship</label>
                                                <small className="text-danger">{props.validationerr ? props.validationerr.guardianRelationshipId ? 'Relationship is required' : '' : ''}</small>
                                            </div>
                                            {/* <div className="form-floating mb-2">
                                                // <input type="text" 
                                                //     className={props.validationerr ? props.validationerr.guardianPreferredPhone ? "is-invalid form-control" : 'form-control' : ''} 
                                                //     name="guardianPreferredPhone" 
                                                //     id="guardianPreferredPhone" 
                                                //     value={tempDemoData?.guardianPreferredPhone} 
                                                //     defaultValue={tempDemoData?.guardianPreferredPhone} 
                                                //     onChange={(e) => { demographicChange('guardianPreferredPhone', e.target.value) }} />
                                                // <label htmlFor="guardianPreferredPhone">*Contact number</label>
                                                <small className="text-danger">{props.validationerr ? props.validationerr.guardianPreferredPhone ? 'Contact Number is required' : '' : ''}</small>
                                            </div> */}
                                            <div className="mb-2">
                                                <PhoneInput
                                                    inputProps={{
                                                        name: 'guardianPreferredPhone',
                                                        required: true
                                                    }}
                                                    countryCodeEditable={false}
                                                    containerClass=""
                                                    inputClass={props.validationerr ? props.validationerr.guardianPreferredPhone ? "is-invalid w-100" : 'w-100' : ''}
                                                    country={'gb'}
                                                    specialLabel="*Contact number"
                                                    value={tempDemoData?.guardianPreferredPhone}
                                                    onChange={phone =>  { demographicChange('guardianPreferredPhone', phone) }}
                                                    disabled={!global.layoutedit && props.readonly}
                                                />
                                                <small className="invalid">{props.validationerr ? props.validationerr.preferredPhone ? 'Preferred Phone is required' : '' : ''}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <></>
                        }
                        <div className='my-2'>
                            <GpDetails validationerr={props.validationerr} demographicChange={demographicChange} tempDemoData={tempDemoData} readonly={props.readonly} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
})

export default ModalDemographics;