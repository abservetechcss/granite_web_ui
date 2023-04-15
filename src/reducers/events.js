var initialState = {
    eventside: {},
    eventcategoryid: {},
    eventtypeid: {},
    eventbillingid: {},
    eventanaeasthetic: {},
    eventoperationtime: {},
    eventtcistatus: {},
    eventprocedurename: '',
    eventprocedurename1: '',
    eventprocedurecode: '',
    eventprocedurefee: '',
    eventhospitalname: {},
    eventdiagnosis: {},
    addprocedurename: '',
    addprocedurecode: '',
}


const EventsReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'EVENTSIDE':
            return state;

        case 'EVENTSIDE_SUCCESS':
            return {
                ...state,
                eventside: action.payload
            };

        case 'EVENTSIDE_FAILED':
            return {
                ...state,
                eventside: action.payload
            }

        case 'EVENTCATEGORYID':
            return state;

        case 'EVENTCATEGORYID_SUCCESS':
            return {
                ...state,
                eventcategoryid: action.payload
            };

        case 'EVENTCATEGORYID_FAILED':
            return {
                ...state,
                eventcategoryid: action.payload
            }

        case 'EVENTTYPEID':
            return state;

        case 'EVENTTYPEID_SUCCESS':
            return {
                ...state,
                eventtypeid: action.payload
            };

        case 'EVENTTYPEID_FAILED':
            return {
                ...state,
                eventtypeid: action.payload
            }

        case 'EVENTBILLINGID':
            return state;

        case 'EVENTBILLINGID_SUCCESS':
            return {
                ...state,
                eventbillingid: action.payload
            };

        case 'EVENTBILLINGID_FAILED':
            return {
                ...state,
                eventbillingid: action.payload
            }

        case 'EVENTANAEASTHETIC':
            return state;

        case 'EVENTANAEASTHETIC_SUCCESS':
            return {
                ...state,
                eventanaeasthetic: action.payload
            };

        case 'EVENTANAEASTHETIC_FAILED':
            return {
                ...state,
                eventanaeasthetic: action.payload
            }

        case 'EVENTOPERATIONTIME':
            return state;

        case 'EVENTOPERATIONTIME_SUCCESS':
            return {
                ...state,
                eventoperationtime: action.payload
            };

        case 'EVENTOPERATIONTIME_FAILED':
            return {
                ...state,
                eventoperationtime: action.payload
            }

        case 'EVENTTCISTATUS':
            return state;

        case 'EVENTTCISTATUS_SUCCESS':
            return {
                ...state,
                eventtcistatus: action.payload
            };

        case 'EVENTTCISTATUS_FAILED':
            return {
                ...state,
                eventtcistatus: action.payload
            }

        case 'EVENTPROCEDURENAME':
            return state;

        case 'EVENTPROCEDURENAME_SUCCESS':
            return {
                ...state,
                eventprocedurename: action.payload
            };

        case 'EVENTPROCEDURENAME_FAILED':
            return {
                ...state,
                eventprocedurename: action.payload
            }

        case 'EVENTPROCEDURENAME1':
            return state;

        case 'EVENTPROCEDURENAME1_SUCCESS':
            return {
                ...state,
                eventprocedurename1: action.payload
            };

        case 'EVENTPROCEDURENAME1_FAILED':
            return {
                ...state,
                eventprocedurename1: action.payload
            }

        case 'EVENTPROCEDURENAMELOAD':
            return state;

        case 'EVENTPROCEDURENAMELOAD_SUCCESS':
            return {
                ...state,
                eventprocedurename: action.payload
            };

        case 'EVENTPROCEDURENAMELOAD_FAILED':
            return {
                ...state,
                eventprocedurename: action.payload
            }

        case 'EVENTPROCEDURECODE':
            return state;

        case 'EVENTPROCEDURECODE_SUCCESS':
            return {
                ...state,
                eventprocedurecode: action.payload
            };

        case 'EVENTPROCEDURECODE_FAILED':
            return {
                ...state,
                eventprocedurecode: action.payload
            }

        case 'EVENTPROCEDURECODELOAD':
            return state;

        case 'EVENTPROCEDURECODELOAD_SUCCESS':
            return {
                ...state,
                eventprocedurecode: action.payload
            };

        case 'EVENTPROCEDURECODELOAD_FAILED':
            return {
                ...state,
                eventprocedurecode: action.payload
            }

        case 'EVENTPROCEDUREFEE':
            return state;

        case 'EVENTPROCEDUREFEE_SUCCESS':
            return {
                ...state,
                eventprocedurefee: action.payload
            };

        case 'EVENTPROCEDUREFEE_FAILED':
            return {
                ...state,
                eventprocedurefee: action.payload
            }

        case 'EVENTHOSPITALNAME':
            return state;

        case 'EVENTHOSPITALNAME_SUCCESS':
            return {
                ...state,
                eventhospitalname: action.payload
            };

        case 'EVENTHOSPITALNAME_FAILED':
            return {
                ...state,
                eventhospitalname: action.payload
            }

        case 'ADDDIAGNOSIS':
            return state;

        case 'ADDDIAGNOSIS_SUCCESS':
            return {
                ...state,
                eventdiagnosis: action.payload
            };

        case 'ADDDIAGNOSIS_FAILED':
            return {
                ...state,
                eventdiagnosis: action.payload
            }

        case 'ADDPROCEDURENAME':
            return state;

        case 'ADDPROCEDURENAME_SUCCESS':
            return {
                ...state,
                addprocedurename: action.payload
            };

        case 'ADDPROCEDURENAME_FAILED':
            return {
                ...state,
                addprocedurename: action.payload
            }

        case 'ADDPROCEDURECODE':
            return state;

        case 'ADDPROCEDURECODE_SUCCESS':
            return {
                ...state,
                addprocedurecode: action.payload
            };

        case 'ADDPROCEDURECODE_FAILED':
            return {
                ...state,
                addprocedurecode: action.payload
            }

        default:
            return state;
    }
}
export default EventsReducer;

