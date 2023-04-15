import React from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import CollaboratorForm from "./collaboratorForm";


function Collaborator(props) {
    return (
        <>
            <h3>COLLABORATOR/S</h3>
            <div className='border-frame'>
                <div className='details_Input'>
                    <div className='d-flex justify-content-start'>
                        <button className='btn btn-plan' onClick={() => { props.collaboratorfn('show', 'field', 'button') }} type='button'>
                            <span className={props.collaborator.show ? 'plusIcon me-2 active' : 'plusIcon me-2'}><FaPlus /></span>
                            {props.collaborator.show ? 'Cancel' : 'Add Collaborator'}
                        </button>
                    </div>
                    {/* <small className="text-danger d-block">{props.validationerr ? props.validationerr.collaborator ? 'select atleast one collaborator' : '' : ''}</small> */}
                    {
                        props.collaborator.show ?
                            <CollaboratorForm column={""} data={{}} collaborator={props.collaborator} addcollaboratorfn={props.addcollaboratorfn} collaboratorfn={props.collaboratorfn} />
                            : <></>
                    }
                    {
                        props.collaborator.showtable ?
                            <div className='collaborator-table table-responsive my-4'>
                                <table className='table table-borderless event-table'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Practice</th>
                                            <th scope='col'>Name</th>
                                            <th scope='col'>Email</th>
                                            <th scope='col'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.collaborator.field.map((data, i) =>
                                                <tr key={'item ' + i}>
                                                    <td>{data.practice}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.email}</td>
                                                    <td>
                                                        {/* <a href="#" className="me-1">Edit</a> */}
                                                        <a href="#dd" onClick={() => props.innerhandleDelete(i)}>Delete</a>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div> :
                            <></>
                    }
                </div>
            </div>
        </>
    );
}

export default Collaborator;