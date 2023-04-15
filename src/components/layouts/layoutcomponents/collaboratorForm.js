import React from "react";
import { FaArrowRight } from "react-icons/fa";


function CollaboratorForm(props) {
    return (
        <div className='box-section mb-4'>
            <div className="row">
                <div className={(props?.column == 'Landing') ? '' : "col-md-6"}>
                    <div className='form-floating my-3'>
                        <input
                            className={props?.collaborator?.err?.errname ? "is-invalid form-control" : "form-control"} type='text'
                            name="name"
                            value={
                                (props?.collaborator?.crntfield?.name == '' || props?.collaborator?.crntfield?.name == undefined) ?
                                    ""
                                    : props?.collaborator?.crntfield?.name
                            }
                            onChange={(e) => { props.collaboratorfn('field', 'name', e.target.value) }}
                        />
                        <label className='mb-2'>*Collaborator Name</label>
                        <span className="err text-danger">{props?.collaborator?.err?.errname ? 'Collaborator name is required' : ''}</span>
                    </div>
                </div>
                <div className={(props?.column == 'Landing') ? '' : "col-md-6"}>
                    <div className='form-floating my-3'>
                        <input
                            className={props?.collaborator?.err?.errpractice ? "is-invalid form-control" : "form-control"} type='text'
                            name="practice"
                            value={
                                (props?.collaborator?.crntfield?.practice == '' || props?.collaborator?.crntfield?.practice == undefined) ?
                                    ""
                                    : props?.collaborator?.crntfield?.practice
                            }
                            onChange={(e) => { props.collaboratorfn('field', 'practice', e.target.value) }}
                        />
                        <label className='mb-2'>*Practice Name</label>
                        <span className="err text-danger">{props?.collaborator?.err?.errpractice ? 'Practice name is required' : ''}</span>
                    </div>
                </div>

                <div className={(props?.column == 'Landing') ? '' : "col-md-6"}>
                    <div className='form-floating my-3'>
                        <input
                            type='email'
                            className={props?.collaborator?.err?.erremail ? "is-invalid form-control" : "form-control"} name="email"
                            id='CollaboratorID'
                            value={
                                (props?.collaborator?.crntfield?.email === '' || props?.collaborator?.crntfield?.email === undefined) ?
                                    ""
                                    : props?.collaborator?.crntfield?.email
                            }
                            onChange={(e) => { props.collaboratorfn('field', 'email', e.target.value) }}
                        />
                        <label htmlFor='CollaboratorID' className='mb-2'>*Email</label>
                        <span className="err text-danger">{props?.collaborator?.err?.erremail ? props?.collaborator?.err?.erremail : ''}</span>
                    </div>
                </div>

                {
                    (props?.column == 'Landing') ?
                        ''
                        : <div className="col-md-6">
                            <div className="d-flex align-items-center h-100">
                                <button className='btn btn-plan' type='button' onClick={props.addcollaboratorfn}>
                                    Add <span className='plusIcon ms-2'><FaArrowRight /></span>
                                </button>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}


export default CollaboratorForm;
