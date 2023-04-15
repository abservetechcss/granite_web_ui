import { DataGrid, LoadPanel, Button } from "devextreme-react";
import { Scrolling, Grouping, GroupPanel, ColumnChooser, ColumnFixing, SearchPanel, FilterRow, HeaderFilter, FilterPanel, Column, Item, Toolbar } from "devextreme-react/data-grid";
import React from "react";
import { IStorage } from "../../../api/storage/interfaces/IStorage";
import { TYPES } from "../../../ioc/types"
import { resolve } from 'inversify-react';
import FileUploadForm from "../../Common/FileUploadForm/FileUploadForm";
import { IASymmetricDecryption } from "../../../services/decryption/interface/IASymmetricDecryption";
import { withAuth } from "../../../hoc/withAuth";
import { ISymmetricDecryption } from "../../../services/decryption/interface/ISymmetricDecryption";
import { UploadType } from "../../../constants/constants";
import { connect } from 'react-redux';
import { compose } from 'redux'
import { compileString } from "sass";
import './layoutDocuments.css';

interface LayoutDocumentsProps {
    user: any
}
 
interface LayoutDocumentsState {
    loading: boolean,  
    showUpload: boolean,  
}
 
class LayoutDocuments extends React.Component<LayoutDocumentsProps, LayoutDocumentsState> {
   
    @resolve(TYPES.IStorage) private readonly storageApi: IStorage;
    constructor(props: LayoutDocumentsProps) {
        super(props);
        this.state = { 
                        loading: false,
                        showUpload: false,
                      };
    }

    async componentDidMount() {

      const patientRecord = await this.storageApi.getPatientRecordRoot("8c13b163-d468-4673-896e-39e590ee7c16", "5f055ce5-3015-4531-a202-85f1fb98d9a5");
    }

    onUploadClick = () => {
      this.setState({showUpload: true});
    }

    onHiding = () => {
      this.setState({showUpload: false});
    }

    render() { 
      console.log(this.props);
        return (
            <div id="documentsForm">
            <>
            <DataGrid
            keyExpr="id"
            showBorders={true}
            dataSource={""}
            allowColumnReordering={true}
            allowColumnResizing={true}
            
          >
            <LoadPanel />
            <Scrolling mode="virtual" />
            <Grouping contextMenuEnabled={true} />
            <ColumnFixing enabled={true} />
            <SearchPanel visible={true} highlightCaseSensitive={true} width={400}/>
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <FilterPanel visible={true} />
            <Column dataField="Name" dataType="string" cssClass='boldHeader'  />
            <Column dataField="Category" dataType="string"  cssClass='boldHeader' />
            <Column dataField="Modified By" dataType="string"  cssClass='boldHeader' />
            <Column dataField="Date" dataType="string"  cssClass='boldHeader' />
            <Column dataField="Episode" dataType="string"  cssClass='boldHeader' />
            <Toolbar>
              <Item location="before">
                <div className="GridTitle">
                  Documents
                </div>
              </Item>
              <Item>
                <Button hint="Upload" text="Upload Document" stylingMode="outlined" onClick={this.onUploadClick}/>
              </Item>
              <Item>
                <Button hint="Refresh" icon="refresh"/>
              </Item>
              <Item name="columnChooserButton" />
              <Item name="searchPanel" />
              <Item name="groupPanel" />
            </Toolbar>
          </DataGrid>
          {this.state.showUpload ? 
            <FileUploadForm  onHiding={this.onHiding} organisationId="5f055ce5-3015-4531-a202-85f1fb98d9a5" uploadType={UploadType.Document} patientId={"8c13b163-d468-4673-896e-39e590ee7c16"}/>
          : null}
          </>
            </div>
          );
    }
}

const mapStateToProps = function(state: { layouts: any }) {
  return {
    layouts: state.layouts,
  }
}

export default compose(connect(mapStateToProps), withAuth)(LayoutDocuments);

