import axios from "axios";
import { injectable } from "inversify";
import { IFile } from "./interfaces/IFile";
import { UploadMetadataRequest } from "./request/UploadMetadataRequest";

@injectable()
export class RestFile implements IFile {

    sessionToken: string = sessionStorage.getItem("GraniteSessionToken") as string;

    async getTemporaryLinkForUpload(bucketId: string) {
        try { 
            const { data } = await axios.get<any>(
                `${process.env.REACT_APP_GRANITE_BASE_API}file/${bucketId}`,
                {
                    headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    granitesess: this.sessionToken
                    },
                },
                );
    
            if(data.body.err)
                throw new TypeError(`Error retrieving upload URL ${data.body.err}`);
                
            return data.body;   
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async uploadFileToStore(URL: string, content: string): Promise<any> {
        try { 
            const { data } = await axios.put<any>(`${URL}`, content,
                {
                    headers: {
                        'Content-Length': `${content.length}`,
                        'Content-Disposition': 'attachment',
                        'Content-Type': 'application/octet-stream',    
                    },
                },
                );
    
            return data;   
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async uploadMetadataToStore(request: UploadMetadataRequest) {
        try { 
            const { data } = await axios.post(`${process.env.REACT_APP_GRANITE_BASE_API}storage`, {...request},
              {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  granitesess: this.sessionToken
                },
              },
            );
            return data
        }
        catch (error) {
          console.log(error);
          throw error;
        }
    }

    async getTemporaryLinkForDownload(bucketId: string, fileId: string) : Promise<any> {
        try { 
            const { data } = await axios.get<any>(
                `${process.env.REACT_APP_GRANITE_BASE_API}/file/${bucketId}/key/${fileId}`,
                {
                    headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    granitesess: this.sessionToken
                    },
                },
                );
    
            if(data.body.err)
                throw new TypeError(`Error retrieving download URL ${data.body.err}`);
                
            return data.body;   
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getFileFromStore(URL: string, encryptedLength: string) {
        try { 
            const response = await axios.get<any>(`${URL}`, 
                {
                    responseType: 'arraybuffer',
                },
            );
            
            return response.data;   
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}