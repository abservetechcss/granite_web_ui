import FileUploader from "devextreme-react/file-uploader";
import Popup, { Position } from "devextreme-react/popup";
import { resolve } from "inversify-react";
import React from "react";
import { IFile } from "../../../api/file/interfaces/IFile";
import { withAuth } from "../../../hoc/withAuth";
import { TYPES } from "../../../ioc/types";
import { ICompression } from "../../../services/compression/interface/ICompression";
import { ISymmetricDecryption } from "../../../services/decryption/interface/ISymmetricDecryption";
import { ISymmetricEncryption } from "../../../services/encryption/interface/ISymmetricEncryption";
import { randomBytes }  from "crypto";
import { IASymmetricDecryption } from "../../../services/decryption/interface/IASymmetricDecryption";
import { IStorage } from "../../../api/storage/interfaces/IStorage";
import { DocumentCategoriesMap, DocumentCategories, UploadType, DocumentsDirectory, ProceduresDirectory, ResultsDirectory, FormsDirectory, MultimediaDirectory,} from "../../../constants/constants";
import { ScrollView, SelectBox, TextArea } from "devextreme-react";
import { IOrganisation } from "../../../api/organisation/interfaces/IOrganisation";
import { IPatient } from "../../../api/patient/interfaces/IPatient";
import { UploadMetadataRequest } from "../../../api/file/request/UploadMetadataRequest";
import moment from "moment";
import path from 'path';
import "./FileUploadForm.css"
import { selectEpisode } from "../../../actions/layouts";

interface FileUploadFormProps {
    onHiding: () => void; 
    onRefresh: () => void;   
    patientId: string,
    organisationId: string,
    user: any,
    uploadType: UploadType
}

interface FileUploadFormState {
    sending: boolean,   
    selectedCategory: number,
    episodes: Array<any>,
    selectedEpisode: number,
    notes: string, 
}

const episodeStyle = {
    marginTop: '20px'
};

class FileUploadForm extends React.Component<FileUploadFormProps, FileUploadFormState> {

    @resolve(TYPES.IFile) private readonly fileApi: IFile;
    @resolve(TYPES.IPatient) private readonly patientApi: IPatient;
    @resolve(TYPES.IOrganisation) private readonly organisationApi: IOrganisation;
    @resolve(TYPES.ICompression) private readonly compressionApi: ICompression;
    @resolve(TYPES.ISymmetricDecryption) private readonly symmetricDecryptionApi: ISymmetricDecryption;
    @resolve(TYPES.ISymmetricEncryption) private readonly symmetricEncryptionApi: ISymmetricEncryption;
    @resolve(TYPES.IStorage) private readonly storageApi: IStorage;
    @resolve(TYPES.IASymmetricDecryption) private readonly aSymmetricDecrpytionApi: IASymmetricDecryption;
  
    constructor(props: FileUploadFormProps) {
        super(props);
        this.state = { 
                        sending: false,
                        selectedCategory: 0,
                        episodes: [],
                        selectedEpisode: 0,
                        notes: ''
                     };
      };

    async componentDidMount() {

        const response = await this.patientApi.getEpisodesForPatient(130);
        this.setState({episodes: response.episodeInfo.map((episode: { dateCreated: string, billingTypeName: string, diagnosisName: string, primaryConsultantName: string; patientEpisodeId: number; }) => {
                
                return {id: episode.patientEpisodeId, text: `${episode.diagnosisName}, ${episode.primaryConsultantName}, ${episode.billingTypeName}, ${moment(episode.dateCreated).format('DD/MM/YYYY')}`,
                        diagnosis: episode.diagnosisName, consultant: episode.primaryConsultantName, billingCategory: episode.billingTypeName, episodeCreationDate: episode.dateCreated
                } 
            }
        )
        })
        this.setState({ selectedEpisode: response.episodeInfo[0].patientEpisodeId});
        
    }

    onCategoryChange = ( e: any ) => {

        this.setState({ selectedCategory: e.value  });
    }

    onValueChanged = ( e: any ) => { 
        this.setState({ selectedEpisode: e.value  });
    } 
    
    onNotesChanged = ( e: any ) => { 
        this.setState({ notes: e.value  });
    }   

    getStorageIdByCategory = (patientRecord: any) => { 

        switch(this.state.selectedCategory){
            case DocumentCategories.ReferralLetterIncoming:
            case DocumentCategories.ReferralLetterOutgoing:
            case DocumentCategories.ClinicLetter:
            case DocumentCategories.OtherCorrespondence:
                return patientRecord.find((directory: { metadata: { name: any; }; }) => directory.metadata.name === DocumentsDirectory);
            case DocumentCategories.OperationNote:
                return patientRecord.find((directory: { metadata: { name: any; }; }) => directory.metadata.name === ProceduresDirectory);
            case DocumentCategories.Result:
                return patientRecord.find((directory: { metadata: { name: any; }; }) => directory.metadata.name === ResultsDirectory);
            case DocumentCategories.MDTForm:
                return patientRecord.find((directory: { metadata: { name: any; }; }) => directory.metadata.name === FormsDirectory);
        }
    }

