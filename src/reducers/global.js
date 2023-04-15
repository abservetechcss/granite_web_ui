var initialState = {
    layoutedit: false,
    orgId: "",
    loggedUserId:"",
    patientList:[],
    currentPatent:'',
    billingtype:'',
    getClinicAppointmentMinuts:'',
    insurerName:"",
    currentPrimaryConsultant: ""
}


const globalReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'LAYOUT_EDIT':
            return {
                ...state,
                layoutedit: action.payload
            };
        case 'ORGID':
            return {
                ...state,
                orgId: action.payload
            };
        case 'LOGGEDINUSERID':
            return {
                ...state,
                loggedUserId: action.payload
            };
        case 'CURRENTPRIMARYCONSULTANT':
                return {
                    ...state,
                    currentPrimaryConsultant: action.payload
                };    
        case 'PATIENTADD':
            let obj = state.patientList;
            var dup = true;
            for(var i = 0; i < obj.length; i++) {
                if (obj[i].id === action.payload.id) {
                    dup = false;
                    break;
                }
            }
            if(dup){
                if(obj.length === 5){
                    obj.shift();
                }
                obj.push(action.payload);
            }
            localStorage.setItem('patients',JSON.stringify(obj))
            return {
                ...state,
                patientList: obj
            };
        case 'PATIENTDELETE':
            let obj1 = state.patientList;
            let a = obj1.filter((item)=>{
                return item.id != action.payload
            })
            localStorage.setItem('patients',JSON.stringify(a))
            return {
                ...state,
                patientList: a
            };
            case 'PATIENTDELETEALL':
                localStorage.setItem('patients',"")
                return {
                    ...state,
                    patientList: []
                };    
        case 'CURRENTPATIENT':
            localStorage.setItem('currentpatients',action.payload)
            return {
                ...state,
                currentPatent: action.payload
            };
        case 'BILLINGTYPE':
            return {
                ...state,
                billingtype: action.payload
            };
        case 'GETCLINICAPPOINTMENTMINUTE_SUCCESS':
            return {
                ...state,
                getClinicAppointmentMinuts: action.payload
            };
        case 'INSURERNAME':
            return {
                ...state,
                insurerName: action.payload
            };

        default:
            return state;
    }
}
export default globalReducer;

