import React from 'react';
import './Header.css'
import { FaRegUserCircle, FaAngleRight } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Select from 'react-select';



function Header(){

    const [showInput , setShowInput] = useState(true);

    useEffect(()=>{
        document.addEventListener('click', (e)=>{
            if(e.target != document.getElementById('inputNav')){
                setShowInput(true)
            }
        })

    },[])
    
    const options = [
        { 
            value: 'Organisation1',
            label: 'Organisation1'
        },
        { 
            value: 'Organisation2',
            label: 'Organisation2'
        },
        { 
            value: 'Organisation3',
            label: 'Organisation3'
        },
    ];


    const customStyles = {
        control : (provided) =>({
            ...provided,
            background: '#000',
            backgroundBlendMode: 'soft-light, normal',
            border: '0px solid transparent',
            borderRadius: '0px',
            minWidth:'140px',
            maxWidth:'160px',
            color:'#fff',
            paddingLeft:'10px',
            paddingRight:'10px',
            "&:hover" : {outline:'none'},
            "&:focus" : {outline:'none'},
        }),
        placeholder: (provided) =>({
            ...provided,
            fontFamily: 'Montreal',
            color:' #fff',
        }),
        singleValue: (provided) =>({
            ...provided,
            fontFamily: 'Montreal',
            color:' #fff',
        }),
        input: (provided) =>({
            ...provided,
            fontFamily: 'Montreal',
            color:' #fff',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            display:'none',
        }),
    }


    return(
        <section className="header_sec">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    {/* <input type='text' onClick={() => {setShowInput(false)}} id='inputNav' className={showInput ? 'navbar-brand form-control disabled' : 'navbar-brand form-control'} defaultValue={'Organisation'} /> */}
                    <Select 
                        placeholder={'Organisation'}
                        styles={customStyles}
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                        options={options} 
                    />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSec" aria-controls="navbarSec" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-lg-around justify-content-end" id="navbarSec">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">
                                    Scheduler
                                    <FaAngleRight />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Tasks
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">MDT's</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Lists
                                    <FaAngleRight />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Referrals</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Messages</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Files
                                    <FaAngleRight />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Letters</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Billing </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Analysis</a>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Messages
                                    <FaAngleRight />
                                </a>
                            </li> */}
                        </ul>
                        <div className="user-details d-flex align-items-center ps-4">
                            <div className="d-lg-flex flex-column align-items-end d-none">
                                <span>Tom Smith</span>
                                <a href="#"><span>Logout</span></a>
                            </div>
                            <div className="user-icon">
                                <FaRegUserCircle />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default Header;