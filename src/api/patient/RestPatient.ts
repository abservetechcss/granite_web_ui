import axios from "axios";
import { injectable } from "inversify";
import { IPatient } from "./interfaces/IPatient";

@injectable()
export class RestPatient implements IPatient {
    async getEpisodesForPatient(patientId: number) {
        try { 
            const { data } = await axios.get<any>(
                `${process.env.REACT_APP_EPR_PATIENT_BASE_API}Document/ListEpisodes/${patientId}`,
                {
                    headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    },
                },
                );
    
            return data;   
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


}