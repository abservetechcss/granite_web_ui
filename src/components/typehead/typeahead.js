import React, { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';



const typeahead = forwardRef((props, ref) => {
    const prop = {};
    const searchpatientref = useRef();

    const handleChange = (e) => {
        props.onInputChange(e);
    }

    useImperativeHandle(ref, () => ({
        clearData() {
            searchpatientref.current.clear();
            searchpatientref.current.blur();
        }
    }));

    prop.renderMenuItemChildren = (option, { text }, index) => (
        <Fragment>
            <div className="d-flex">
                <div className="me-3">
                    <FaUserAlt />
                </div>
                <Highlighter search={text}>
                    {option.label}
                </Highlighter>
            </div>
        </Fragment>
    );

    return (
        <>
            <Fragment>
                <Typeahead
                    {...prop}
                    id="search_typehead"
                    onInputChange={(e) => { handleChange(e) }}
                    onChange={(e) => { props.onChange(e) }}
                    options={props.options}
                    minLength={props.minLength}
                    ref={searchpatientref}
                >

                    <div className='search_icon'>
                        <FaSearch />
                    </div>
                </Typeahead>
            </Fragment>
        </>
    )
})


export default typeahead;