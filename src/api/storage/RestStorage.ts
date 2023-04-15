import axios from 'axios';
import { injectable } from "inversify";
import "reflect-metadata";
import { IStorage } from './interfaces/IStorage';

@injectable()
export class RestStorage implements IStorage {
    sessionToken: string = sessionStorage.getItem("GraniteSessionToken") as string;

    async getPatientRecordRoot(userId: string, organisationId: string): Promise<any> {
        try { 
        const { data } = await axios.get<any>(
            `${process.env.REACT_APP_GRANITE_BASE_API}storage/userid/${userId}/organisation/${organisationId}`,
            {
                headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                granitesess: this.sessionToken
                },
            },
            );

        if(data.body.err)
            throw new TypeError(`Error retrieving patient root ${data.body.err}`);
            
        return data.body.filesTree;   
        } catch (error) {
        console.log(error);
        throw error;
        }
    }

    async getDirectoryAndContent(storageId: string, organisationId: string) {
        try { 
            const { data } = await axios.get<any>(
                `${process.env.REACT_APP_GRANITE_BASE_API}v2/storage/${storageId}?records=true&organisationId=${organisationId}`,
                {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    granitesess: this.sessionToken
                },
                },
            );
    
            if(data.body.err)
            throw new TypeError(`Error retrieving patient root ${data.body.err}`);
                
            return data.body;   
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}