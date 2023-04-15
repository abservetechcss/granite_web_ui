import { DataGrid, LoadPanel, Button } from "devextreme-react";
import { Scrolling, Grouping, GroupPanel, ColumnChooser, ColumnFixing, SearchPanel, FilterRow, HeaderFilter, FilterPanel, Column, Item, Toolbar } from "devextreme-react/data-grid";
import React from "react";
import { IStorage } from "../../../api/storage/interfaces/IStorage";
import { TYPES } from "../../../ioc/types"
import { resolve } from 'inversify-react';
import FileUploadForm from "../../Common/FileUploadForm/FileUploadForm";
import { UploadType } from "../../../constants/constants";
import { ContextMenuItem } from "devextreme-react/file-manager";
import moment from "moment";
import episode from "../../../actions/episode_saga";
import { RowClickEvent } from "devextreme/ui/data_grid";
import { IFile } from "../../../api/file/interfaces/IFile";
import { IOrganisation } from "../../../api/organisation/interfaces/IOrganisation";
import { IASymmetricDecryption } from "../../../services/decryption/interface/IASymmetricDecryption";
import { ISymmetricDecryption } from "../../../services/decryption/interface/ISymmetricDecryption";
import { withAuth } from "../../../hoc/withAuth";
import './layoutMultimedia.css';
import { IExpand } from "../../../services/expand/interface/IExpand";
import mime from 'mime-types'

interface LayoutMultimediaProps {
    user: any
}
 
interface LayoutMultimediaState {
    loading: boolean,  
    files: [],
    showUpload: boolean,
    multimediaDirectory: any, 
}
 
class LayoutMultimedia extends React.Component<LayoutMultimediaProps, LayoutMultimediaState> {
   
    @resolve(TYPES.IStorage) private readonly storageApi: IStorage;
    @resolve(TYPES.IFile) private readonly fileApi: IFile;
    @resolve(TYPES.IOrganisation) private readonly organisationApi: IOrganisation;
    @resolve(TYPES.IASymmetricDecryption) private readonly aSymmetricDecrpytionApi: IASymmetricDecryption;
    @resolve(TYPES.ISymmetricDecryption) private readonly symmetricDecryptionApi: ISymmetricDecryption;
    @resolve(TYPES.IExpand) private readonly expandApi: IExpand;
   
    constructor(props: LayoutMultimediaProps) {
        super(props);
        this.state = {
                        loading: false,
                        files: [],
                        showUpload: false,
                        multimediaDirectory: "",
    
                     };
    }

    async componentDidMount() {
      this.setState({ loading: true  });
      await this.onRefresh();
      this.setState({ loading: false  });

    }

    onUploadClick = () => {
      this.setState({showUpload: true});
    }

    onHiding = async () => {
      this.setState({
                    showUpload: false,
                    loading: true
                  });
      await this.onRefresh();
      this.setState({ loading: false  });

    }

    onRowClick = async (e: RowClickEvent) => {
      this.setState({ loading: true  });
      console.log("e", e.data);
      const fileURL = await this.fileApi.getTemporaryLinkForDownload(e.data.parentId, e.data.fileId);
      console.log("fileURL", fileURL);
      const content = await this.fileApi.getFileFromStore(fileURL.link, e.data.encryptedLength);
      console.log("content", content);
      const patientRecord = await this.storageApi.getPatientRecordRoot("8c13b163-d468-4673-896e-39e590ee7c16", "5f055ce5-3015-4531-a202-85f1fb98d9a5");
      const organisation = await this.organisationApi.getOrganisationMember("5f055ce5-3015-4531-a202-85f1fb98d9a5", this.props.user.id);
      
      const decryptedMemberKey = this.aSymmetricDecrpytionApi.decrypt(organisation.key, this.props.user.privateKey, this.props.user.password );
      const rootRecord = patientRecord.find((directory: { metadata: { name: string; }; }) => directory.metadata.name === "root")
      const decryptedRootKey = this.symmetricDecryptionApi.decrypt(decryptedMemberKey, rootRecord.skey, rootRecord.siv);
      const decryptedParentKey = this.symmetricDecryptionApi.decrypt(decryptedRootKey, this.state.multimediaDirectory.key, this.state.multimediaDirectory.iv);
      const decryptedFileKey = this.symmetricDecryptionApi.decrypt(decryptedParentKey, e.data.storageKey, e.data.storageIv);
      const decryptedFile = this.symmetricDecryptionApi.decryptFile(decryptedFileKey, content, e.data.fileIv);
      const contents = await this.expandApi.expand(decryptedFile);
 
      const blob = contents.blob.slice(0, contents.blob.size, mime.lookup(contents.filename.split('.').pop()))
      const url = window.URL.createObjectURL(blob);

      let a = document.createElement('a');
      a.href = url;
      a.target = "_blank";
      a.click();
      this.setState({ loading: false  });
    }