    getStorageIdByUploadType(patientRecord: any): any {
        return patientRecord.find((directory: { metadata: { name: any; }; }) => directory.metadata.name === MultimediaDirectory);
    }

    onFilesUploaded = () => {
        this.props.onHiding();
    }
    
    uploadFile = async (file: File, progressCallback: Function) => {

        progressCallback(10000);
        const patientRecord = await this.storageApi.getPatientRecordRoot(this.props.patientId, this.props.organisationId);

        let storageDirectory
        if(this.props.uploadType === UploadType.Document)
            storageDirectory = this.getStorageIdByCategory(patientRecord);
        if(this.props.uploadType === UploadType.Multimedia)
            storageDirectory = this.getStorageIdByUploadType(patientRecord);

        const organisation = await this.organisationApi.getOrganisationMember(this.props.organisationId, this.props.user.id);
        
        const decryptedMemberKey = this.aSymmetricDecrpytionApi.decrypt(organisation.key, this.props.user.privateKey, this.props.user.password );
        const rootRecord = patientRecord.find((directory: { metadata: { name: string; }; }) => directory.metadata.name === "root")
        const decryptedRootKey = this.symmetricDecryptionApi.decrypt(decryptedMemberKey, rootRecord.skey, rootRecord.siv);
        const decryptedParentKey = this.symmetricDecryptionApi.decrypt(decryptedRootKey, storageDirectory.key, storageDirectory.iv);
        progressCallback(30000);
        const zip = await this.compressionApi.compress(file);
    
        const key = randomBytes(32).toString("hex");
        const fileIv = randomBytes(16).toString("hex");
        const storageIv = randomBytes(16).toString("hex");
    
        const encryptObj = this.symmetricEncryptionApi.encrypt(key, zip, fileIv, false );
        const url = await this.fileApi.getTemporaryLinkForUpload(storageDirectory.id);
        const response = await this.fileApi.uploadFileToStore(url.link, encryptObj.content);
        const encryptedKey = this.symmetricEncryptionApi.encrypt(decryptedParentKey, key, storageIv, true);
        progressCallback(80000);
        
        const request:  UploadMetadataRequest = {
            type: "file",
            userId: this.props.user.id,
            organisationId: this.props.organisationId,
            parentId: storageDirectory.id,
            key: encryptedKey.content,
            iv: storageIv,
            notes: this.state.notes,
            categoryId: this.state.selectedCategory,
            patientEpisodeId: this.state.selectedEpisode,
            diagnosis: this.state.episodes.find(episode => episode.id === this.state.selectedEpisode).diagnosis,
            consultant: this.state.episodes.find(episode => episode.id === this.state.selectedEpisode).consultant,
            billingCategory: this.state.episodes.find(episode => episode.id === this.state.selectedEpisode).billingCategory,
            episodeCreationDate: this.state.episodes.find(episode => episode.id === this.state.selectedEpisode).episodeCreationDate,
            attachment: {
                encryptedSize: encryptObj.content.length.toString(),
                extension: path.extname(file.name).substring(1),
                id: url.id,
                iv: fileIv,
                name: file.name,
                originalSize: file.size.toString(),
            }
        }

        await this.fileApi.uploadMetadataToStore(request);

        progressCallback(100000);
    }

    render() { 
        return (
            <div id="fileUploadForm">
                <Popup
                visible={true}
                dragEnabled={true}
                closeOnOutsideClick={true}
                showCloseButton={true}
                showTitle={true}
                title="Upload File(s)"
                width={"40%"}
                height={"95%"}
                container=".dx-viewport"
                onHiding={this.props.onHiding}
            >
            <Position
                at="center"
                my="center"
            />
            {this.props.uploadType === UploadType.Document && 
                <SelectBox  label="Category"
                            labelMode={"floating"}
                            items={Object.values(DocumentCategories)}
                            onValueChanged={this.onCategoryChange}
                            dataSource={DocumentCategoriesMap} displayExpr={"text"} valueExpr={"id"} />
            }
            {this.props.uploadType === UploadType.Multimedia && 
                <TextArea   label="Notes"
                            labelMode={"floating"}
                            height={90}
                            onValueChanged={this.onNotesChanged}
                            value={this.state.notes}
                />
            }
            <div style={episodeStyle}> 
            <SelectBox  label="Select Episode"
                        labelMode={"floating"}
                        items={this.state.episodes}
                        displayExpr="text"
                        valueExpr="id" 
                        onValueChanged={this.onValueChanged}
                        value={this.state.selectedEpisode} />
            </div>    
            <ScrollView height={"100%"} showScrollbar={'always'}>
            <FileUploader
                        multiple={true}
                        uploadMode={'instantly'}
                        uploadFile={this.uploadFile}
                        maxFileSize={100000000} 
                        allowedFileExtensions={['.jpg', '.jpeg', '.gif', '.png', '.gif', '.pdf', '.mp4', '.wmw', '.docx', '.xlsx']}
                        onFilesUploaded={this.onFilesUploaded}
                />
            </ScrollView>
            </Popup>
        </div>    
        );
    }
}
 
export default withAuth(FileUploadForm);