import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";


function BillingType(props) {

    const dispatch = useDispatch();
    const episode = useSelector((state) => state.episode)
    const global = useSelector((state) => state.global)

    console.log(props.data)


    useEffect(() => {
        // dispatch({ type: 'EPISODEPATIENTSTATUS' })
        dispatch({ type: 'EPISODEREFERALSOURCE' })
        dispatch({ type: 'EPISODEBILLINGTYPE' })
        dispatch({ type: 'EPISODEINSURANCECOMPANY' })
        dispatch({ type: 'EPISODEEMBASSYID' })
        dispatch({ type: 'EPISODESOLIITORFIRM' })
    }, [])

    return (
        <>
            <h3>BILLING DETAILS</h3>
            <div className="border-frame">
                <div className='details_Input'>
                    {
                        props.page == 'homepage' ?
                            <div className='d-flex justify-content-end mb-3'>
                                <button className='btn btn-plan' type='button' onClick={(e) => { props.setShowBilling(true) }} disabled={!global.layoutedit && props.readonly}>
                                    <span className='plusIcon me-2'><FaPlus /></span>Update Billing
                                </button>
                            </div>
                            : ''
                    }
                    <div className='details_Input p-0'>
                        <div className="form-floating mb-2">
                            <select
                                disabled={!global.layoutedit && props.readonly}
                                className={props.validationerr ? props.validationerr.billingTypeId ? 'is-invalid form-select' : 'form-select' : 'form-select'}
                                name="billingTypeId"
                                id="BillingType"
                                aria-label="Floating label select Source"
                                onChange={(e) => {
                                    props.billingTypeHandler(
                                        {
                                            value: e.target.value,
                                            id: e.target.value,
                                            label: episode.episodebillingtype[e.target.value]
                                        }
                                    )
                                }}
                                value={props?.data?.billingTypeId}
                            >
                                <option hidden></option>
                                {
                                    Object.keys(episode.episodebillingtype).map((data, i) =>
                                        <option value={data}>{episode.episodebillingtype[data]}</option>
                                    )
                                }
                            </select>
                            <label htmlFor="BillingType">*Billing type</label>
                            <small className="text-danger">{props.validationerr ? props.validationerr.billingTypeId ? 'Billing Type is required' : '' : ''}</small>
                        </div>
                        <fieldset id="billing_clear">
                            {
                                props.showType == "embassy" ?
                                    <Embassy {...props} />
                                    : props.showType == "self" ?
                                        <Insurance {...props} />
                                        : props.showType == "solicitor" ?
                                            <Solicitor {...props} />
                                            : <></>
                            }
                        </fieldset>
                        {
                            (props?.page != "homepage" && props?.page != "homepage_popup") ?
                                <div className="mb-3 form-check">
                                    <input name=""
                                        type="checkbox"
                                        className="form-check-input"
                                        id="BillingCheck"
                                        disabled={!global.layoutedit && props.readonly}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                props.getAddress()
                                            }
                                            else {
                                                props.clearAddress()
                                            }
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="BillingCheck">Billing address same as personal address?</label>
                                </div> :
                                <></>
                        }
                        <div className="form-floating mb-2">
                            <input name="billingName" type="text"
                                disabled={!global.layoutedit && props.readonly}
                                defaultValue={Object.keys(props.address).length != 0 ?
                                    (
                                        (((props.address.name != undefined || props.address.name != null) ? props.address.name : "") + ' ' +
                                            ((props.address.surname != undefined || props.address.surname != null) ? props.address.surname : ""))
                                    ) : props?.data?.billingName
                                }
                                className={props.validationerr ? props.validationerr.billingName ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="BillingName" />
                            <label htmlFor="BillingName">Name</label>
                            <small className="text-danger">{props.validationerr ? props.validationerr.billingName ? 'Billing Name is required' : '' : ''}</small>
                        </div>
                        <div className="form-floating mb-2">
                            <input name="billingAddress1" type="text"
                                disabled={!global.layoutedit && props.readonly}
                                defaultValue={props.address ?
                                    (
                                        (props.address.address1 != undefined || props.address.address1 != null) ? props.address.address1 : props?.data?.billingAddress1
                                    ) : ""
                                }
                                className={props.validationerr ? props.validationerr.billingAddress1 ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="BillingLine1" />
                            <label htmlFor="BillingLine1">Address Line 1</label>
                            <small className="text-danger">{props.validationerr ? props.validationerr.billingAddress1 ? 'Billing Address Line1 is required' : '' : ''}</small>
                        </div>
                        <div className="form-floating mb-2">
                            <input name="billingAddress2" type="text"
                                disabled={!global.layoutedit && props.readonly}
                                defaultValue={props.address ?
                                    (
                                        (props.address.address2 != undefined || props.address.address2 != null) ? props.address.address2 : props?.data?.billingAddress2
                                    ) : ""
                                }
                                className="form-control" id="BillingLine2" />
                            <label htmlFor="BillingLine2">Address Line 2</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input name="billingAddress3" disabled={!global.layoutedit && props.readonly} type="text" defaultValue={props.address ? ((props.address.city != undefined || props.address.city != null) ? props.address.city : props?.data?.billingAddress3) : ""} className="form-control" id="BillingCity" />
                            <label htmlFor="BillingCity">City</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input name="billingPostCode" disabled={!global.layoutedit && props.readonly} type="text" defaultValue={props.address ? ((props.address.postCode != undefined || props.address.postCode != null) ? props.address.postCode : props?.data?.billingPostCode) : ""} className={props.validationerr ? props.validationerr.billingPostCode ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="BillingPostcode" maxLength="8" />
                            <label htmlFor="BillingPostcode">Postcode</label>
                            <small className="text-danger">{props.validationerr ? props.validationerr.billingPostCode ? 'Billing Postcode is required' : '' : ''}</small>
                        </div>
                        {/* <div className="form-floating mb-2">
                            <input 
                                name="billingContact" 
                                disabled={!global.layoutedit && props.readonly} 
                                type="text" 
                                defaultValue={props.address ? ((props.address.contact != undefined || props.address.contact != null) ? props.address.contact : props?.data?.billingContact) : ""} 
                                className={props.validationerr ? props.validationerr.billingContact ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="BillingContact" />
                            <label htmlFor="BillingContact">Contact</label>
                            <small className="text-danger">{props.validationerr ? props.validationerr.billingContact ? 'Contact number is required' : '' : ''}</small>
                        </div> */}
                        <div className="mb-2">
                            <PhoneInput
                                inputProps={{
                                    name: 'billingContact',
                                    required: true
                                }}
                                countryCodeEditable={false}
                                containerClass=""
                                inputClass={props.validationerr ? props.validationerr.billingContact ? "is-invalid w-100" : 'w-100' : ''}
                                country={'gb'}
                                specialLabel="Contact"
                                value={props.address ? ((props.address.contact != undefined || props.address.contact != null) ? props.address.contact : props?.data?.billingContact) : ""}
                                disabled={!global.layoutedit && props.readonly}
                            />
                            <small className="invalid">{props.validationerr ? props.validationerr.billingContact ? 'Contact number is required' : '' : ''}</small>
                        </div>
                        <div className="form-floating mb-2">
                            <input name="BillingEmail" disabled={!global.layoutedit && props.readonly} type="email" defaultValue={props.address ? ((props.address.email != undefined || props.address.email != null) ? props.address.email : props?.data?.billingEmail) : ""} className={props.validationerr ? props.validationerr.BillingEmail ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="BillingEmail" />
                            <label htmlFor="BillingEmail">Email</label>
                            <small className="text-danger">{props.validationerr ? props.validationerr.BillingEmail ? 'Email is required' : '' : ''}</small>
                        </div>
                        {
                            (props?.page == "homepage" || props?.page == "homepage_popup") ?
                                <div className="form-floating">
                                    <input type="number" className="form-control" id="CollaboratorEmail" name="outstandingBalance" defaultValue={props.data ? props?.data?.outstandingBalance : ""} disabled={!global.layoutedit && props.readonly} />
                                    <label htmlFor="CollaboratorEmail">Outstanding Balance</label>
                                </div>
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

const Embassy = (props) => {
    const episode = useSelector((state) => state.episode)
    return (
        <>
            <div className="form-floating mb-2">
                <select className={props.validationerr ? props.validationerr.embassyId ? 'is-invalid form-select' : 'form-select' : 'form-select'} name="embassyId" id="Embassy" aria-label="Floating label select Source">
                    <option hidden></option>
                    {
                        Object.keys(episode.episodeembassyid).map((data, i) =>
                            <option selected={data == props.data?.embassyId ? true : false} value={data}>{episode.episodeembassyid[data]}</option>
                        )
                    }
                </select>
                <label htmlFor="Embassy">Embassy</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.embassyId ? 'Embassy is required' : '' : ''}</small>
            </div>
            <div className="form-floating mb-2">
                <input type="text" id="EmbassyContactName" className={props.validationerr ? props.validationerr.embassyContactName ? 'is-invalid form-control' : 'form-control' : 'form-control'} name="embassyContactName" defaultValue={props.data ? props?.data?.embassyContactName : " "} />
                <label htmlFor="EmbassyContactName">Embassy Contact Name</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.embassyContactName ? 'Embassy ContactName is required' : '' : ''}</small>
            </div>
            <div className="form-floating mb-2">
                <input type="email" id="EmbassyContactEmail" className="form-control" name="embassyContactEmail" defaultValue={props.data ? props?.data?.embassyContactEmail : ""} />
                <label htmlFor="EmbassyContactEmail">Embassy Contact Mail</label>
            </div>
            <div className="mb-2">
                <PhoneInput
                    inputProps={{
                        name: 'embassyPreferredPhone',
                        required: true
                    }}
                    countryCodeEditable={false}
                    containerClass=""
                    inputClass={props.validationerr ? props.validationerr.embassyPreferredPhone ? "is-invalid w-100" : 'w-100' : ''}
                    country={'gb'}
                    specialLabel="Embassy Preferred Phone"
                    value={props.data ? props?.data?.embassyPreferredPhone : ""}
                    disabled={!global.layoutedit && props.readonly}
                />
            </div>
            <div className="mb-2">
                <PhoneInput
                    inputProps={{
                        name: 'embassySecondaryPhone',
                        required: true
                    }}
                    countryCodeEditable={false}
                    containerClass=""
                    inputClass={props.validationerr ? props.validationerr.embassySecondaryPhone ? "is-invalid w-100" : 'w-100' : ''}
                    country={'gb'}
                    specialLabel="Embassy Secondary Phone"
                    value={props.data ? props?.data?.embassySecondaryPhone : ""}
                    disabled={!global.layoutedit && props.readonly}
                />
            </div>
        </>
    )
}

const Insurance = (props) => {
    const episode = useSelector((state) => state.episode)
    const dispatch = useDispatch();
    return (
        <>
            <div className="form-floating mb-2">
                <select
                    className={props.validationerr ? props.validationerr.billingInsuranceCompanyId ? 'is-invalid form-select' : 'form-select' : 'form-select'}
                    name="billingInsuranceCompanyId"
                    id="InsuranceCompany"
                    aria-label="Floating label select Source"
                    onChange={(e) => {
                        dispatch({
                            type: "INSURERNAME",
                            payload: {
                                insurerId: episode.episodeinsurancecompany[e.target.value]["id"],
                                insurerName: episode.episodeinsurancecompany[e.target.value]["name"],
                                insurerLink: episode.episodeinsurancecompany[e.target.value]["link"]
                            }
                        })
                    }}
                    defaultValue={props?.data?.billingInsuranceCompanyId}
                >
                    <option hidden></option>
                    {
                        episode.episodeinsurancecompany.map((data, i) =>
                            <option value={i + 1}>{data.name}</option>
                        )
                    }
                </select>
                <label htmlFor="InsuranceCompany">*Insurance Company</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.billingInsuranceCompanyId ? 'Insurance company name is required' : '' : ''}</small>
            </div>
            <div className="form-floating mb-2">
                <input
                    name="billingInsurancePolicyNumber"
                    type="text"
                    className={props.validationerr ? props.validationerr.billingInsurancePolicyNumber ? 'is-invalid form-control' : 'form-control' : 'form-control'}
                    id="policynumber"
                    defaultValue={props.data ? props?.data?.billingInsurancePolicyNumber : ""}
                />
                <label htmlFor="policynumber">Policy Number</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.billingInsurancePolicyNumber ? 'Policy Number is required' : '' : ''}</small>
            </div>
        </>
    )
}

const Solicitor = (props) => {
    const episode = useSelector((state) => state.episode)
    return (
        <>
            <div className="form-floating mb-2">
                <select className={props.validationerr ? props.validationerr.solicitorFirmName ? 'is-invalid form-select' : 'form-select' : 'form-select'} name="solicitorFirmName" id="solicitor_FirmName" aria-label="Floating label select Source">
                    <option hidden></option>
                    {
                        Object.keys(episode.episodesolicitorfirm).map((data, i) =>
                            <option selected={data == props.data?.firmId ? true : false} value={data}>{episode.episodesolicitorfirm[data]}</option>
                        )
                    }
                </select>
                <label htmlFor="solicitor_FirmName">Solicitor Firm Name</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.solicitorFirmName ? 'Solicitor Firm Name is required' : '' : ''}</small>
            </div>
            <div className="form-floating mb-2">
                <input name="solicitorName" type="text" className={props.validationerr ? props.validationerr.solicitorName ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="Firm_Name" defaultValue={props.data ? props?.data?.solicitorName : " "} />
                <label htmlFor="Firm_Name">Firm Name</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.solicitorName ? 'Firm Name is required' : '' : ''}</small>
            </div>
            <div className="mb-2">
                <PhoneInput
                    inputProps={{
                        name: 'solicitorPreferredPhone',
                        required: true
                    }}
                    countryCodeEditable={false}
                    containerClass=""
                    inputClass={props.validationerr ? props.validationerr.solicitorPreferredPhone ? "is-invalid w-100" : 'w-100' : ''}
                    country={'gb'}
                    specialLabel="Solicitor Preferred Phone"
                    value={props.data ? props?.data?.solicitorPreferredPhone : ""}
                    disabled={!global.layoutedit && props.readonly}
                />
                <small className="invalid">{props.validationerr ? props.validationerr.solicitorPreferredPhone ? 'Preferred Phone is required' : '' : ''}</small>
            </div>
            <div className="form-floating mb-2">
                <input name="solicitorContactEmail" type="email" className={props.validationerr ? props.validationerr.solicitorContactEmail ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="solicitorContactEmail" defaultValue={props.data ? props?.data?.solicitorContactEmail : ""} />
                <label htmlFor="solicitorContactEmail">Solicitor Contact Email</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.solicitorContactEmail ? 'Contact Email is required' : '' : ''}</small>
            </div>
            <div className="form-floating mb-2">
                <input name="solicitorAddress1" type="text" className={props.validationerr ? props.validationerr.solicitorAddress1 ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="solicitorAddress1" defaultValue={props.data ? props?.data?.solicitorAddress1 : ""} />
                <label htmlFor="solicitorAddress1">Solicitor Address 1</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.solicitorAddress1 ? 'solicitor Address 1 is required' : '' : ''}</small>
            </div>
            <div className="form-floating mb-2">
                <input name="solicitorAddress2" type="text" className={props.validationerr ? props.validationerr.solicitorAddress2 ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="solicitorAddress2" defaultValue={props.data ? props?.data?.solicitorAddress2 : ""} />
                <label htmlFor="solicitorAddress2">Solicitor Address 2</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.solicitorAddress2 ? 'solicitor Address 2 is required' : '' : ''}</small>
            </div>
            <div className="form-floating mb-2">
                <input name="solicitorAddress3" type="text" className={props.validationerr ? props.validationerr.solicitorAddress3 ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="solicitorAddress3" defaultValue={props.data ? props?.data?.solicitorAddress3 : ""} />
                <label htmlFor="solicitorAddress3">Solicitor Address 3</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.solicitorAddress3 ? 'solicitor Address 3 is required' : '' : ''}</small>
            </div>
            <div className="form-floating mb-2">
                <input name="solicitorPostCode" type="text" className={props.validationerr ? props.validationerr.solicitorPostCode ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="solicitorPostCode" defaultValue={props.data ? props?.data?.solicitorPostCode : ""} />
                <label htmlFor="solicitorPostCode">Solicitor PostCode</label>
                <small className="text-danger">{props.validationerr ? props.validationerr.solicitorPostCode ? 'solicitor PostCode is required' : '' : ''}</small>
            </div>
        </>
    )
}

export default BillingType;
