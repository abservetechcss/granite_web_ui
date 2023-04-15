import UserPanel from './components/UserPanel/UserPanel';

import { MainMenu } from '../src/menu/main-menu'

import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { OrganisationList } from './components/header/OrganisationList';
import ResponsiveBox, {
  Row,
  Col,
  Item,
  Location,
} from 'devextreme-react/responsive-box';

import Box, {
  Item as ItemBox,
} from 'devextreme-react/box';

const MenuContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  list-style-type: none;
  overflow: hidden;
  background-color: #000;

  .current {
      text-decoration: underline; 
      color:red;
  }
  .link {
      text-decoration: none; 
      color: white;
      &:hover {
          background-color: #111;
      }   
  }
  `;

const HeaderContainer = styled.div`
    background-color: #000;
  `;

const MainContainer = styled.div`
  margin-top: 500px;
  font-size:50px;
  margin-left:auto;
  margin-right:auto;
`;

function screen(width: number) {
  return (width < 1200) ? 'sm' : 'lg';
}

export default function Content(props: any) {
  
  return (
    <>
      <HeaderContainer>
        <ResponsiveBox singleColumnScreen="sm" screenByWidth={screen}>
        <Row ratio={1}></Row>
        <Col ratio={1}></Col>
        <Col ratio={8}></Col>
        <Col ratio={1}></Col>
        <Item>
          <Location
            row={0}
            col={0}
            screen="lg"
          ></Location>
          <Location
            row={0}
            col={0}
            screen="sm"
          ></Location >
            <OrganisationList/>
          </Item>
          <Item>
          <Location
            row={0}
            col={1}
            screen="lg"
          ></Location>
          <Location
            row={0}
            col={0}
            screen="sm"
          ></Location>
            <MainMenu />
          </Item>
          <Item>
          <Location
            row={0}
            col={2}
            screen="lg"
          ></Location>
          <Location
            row={0}
            col={0}
            screen="sm"
          ></Location>
            <UserPanel />
          </Item>
        </ResponsiveBox>
      </HeaderContainer>
      <br />
      <Box
        direction="col"
        width="100%"
        height={1500}>
        <ItemBox ratio={15}
        >
          <MainContainer>
          </MainContainer>
        </ItemBox>
      </Box>
    </>

  );
}