     onRefresh = async () => {
      const patientRecord = await this.storageApi.getPatientRecordRoot("8c13b163-d468-4673-896e-39e590ee7c16", "5f055ce5-3015-4531-a202-85f1fb98d9a5");
      const multimedia = await this.storageApi.getDirectoryAndContent(patientRecord.find((content: { metadata: { name: string; }; }) => content.metadata.name === "Multimedia").id, "5f055ce5-3015-4531-a202-85f1fb98d9a5");
      this.setState({multimediaDirectory: multimedia.filesTree })
     
      this.setState({files: multimedia.filesTree.contents.map((content: any) => {
          return {
              id: content.id,
              name: content.metadata.name,
              notes: content.notes,
              date: moment(content.updated_at).format("DD/MM/YYYY HH:mm:ss"),
              modifiedBy: `${content.modified_surname} ${content.modified_name}`,
              episode: `${content.diagnosis}, ${content.consultant}, ${content.billingCategory}, ${moment(content.episodeCreationDate).format("DD/MM/YYYY")}`,
              parentId: content.parentId,
              fileId: content.metadata.id,
              storageKey: content.key,
              storageIv: content.iv, 
              fileIv: content.metadata.iv,
              encryptedLength: content.metadata.encryptedSize
            }   
          })
      })

      console.log("refresh finished");

    }

    render() { 
        return (
          <>
          <div id="multimediaForm">
            <DataGrid
            keyExpr="id"
            showBorders={true}
            dataSource={this.state.files}
            allowColumnReordering={true}
            allowColumnResizing={true}
            onRowClick={this.onRowClick}
            
          >
            <LoadPanel />
            <Scrolling mode="virtual" />
            <Grouping contextMenuEnabled={true} />
            <ColumnFixing enabled={true} />
            <SearchPanel visible={true} highlightCaseSensitive={true} width={400} />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <FilterPanel visible={true} />
            <Column dataField="name" dataType="string" cssClass="boldHeader" />
            <Column dataField="notes" dataType="string"  cssClass="boldHeader"/>
            <Column dataField="modifiedBy" dataType="string" caption="Modified By"  cssClass="boldHeader"/>
            <Column dataField="date" dataType="string"  cssClass="boldHeader" sortIndex={3} sortOrder={"desc"}/>
            <Column dataField="episode" dataType="string"  cssClass="boldHeader"  />
            <Toolbar>
              <Item location="before">
                <div className="GridTitle">
                  Multimedia
                </div>
               </Item>
              <Item>
                <Button hint="Upload" text="Upload Multimedia" stylingMode="outlined" onClick={this.onUploadClick}/>
              </Item>
              <Item name="columnChooserButton" />
              <Item name="searchPanel" />
              <Item>
                <Button hint="Refresh" icon="refresh" onClick={this.onRefresh}/>
              </Item>
              <Item name="groupPanel" />
            </Toolbar>
            </DataGrid>
            {this.state.showUpload ? 
              <FileUploadForm onHiding={this.onHiding} organisationId="5f055ce5-3015-4531-a202-85f1fb98d9a5"
               uploadType={UploadType.Multimedia} patientId={"8c13b163-d468-4673-896e-39e590ee7c16"} onRefresh={this.onRefresh}/>
            : null}
            </div>
            <LoadPanel
              shadingColor="rgba(0,0,0,0.4)"
              position={{of: '#multimediaForm'}}
              visible={this.state.loading}
              showIndicator={true}
              shading={true}
              showPane={true}
            />
        </>
      );
          
    }
}
 
export default withAuth(LayoutMultimedia);

