import { combineReducers } from 'redux';
import DemographicsReducer from './demographic';
import EpisodesReducer from './episode';
import EventsReducer from './events';
import globalReducer from './global';
import LayoutsReducer from './layouts';
// //processing and finishing
// import pf_facility_Info_Reducer from './pf/settings/kyc/facility/facility-info';


const rootReducer = combineReducers({
    global: globalReducer,
    demographic: DemographicsReducer,
    episode: EpisodesReducer,
    events: EventsReducer,
    layouts: LayoutsReducer,
})

export default rootReducer;