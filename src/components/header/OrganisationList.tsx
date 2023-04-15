import  React  from "react";
import { ContextMenu } from 'devextreme-react/context-menu';
import styled from 'styled-components';
import { IOrganisation } from "../../api/organisation/interfaces/IOrganisation";
import { resolve } from "inversify-react";
import { GetOrganisationsResponse } from "../../api/organisation/response/GetOrganisationsResponse";
import { TYPES } from "../../ioc/types";

const SelectedOrganisationContainer = styled.div`
  cursor: pointer;
  display: flex;
  justifyContent: 'center',
  alignItems: 'center',
`;  

const SelectedOrganisationTextContainer = styled.div`
  margin: 27px;
  color: white
`;  

const LogoImage = styled.img`
  height: 60px;
  width: 60px;
  objectFit: 'contain';
`;  

type Organisation = {
  name: string;
};

type MyProps = {
};

type MyState = {
  organisations: Organisation[] 
};

export class OrganisationList extends React.Component<MyProps, MyState>  {
  @resolve(TYPES.IOrganisation) private readonly organisationApi: IOrganisation;

  state: MyState = {
    organisations: []
 }
  async componentDidMount(){
     const response = await this.organisationApi.getAllOrganisations();
     this.setState({organisations: response.body.organisations});

  }

  getContextMenuItems = () => {
    return this.state.organisations.filter((organisation, index) => index > 0).map((organisation, index) => {
        return ({text: organisation.name, icon: 'home' })
    })
  }
  
  render() {
  
    return(
      <>
        {this.state.organisations.length > 0 &&
            <>
              <div id="contextTarget">
                  <SelectedOrganisationContainer>
                    <LogoImage src={require('../../assets/icons/logo_small.png').default}></LogoImage>
                    <SelectedOrganisationTextContainer>
                    {`${this.state.organisations[0].name}`}
                    </SelectedOrganisationTextContainer>
                  </SelectedOrganisationContainer>
                </div>
                <div className="organisations">
                  <ContextMenu items={this.getContextMenuItems()}
                    target="#contextTarget"
                    showEvent={'dxclick'} />
                </div>
              </>
        }
        </>
    );
  }
}

