import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './layoutDocuments.css';


function LayoutDemographics(props) {

    const [showGuardian, setShowGuardian] = useState(false)
    const [showDemographics, setShowDemographics] = useState({})


    useEffect(() => {
        if (props.data.patientDemographic?.categoryId == '2') {
            setShowGuardian(true)
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

    // const firstUpdate = useRef(true);

    // useEffect(() => {
    //     // debugger;
    //     if (firstUpdate.current) {
    //         return;
    //     }
    //     console.log('show Demographicss=====>>>>', showDemographics);

    // }, [showDemographics])


    useEffect(() => {
        if (props.data) {
            console.log("useEffect", props.data)
            setShowDemographics(props.data)
        }
    }, [props])

    const dispatch = useDispatch();
    const demographic = useSelector((state) => state.demographic)

    useEffect(() => {
        dispatch({ type: 'DEMOGRAPHICTITLE' })
        dispatch({ type: 'DEMOGRAPHICGENDER' })
        dispatch({ type: 'DEMOGRAPHICRELATIONSHIP' })
    }, [])

    return (
        <div className='row m-lg-0'>
            <div className='col-md-6'>
                <div className='mt-4'>
                    <h3>PATIENT DETAILS</h3>
                    <div className='border-frame'>
                        <div className='details_Input'>
                            <div className="row  mx-0 my-3">
                                <div className="col-md-3">
                                    <label className="form-check-label" id="patientCategory">
                                        Category
                                    </label>
                                </div>
                                <div className="col-md-9">
                                    <div className="d-flex">
                                        <div className="form-check me-5">
                                            <input className="form-check-input" type="radio" name="categoryId" onChange={categoryChange} value="1" id="demoChild" checked={props.data ? (props.data.patientDemographic?.categoryId == 1 ? true : false) : false} />
                                            <label className="form-check-label" htmlFor="demoChild">
                                                Adult
                                            </label>
                                        </div>
                                        <div className="form-check me-5">
                                            <input className="form-check-input" type="radio" name="categoryId" onChange={categoryChange} value="2" id="demoVunerableAdult" checked={props.data ? (props.data.patientDemographic?.categoryId == 2 ? true : false) : false} />
                                            <label className="form-check-label" htmlFor="demoVunerableAdult">
                                                Child/ Vulnerable Adult
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-2">
                                <select className="form-select" name="titleId" id="Title" >
                                    <option hidden></option>
                                    {
                                        Object.keys(demographic.demographictitle).map((data, i) =>
                                            <option selected={data == showDemographics?.patientDemographic?.titleId ? true : false} key={"title" + i} value={data}>{demographic.demographictitle[data]}</option>
                                        )
                                    }
                                </select>
                                <label htmlFor="Title">Title</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="PatientFName" name="firstName" defaultValue={props.data ? props.data.patientDemographic?.firstName : ""} />
                                <label htmlFor="PatientFName">First Name</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="PatientSurName" name="surname" defaultValue={props.data ? props.data.patientDemographic?.surname : ""} />
                                <label htmlFor="PatientSurName">Surname</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="date" max={"9999-12-31"} maxLength="4" pattern="[1-9][0-9]{3}" className="form-control" id="PatientDOB" name="dob" defaultValue={showDemographics ? showDemographics.patientDemographic?.dob.slice(0, 10) : ""} />
                                <label htmlFor="PatientDOB">DOB</label>
                            </div>
                            <div className="form-floating mb-2">
                                <select className="form-select" id="GuardianRelation" aria-label="Floating label select Relationship" name="genderId">
                                    <option hidden></option>
                                    {
                                        Object.keys(demographic.demographicgender).map((data, i) =>
                                            <option selected={data == showDemographics?.patientDemographic?.genderId ? true : false} key={"gender" + i} value={data}>{demographic.demographicgender[data]}</option>
                                        )
                                    }
                                </select>
                                <label htmlFor="GuardianRelation">Gender</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="email" className="form-control" id="PatientEmail" name="email" defaultValue={props.data ? props.data.patientDemographic?.email : ""} />
                                <label htmlFor="PatientEmail">Email</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="number" className="form-control" id="PreferredPhone" name="preferredPhone" defaultValue={props.data ? props.data.patientDemographic?.preferredPhone : ""} />
                                <label htmlFor="PreferredPhone">Preferred Phone</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="number" className="form-control" id="SecondaryPhone" name="secondaryPhone" defaultValue={props.data ? props.data.patientDemographic?.secondaryPhone : ""} />
                                <label htmlFor="SecondaryPhone">Secondary Phone</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="AddressLine1" name="address1" defaultValue={props.data ? props.data.patientDemographic?.address1 : ""} />
                                <label htmlFor="AddressLine1">Address Line 1</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="AddressLine2" name="address2" defaultValue={props.data ? props.data.patientDemographic?.address2 : ""} />
                                <label htmlFor="AddressLine2">Address Line 2</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="PatientCity" name="address3" defaultValue={props.data ? props.data.patientDemographic?.address3 : ""} />
                                <label htmlFor="PatientCity">City</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="PatientPostcode" name="postCode" defaultValue={props.data ? props.data.patientDemographic?.postCode : ""} />
                                <label htmlFor="PatientPostcode">Postcode</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="NHSNumber" name="nhsNumber" defaultValue={props.data ? props.data.patientDemographic?.nhsNumber : ""} />
                                <label htmlFor="NHSNumber">NHS Number</label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="mb-2 px-3">
                    <button className='btn btn-plan'>
                        Edit Demographics  
                    </button>
                </div> */}
            </div>
            <div className='col-md-6'>
                {
                    showGuardian ?
                        <div className='mt-4'>
                            <h3>GUARDIAN DETAILS</h3>
                            <div className='border-frame'>
                                <div className='details_Input'>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="GuardianFName" name="guardianFirstName" defaultValue={props.data ? props.data.patientDemographic?.guardianFirstName : ""} />
                                        <label htmlFor="GuardianFName">First Name</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="GuardianSName" name="guardianSurname" defaultValue={props.data ? props.data.patientDemographic?.guardianSurname : ""} />
                                        <label htmlFor="GuardianSName">Surname</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="date" max={"9999-12-31"} maxLength="4" pattern="[1-9][0-9]{3}" className="form-control" id="GuardianDOB" name="guardianDob" defaultValue={props.data ? props.data.patientDemographic?.guardianDob?.slice(0, 10) : ""} />
                                        <label htmlFor="GuardianDOB">DOB</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="email" className="form-control" id="GuardianEmail" name="guardianEmail" defaultValue={props.data ? props.data.patientDemographic?.guardianEmail : ""} />
                                        <label htmlFor="GuardianEmail">Email</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <select className="form-select" id="GuardianRelation" aria-label="Floating label select Relationship" name="guardianRelationshipId" >
                                            <option hidden></option>
                                            {
                                                Object.keys(demographic.demographicrelationship).map((data, i) =>
                                                    <option selected={data == showDemographics?.patientDemographic?.guardianRelationshipId ? true : false} key={"relation" + i} value={data}>{demographic.demographicrelationship[data]}</option>
                                                )
                                            }
                                        </select>
                                        <label htmlFor="GuardianRelation">Relationship</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="number" className="form-control" id="GuardianContact" name="guardianPreferredPhone" defaultValue={props.data ? props.data.patientDemographic?.guardianPreferredPhone : ""} />
                                        <label htmlFor="GuardianContact">Contact number</label>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <></>
                }
                <div className='mt-4'>
                    <h3>GP DETAILS</h3>
                    <div className='border-frame'>
                        <div className='details_Input'>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="GPPractice" name="gpPractice" defaultValue={props.data ? props.data.patientDemographic?.gpPractice : ""} />
                                <label htmlFor="GPPractice">Practice</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="GPName" name="gpName" defaultValue={props.data ? props.data.patientDemographic?.gpName : ""} />
                                <label htmlFor="GPName">Name</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="email" className="form-control" id="GPEmail" name="gpEmail" defaultValue={props.data ? props.data.patientDemographic?.gpEmail : ""} />
                                <label htmlFor="GPEmail">Email</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="GPAddress1" name="gpAddress1" defaultValue={props.data ? props.data.patientDemographic?.gpAddress1 : ""} />
                                <label htmlFor="GPAddress1">Address Line 1</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="GPAddress2" name="gpAddress2" defaultValue={props.data ? props.data.patientDemographic?.gpAddress2 : ""} />
                                <label htmlFor="GPAddress2">Address Line 2</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="GPCity" name="gpAddress3" defaultValue={props.data ? props.data.patientDemographic?.gpAddress3 : ""} />
                                <label htmlFor="GPCity">City</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="GP Postcode" name="gpPostCode" defaultValue={props.data ? props.data.patientDemographic?.gpPostCode : ""} />
                                <label htmlFor="GPPostcode">Postcode</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-around'>
                    <button className='btn btn-plan'> Save</button>
                    <button className='btn btn-plan'> Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default LayoutDemographics;