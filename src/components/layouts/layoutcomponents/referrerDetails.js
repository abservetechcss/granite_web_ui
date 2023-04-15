import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function ReferrerDetails(props) {

    const dispatch = useDispatch();
    const episode = useSelector((state) => state.episode)
    const [referSource, setReferSource] = useState('');

    useEffect(() => {
        dispatch({ type: 'EPISODEREFERALSOURCE' })
        setReferSource(props.tempDemoData?.referralSourceId);
    }, [])


    return (
        <>
            <h3>REFERRAL INFORMATION</h3>
            <div className="border-frame">
                <div className='details_Input'>
                    <div className="form-floating my-2">
                        <select 
                            className={props.validationerr ? props.validationerr.referralSourceId ? 'is-invalid form-select' : 'form-select' : 'form-select'} 
                            name="referralSourceId" 
                            id="ReferalSource" 
                            aria-label="Floating label select Source"
                            onChange={(e)=>{setReferSource(e.target.value)}}
                        >
                            <option hidden></option>
                            {
                                Object.keys(episode.episodereferalsource).map((data, i) =>
                                    <option selected={props.tempDemoData?.referralSourceId == data ? true : false} value={data}>{episode.episodereferalsource[data]}</option>
                                )
                            }
                        </select>
                        <label htmlFor="ReferralSource">Source</label>
                        <small className="text-danger">{props.validationerr ? props.validationerr.referralSourceId ? 'Source is required' : '' : ''}</small>
                    </div>
                    {
                        referSource != 67 ?
                        <div className='details_Input p-0'>
                            <div className=''>
                                <div className='form-floating mb-2'>
                                    <input name="referrerName" defaultValue={props.tempDemoData?.referrerName} className={props.validationerr ? props.validationerr.referrerName ? 'is-invalid form-control' : 'form-control' : 'form-control'} type='text' />
                                    <label className='mb-2'>Referrer Name</label>
                                    <small className="text-danger">{props.validationerr ? props.validationerr.referrerName ? 'Referrer Name is required' : '' : ''}</small>
                                </div>
                                <div className='form-floating my-2'>
                                    <input name="referralPracticeName" defaultValue={props.tempDemoData?.referralPracticeName} className={props.validationerr ? props.validationerr.referralPracticeName ? 'is-invalid form-control' : 'form-control' : 'form-control'} type='text' />
                                    <label className='mb-2'>Practice Name</label>
                                    <small className="text-danger">{props.validationerr ? props.validationerr.referralPracticeName ? 'Practice Name is required' : '' : ''}</small>
                                </div>

                                <div className='form-floating mb-2'>
                                    <input name="referrerSourceEmail" defaultValue={props.tempDemoData?.referrerSourceEmail} type='email' className={props.validationerr ? props.validationerr.referrerSourceEmail ? 'is-invalid form-control' : 'form-control' : 'form-control'} id='ReferralEmail' />
                                    <label htmlFor='ReferralEmail' className='mb-2'>Email</label>
                                    <small className="text-danger">{props.validationerr ? props.validationerr.referrerSourceEmail ? 'Email is required' : '' : ''}</small>
                                </div>
                                <div className='form-floating mb-2'>
                                    <input name="referrerSourceAddress1" defaultValue={props.tempDemoData?.referrerSourceAddress1} type='text' className={props.validationerr ? props.validationerr.referrerSourceAddress1 ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="referralAddress1" />
                                    <label htmlFor='referralAddress1' className='form-label'>Address 1</label>
                                    <small className="text-danger">{props.validationerr ? props.validationerr.referrerSourceAddress1 ? 'Address line 1 is required' : '' : ''}</small>
                                </div>
                                <div className='form-floating mb-2'>
                                    <input name="referrerSourceAddress2" type='text' defaultValue={props.tempDemoData?.referrerSourceAddress2} className='form-control' id="referralAddress2" />
                                    <label htmlFor='referralAddress2' className='form-label'>Address 2</label>
                                </div>
                                <div className='form-floating mb-2'>
                                    <input name="referrerSourceAddress3" type='text' defaultValue={props.tempDemoData?.referrerSourceAddress3} className='form-control' id="referralCity" />
                                    <label htmlFor='referralCity' className='form-label'>City</label>
                                </div>
                                <div className='form-floating mb-2'>
                                    <input name="referrerSourcePostCode" type='text' defaultValue={props.tempDemoData?.referrerSourcePostCode} className={props.validationerr ? props.validationerr.referrerSourcePostCode ? 'is-invalid form-control' : 'form-control' : 'form-control'} id="referalPostcode" maxLength="8" />
                                    <label htmlFor='referalPostcode' className='form-label'>Postcode</label>
                                    <small className="text-danger">{props.validationerr ? props.validationerr.referrerSourcePostCode ? 'Postcode is required' : '' : ''}</small>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </>

    );
}

export default ReferrerDetails;

