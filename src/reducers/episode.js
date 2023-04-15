var initialState = {
    episodepatientstatus: {},
    episodeprimaryconsultant: {},
    episodereferalsource: {},
    episodebillingtype: {},
    episodeinsurancecompany: {},
    episodeembassyid: {},
    episodesolicitorfirm: {},
    episodegpdetails: {},
    episodereferaldetails: {},
    episodebillingdetails: {},
    episodeshowplan: [],
    episodeshownotes: [],
    switchepisodes: {},
}


const EpisodesReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'EPISODEPATIENTSTATUS':
            return state;

        case 'EPISODEPATIENTSTATUS_SUCCESS':
            return {
                ...state,
                episodepatientstatus: action.payload
            };

        case 'EPISODEPATIENTSTATUS_FAILED':
            return {
                ...state,
                episodepatientstatus: action.payload
            }

        case 'EPISODEPRIMARYCONSULTANT':
            return state;

        case 'EPISODEPRIMARYCONSULTANT_SUCCESS':
            return {
                ...state,
                episodeprimaryconsultant: action.payload
            };

        case 'EPISODEPRIMARYCONSULTANT_FAILED':
            return {
                ...state,
                episodeprimaryconsultant: action.payload
            }

        case 'EPISODEREFERALSOURCE':
            return state;

        case 'EPISODEREFERALSOURCE_SUCCESS':
            return {
                ...state,
                episodereferalsource: action.payload
            };

        case 'EPISODEREFERALSOURCE_FAILED':
            return {
                ...state,
                episodereferalsource: action.payload
            }

        case 'EPISODEBILLINGTYPE':
            return state;

        case 'EPISODEBILLINGTYPE_SUCCESS':
            return {
                ...state,
                episodebillingtype: action.payload
            };

        case 'EPISODEBILLINGTYPE_FAILED':
            return {
                ...state,
                episodebillingtype: action.payload
            }

        case 'EPISODEINSURANCECOMPANY':
            return state;

        case 'EPISODEINSURANCECOMPANY_SUCCESS':
            return {
                ...state,
                episodeinsurancecompany: action.payload
            };

        case 'EPISODEINSURANCECOMPANY_FAILED':
            return {
                ...state,
                episodeinsurancecompany: action.payload
            }

        case 'EPISODEEMBASSYID':
            return state;

        case 'EPISODEEMBASSYID_SUCCESS':
            return {
                ...state,
                episodeembassyid: action.payload
            };

        case 'EPISODEEMBASSYID_FAILED':
            return {
                ...state,
                episodeembassyid: action.payload
            }

        case 'EPISODESOLIITORFIRM':
            return state;

        case 'EPISODESOLIITORFIRM_SUCCESS':
            return {
                ...state,
                episodesolicitorfirm: action.payload
            };

        case 'EPISODESOLIITORFIRM_FAILED':
            return {
                ...state,
                episodesolicitorfirm: action.payload
            }

        case 'GPDETAILS':
            return state;

        case 'GPDETAILS_SUCCESS':
            return {
                ...state,
                episodegpdetails: action.payload
            };

        case 'GPDETAILS_FAILED':
            return {
                ...state,
                episodegpdetails: action.payload
            }

        case 'REFERALDETAILS':
            return state;

        case 'REFERALDETAILS_SUCCESS':
            return {
                ...state,
                episodereferaldetails: action.payload
            };

        case 'REFERALDETAILS_FAILED':
            return {
                ...state,
                episodereferaldetails: action.payload
            }

        case 'BILLINGDETAILS':
            return state;

        case 'BILLINGDETAILS_SUCCESS':
            return {
                ...state,
                episodebillingdetails: action.payload
            };

        case 'BILLINGDETAILS_FAILED':
            return {
                ...state,
                episodebillingdetails: action.payload
            }

        case 'EPISODEPLAN':
            return state;

        case 'EPISODEPLAN_SUCCESS':
            return {
                ...state,
                episodeshowplan: action.payload
            };

        case 'EPISODEPLAN_FAILED':
            return {
                ...state,
                episodeshowplan: action.payload
            }

        case 'EPISODENOTES':
            return state;

        case 'EPISODENOTES_SUCCESS':
            return {
                ...state,
                episodeshownotes: action.payload
            };

        case 'EPISODENOTES_FAILED':
            return {
                ...state,
                episodeshownotes: action.payload
            }

        case 'SWITCHEPISODE':
            return state;

        case 'SWITCHEPISODE_SUCCESS':
            return {
                ...state,
                switchepisodes: action.payload
            };

        case 'SWITCHEPISODE_FAILED':
            return {
                ...state,
                switchepisodes: action.payload
            }


        default:
            return state;
    }
}
export default EpisodesReducer;

