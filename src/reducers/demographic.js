var initialState = {
    demographictitle: {},
    demographicgender: {},
    demographicrelationship: {},
}


const DemographicsReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'DEMOGRAPHICTITLE':
            return state;

        case 'DEMOGRAPHICTITLE_SUCCESS':
            return {
                ...state,
                demographictitle: action.payload
            };

        case 'DEMOGRAPHICTITLE_FAILED':
            return {
                ...state,
                demographictitle: action.payload
            }

        case 'DEMOGRAPHICGENDER':
            return state;

        case 'DEMOGRAPHICGENDER_SUCCESS':
            return {
                ...state,
                demographicgender: action.payload
            };

        case 'DEMOGRAPHICGENDER_FAILED':
            return {
                ...state,
                demographicgender: action.payload
            }

        case 'DEMOGRAPHICRELATIONSHIP':
            return state;

        case 'DEMOGRAPHICRELATIONSHIP_SUCCESS':
            return {
                ...state,
                demographicrelationship: action.payload
            };

        case 'DEMOGRAPHICRELATIONSHIP_FAILED':
            return {
                ...state,
                demographicrelationship: action.payload
            }


        default:
            return state;
    }
}
export default DemographicsReducer;

