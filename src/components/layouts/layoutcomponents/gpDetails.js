import React from "react";
import { useSelector } from "react-redux";



function GpDetails(props) {
    const global = useSelector((state) => state.global)
    return (
        <>
            <h3>GP DETAILS</h3>
            <div className='border-frame'>
                <div className={props.page == "homepage_popup" ? 'details_Input row' : "details_Input"}>
                    <div className={props.page == "homepage_popup" ? "form-floating mb-2 col-md-6 px-1" : "form-floating mb-2"}>
                        <input type="text" className={props.validationerr ? props.validationerr.gpPractice ? "is-invalid form-control" : 'form-control' : 'form-control'} defaultValue={props.tempDemoData?.gpPractice} name="gpPractice" id="GPAddress1" onChange={(e) => { props.demographicChange('gpPractice', e.target.value) }} disabled={!global.layoutedit && props.readonly}/>
                        <label htmlFor="GPPractice">Practice</label>
                        <small className="text-danger">{props.validationerr ? props.validationerr.gpPractice ? 'Practice name is required' : '' : ''}</small>
                    </div>
                    <div className={props.page == "homepage_popup" ? "form-floating mb-2 col-md-6 px-1" : "form-floating mb-2"}>
                        <input type="text" className={props.validationerr ? props.validationerr.gpName ? "is-invalid form-control" : 'form-control' : 'form-control'} defaultValue={props.tempDemoData?.gpName} name="gpName" id="GPName" onChange={(e) => { props.demographicChange('gpName', e.target.value) }} disabled={!global.layoutedit && props.readonly}/>
                        <label htmlFor="GPName">Name</label>
                        <small className="text-danger">{props.validationerr ? props.validationerr.gpName ? 'Name is required' : '' : ''}</small>
                    </div>
                    <div className={props.page == "homepage_popup" ? "form-floating mb-2 col-md-6 px-1" : "form-floating mb-2"}>
                        <input type="email" className={props.validationerr ? props.validationerr.gpEmail ? "is-invalid form-control" : 'form-control' : 'form-control'} defaultValue={props.tempDemoData?.gpEmail} name="gpEmail" id="GPEmail" onChange={(e) => { props.demographicChange('gpEmail', e.target.value) }} disabled={!global.layoutedit && props.readonly}/>
                        <label htmlFor="GPEmail">Email</label>
                        <small className="text-danger">{props.validationerr ? props.validationerr.gpEmail ? 'Email is required' : '' : ''}</small>
                    </div>
                    <div className={props.page == "homepage_popup" ? "form-floating mb-2 col-md-6 px-1" : "form-floating mb-2"}>
                        <input type="text" className={props.validationerr ? props.validationerr.gpAddress1 ? "is-invalid form-control" : 'form-control' : 'form-control'} defaultValue={props.tempDemoData?.gpAddress1} name="gpAddress1" id="GPAddress1" onChange={(e) => { props.demographicChange('gpAddress1', e.target.value) }} disabled={!global.layoutedit && props.readonly}/>
                        <label htmlFor="GPAddress1">Address Line 1</label>
                        <small className="text-danger">{props.validationerr ? props.validationerr.gpAddress1 ? 'Address line 1 is required' : '' : ''}</small>
                    </div>
                    <div className={props.page == "homepage_popup" ? "form-floating mb-2 col-md-6 px-1" : "form-floating mb-2"}>
                        <input type="text" className="form-control" name="gpAddress2" defaultValue={props.tempDemoData?.gpAddress2} id="GPAddress2" onChange={(e) => { props.demographicChange('gpAddress2', e.target.value) }} disabled={!global.layoutedit && props.readonly}/>
                        <label htmlFor="GPAddress2">Address Line 2</label>
                    </div>
                    <div className={props.page == "homepage_popup" ? "form-floating mb-2 col-md-6 px-1" : "form-floating mb-2"}>
                        <input type="text" className="form-control" name="gpAddress3" id="GPCity" defaultValue={props.tempDemoData?.gpAddress3} onChange={(e) => { props.demographicChange('gpAddress3', e.target.value) }} disabled={!global.layoutedit && props.readonly}/>
                        <label htmlFor="GPCity">City</label>
                    </div>
                    <div className={props.page == "homepage_popup" ? "form-floating mb-2 col-md-6 px-1" : "form-floating mb-2"}>
                        <input type="text" className={props.validationerr ? props.validationerr.gpPostCode ? "is-invalid form-control" : 'form-control' : 'form-control'} defaultValue={props.tempDemoData?.gpPostCode} name="gpPostCode" id="GPPostcode" maxLength="8" onChange={(e) => { props.demographicChange('gpPostCode', e.target.value) }} disabled={!global.layoutedit && props.readonly}/>
                        <label htmlFor="GPPostcode">Postcode</label>
                        <small className="text-danger">{props.validationerr ? props.validationerr.gpPostCode ? 'Postcode is required' : '' : ''}</small>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GpDetails;