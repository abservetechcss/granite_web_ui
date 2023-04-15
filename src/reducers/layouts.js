var initialState = {
    patient: {},
    addevents: {},
    searchpatient: [],
    demographicpatient: {},
    episodepatient: {
        patientEpisodeDiagnoses:[]
    },
    demographicpatientput: {},
    eventspatient: [],
    primaryconsultant: {},
    outpatientappt: {},
    outpatientprocedure: {},
    operation: {},
    inpatientvisit: {},
    newaddepisodediagnosis: '',
    episodediagnosis: [],
    addepisode: {},
    removediagnosis: {},
    getevent1:{},
    getevent2:{},
    getevent3:{},
    getevent4:{},
    clinicfee:"",
    addhospital:"",
    lengthofstay:"",
    eventdeletereason:[],
    deleteevent:"",
}


const LayoutsReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'PATIENT':
            return state;

        case 'PATIENT_SUCCESS':
            return {
                ...state,
                patient: action.payload
            };

        case 'PATIENT_FAILED':
            return {
                ...state,
                patient: {}
            }

        case 'ADDEVENTS':
            return state;

        case 'ADDEVENTS_SUCCESS':
            return {
                ...state,
                addevents: action.payload,
            };

        case 'ADDEVENTS_FAILED':
            return {
                ...state,
                addevents: action.payload,
            }

        case 'SEARCHPATIENT':
            return state;

        case 'SEARCHPATIENT_SUCCESS':
            return {
                ...state,
                searchpatient: action.payload,
            };

        case 'SEARCHPATIENT_FAILED':
            return {
                ...state,
                searchpatient: action.payload,
            }

        case 'DEMOGRAPHICPATIENT':
            return state;

        case 'DEMOGRAPHICPATIENT_SUCCESS':
            return {
                ...state,
                demographicpatient: action.payload,
            };

        case 'DEMOGRAPHICPATIENT_FAILED':
            return {
                ...state,
                demographicpatient: action.payload,
            }

        case 'EPISODEPATIENT':
            return state;

        case 'EPISODEPATIENT_SUCCESS':
            return {
                ...state,
                episodepatient: action.payload,
            };

        case 'EPISODEPATIENT_FAILED':
            return {
                ...state,
                episodepatient: action.payload,
            }

        case 'DEMOGRAPHICPATIENTPUT':
            return state;

        case 'DEMOGRAPHICPATIENTPUT_SUCCESS':
            return {
                ...state,
                demographicpatientput: action.payload,
            };

        case 'DEMOGRAPHICPATIENTPUT_FAILED':
            return {
                ...state,
                demographicpatientput: action.payload,
            }

        case 'CLEARDEMOGINPUT':
            return {
                ...state,
                demographicpatientput: "",
            }

        case 'EVENTSPATIENT':
            return state;

        case 'EVENTSPATIENT_SUCCESS':
            return {
                ...state,
                eventspatient: action.payload,
            };

        case 'EVENTSPATIENT_FAILED':
            return {
                ...state,
                // eventspatient: [],
            }

        case 'PRIMARY_CONSULTANT':
            return state;

        case 'PRIMARY_CONSULTANT_SUCCESS':
            return {
                ...state,
                primaryconsultant: action.payload,
            };

        case 'PRIMARY_CONSULTANT_FAILED':
            return {
                ...state,
                primaryconsultant: action.payload,
            }


        case 'OUTPATIENTAPPT':
            return state;

        case 'OUTPATIENTAPPT_SUCCESS':
            return {
                ...state,
                outpatientappt: action.payload
            };

        case 'OUTPATIENTAPPT_FAILED':
            return {
                ...state,
                outpatientappt: action.payload
            }


        case 'OUTPATIENTPROCEDURE':
            return state;

        case 'OUTPATIENTPROCEDURE_SUCCESS':
            return {
                ...state,
                outpatientappt: action.payload
            };

        case 'OUTPATIENTPROCEDURE_FAILED':
            return {
                ...state,
                outpatientappt: action.payload
            }


        case 'OPERATION':
            return state;

        case 'OPERATION_SUCCESS':
            return {
                ...state,
                outpatientappt: action.payload
            };

        case 'OPERATION_FAILED':
            return {
                ...state,
                outpatientappt: action.payload
            }


        case 'INPATIENTVISIT':
            return state;

        case 'INPATIENTVISIT_SUCCESS':
            return {
                ...state,
                outpatientappt: action.payload
            };

        case 'INPATIENTVISIT_FAILED':
            return {
                ...state,
                outpatientappt: action.payload
            }

        case 'PLANHISTORY':
            return state;

        case 'PLANHISTORY_SUCCESS':
            return {
                ...state,
                // episodepatient: action.payload
            }

        case 'PLANHISTORY_FAILED':
            return {
                ...state
            }

        case 'NOTESHISTORY':
            return state;

        case 'NOTESHISTORY_SUCCESS':
            return {
                ...state,
            }

        case 'NOTESHISTORY_FAILED':
            return {
                ...state,
            }



        case 'CUSTOMEPISODEDIAGNOSIS':
            return state;

        case 'CUSTOMEPISODEDIAGNOSIS_SUCCESS':
            return {
                ...state,
                newaddepisodediagnosis: action.payload
            };

        case 'CUSTOMEPISODEDIAGNOSIS_FAILED':
            return {
                ...state,
                newaddepisodediagnosis: action.payload
            }


        case 'EPISODEDIAGNOSIS':
            return state;

        case 'EPISODEDIAGNOSIS_SUCCESS':
            let obj2 = state.episodepatient;
            obj2.patientEpisodeDiagnoses.push({
                sideName: action.payload.displayName.split("-").length > 1 ? action.payload.displayName.split("-")[0] : "",
                diagnosisName: action.payload.displayName.split("-").length > 1 ? action.payload.displayName.split("-")[1] : action.payload.displayName.split("-")[0],
                episodeDiagnosisId: action.payload.episodeDiagnosisId
            })
            return {
                ...state,
                episodepatient: obj2
            };

        case 'EPISODEDIAGNOSIS_FAILED':
            return {
                ...state,
                episodediagnosis: action.payload
            }

        case 'REMOVEDIAGNOSIS':
            return state;

        case 'REMOVEDIAGNOSIS_SUCCESS':
            let obj3 = state.episodepatient;
            let res = obj3.patientEpisodeDiagnoses.filter((item)=> item.episodeDiagnosisId != action.payload.value)
            obj3.patientEpisodeDiagnoses = res;
            return {
                ...state,
                episodepatient: obj3
            };

        case 'REMOVEDIAGNOSIS_FAILED':
            return {
                ...state,
                removediagnosis: action.payload
            }

        case 'SELECT_EPISODE':
            return state;

        case 'SELECT_EPISODE_SUCCESS':
            return {
                ...state,
                episodepatient: action.payload
            };

        case 'SELECT_EPISODE_FAILED':
            return {
                ...state,
            }

        case 'ADD_EPISODE':
            return state;

        case 'ADD_EPISODE_SUCCESS':
            return {
                ...state,
                patient: action.payload
            };

        case 'ADD_EPISODE_FAILED':
            return {
                ...state,
                patient: action.payload
            };
        case 'GETEVENT1':
            return state;

        case 'GETEVENT1_SUCCESS':
            return {
                ...state,
                getevent1: action.payload
            };

        case 'GETEVENT1_FAILED':
            return {
                ...state,
                getevent1: action.payload
            }
        case 'GETEVENT2':
            return state;

        case 'GETEVENT2_SUCCESS':
            return {
                ...state,
                getevent2: action.payload
            };

        case 'GETEVENT2_FAILED':
            return {
                ...state,
                getevent2: action.payload
            }

        case 'GETEVENT3':
            return state;

        case 'GETEVENT3_SUCCESS':
            return {
                ...state,
                getevent3: action.payload
            };

        case 'GETEVENT3_FAILED':
            return {
                ...state,
                getevent3: action.payload
            }
        case 'GETEVENT4':
            return state;

        case 'GETEVENT4_SUCCESS':
            return {
                ...state,
                getevent4: action.payload
            };

        case 'GETEVENT4_FAILED':
            return {
                ...state,
                getevent4: action.payload
            }

        case 'HOSPITALNAME':
            return state;

        case 'HOSPITALNAME_SUCCESS':
            let obj = state.episodepatient;
            obj.patientEpisode.patientStatusId = action.payload.patientStatusId;
            if(action.payload.patientStatusHospitalName){
                obj.patientEpisode.patientStatusHospitalName = action.payload.patientStatusHospitalName;
            }
            return {
                ...state,
                episodepatient : obj
            };

        case 'HOSPITALNAME_FAILED':
            return {
                ...state,
            }

        case 'GETCLINICFEE':
            return state;

        case 'GETCLINICFEE_SUCCESS':
            return {
                ...state,
                clinicfee : action.payload
            };

        case 'GETCLINICFEE_FAILED':
            return {
                ...state,
                clinicfee : action.payload
            }

        case 'ADDHOSPITAL':
            return state;

        case 'ADDHOSPITAL_SUCCESS':
            return {
                ...state,
                addhospital : action.payload
            };

        case 'ADDHOSPITAL_FAILED':
            return {
                ...state,
                addhospital : action.payload
            }

        case 'LENGTHOFSTAY':
            return state;

        case 'LENGTHOFSTAY_SUCCESS':
            return {
                ...state,
                lengthofstay : action.payload
            };

        case 'LENGTHOFSTAY_FAILED':
            return {
                ...state,
                lengthofstay : action.payload
            }

        case 'EVENTDELETEREASON':
            return state;

        case 'EVENTDELETEREASON_SUCCESS':
            return {
                ...state,
                eventdeletereason : action.payload
            };

        case 'EVENTDELETEREASON_FAILED':
            return {
                ...state,
                eventdeletereason : action.payload
            }


        case 'DELETEEVENT':
            return state;

        case 'DELETEEVENT_SUCCESS':
            return {
                ...state,
                deleteevent : action.payload
            };

        case 'DELETEEVENT_FAILED':
            return {
                ...state,
                deleteevent : action.payload
            }


        case 'COLLABORATORDETAILS':
            return state;

        case 'COLLABORATORDETAILS_SUCCESS':
            let obj1 = state.episodepatient;
            let a = {
                ...action.payload
            }
            a.id = a.collaboratorId;
            if(!action.payload.collaboratoredit){
                obj1.patientEpisode.collaborators.push(a)
            }
            else{
                obj1.patientEpisode.collaborators.map((item,i)=>{
                    if(item.id == a.collaboratorId){
                        obj1.patientEpisode.collaborators[i] = a
                    }
                })
            }
            return {
                ...state,
                episodepatient: obj1
            };

        case 'COLLABORATORDETAILS_FAILED':
            return {
                ...state,
                episodecollaboratordetails: action.payload
            }

        case 'DELETECOLLABORATOR':
            return state;

        case 'DELETECOLLABORATOR_SUCCESS':
            let obj4 = state.episodepatient;
            let ob = obj4.patientEpisode.collaborators.filter((item)=>{return item.id != action.payload})
            obj4.patientEpisode.collaborators = ob;
            return {
                ...state,
                episodepatient: obj4
            };

        case 'DELETECOLLABORATOR_FAILED':
            return {
                ...state,
                deletecollaboratordetails: action.payload
            }
        default:
            return state;
    }
}
export default LayoutsReducer;

