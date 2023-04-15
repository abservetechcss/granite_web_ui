import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes
  } from "react-router-dom";

  import styled from 'styled-components';
  import { NavLink } from "react-router-dom";  
  import ResponsiveBox, {
    Row,
    Col,
    Item,
    Location,
  } from 'devextreme-react/responsive-box';

  const MenuItem = styled.li`
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
      
  `;  

  const MenuContainer = styled.div`
    background-color: #000;
`;  
  
  function screen(width) {
    return (width < 1200) ? 'sm' : 'lg';
  }

export function MainMenu() {
    return (
        <MenuContainer>
          <nav>
            <ResponsiveBox singleColumnScreen="sm" screenByWidth={screen}>
              <Row ratio={1}></Row>
              <Col ratio={1}></Col>
              <Col ratio={1}></Col>
              <Col ratio={1}></Col>
              <Col ratio={1}></Col>
              <Col ratio={1}></Col>
              <Col ratio={1}></Col>
              <Col ratio={1}></Col>
              <Col ratio={1}></Col>
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
                ></Location>
               <MenuItem>
                  <NavLink className="link" activeClassName="current"  to="/shceduler">Scheduler</NavLink >
                </MenuItem>
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
                <MenuItem>
                  <NavLink className="link" activeClassName="current"  to="/tasks">Tasks</NavLink >
                </MenuItem>
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
                <MenuItem>
                  <NavLink className="link" activeClassName="current" to="/lists">Lists</NavLink >
                </MenuItem>
              </Item>
              <Item>
                <Location
                  row={0}
                  col={3}
                  screen="lg"
                ></Location>
                <Location
                  row={0}
                  col={0}
                  screen="sm"
                ></Location>
                <MenuItem>
                  <NavLink className="link" activeClassName="current" to="/referrals">Referrals</NavLink >
                </MenuItem>
              </Item>
              <Item>
                <Location
                  row={0}
                  col={4}
                  screen="lg"
                ></Location>
                <Location
                  row={0}
                  col={0}
                  screen="sm"
                ></Location>
                <MenuItem>
                  <NavLink className="link" activeClassName="current" to="/messages">Messages</NavLink >
                </MenuItem>
              </Item>
              <Item>
                <Location
                  row={0}
                  col={5}
                  screen="lg"
                ></Location>
                <Location
                  row={0}
                  col={0}
                  screen="sm"
                ></Location>
                <MenuItem>
                  <NavLink className="link" activeClassName="current" to="/files">Files</NavLink >
                </MenuItem>
              </Item>
              <Item>
                <Location
                  row={0}
                  col={6}
                  screen="lg"
                ></Location>
                <Location
                  row={0}
                  col={0}
                  screen="sm"
                ></Location>
                <MenuItem>
                  <NavLink className="link" activeClassName="current" to="/letters">Letters</NavLink >
                </MenuItem>
              </Item>
              <Item>
                <Location
                  row={0}
                  col={7}
                  screen="lg"
                ></Location>
                <Location
                  row={0}
                  col={0}
                  screen="sm"
                ></Location>
                <MenuItem>
                  <NavLink className="link" activeClassName="current" to="/billing">Billing</NavLink >
                </MenuItem>
              </Item>
              <Item>
                <Location
                  row={0}
                  col={8}
                  screen="lg"
                ></Location>
                <Location
                  row={0}
                  col={0}
                  screen="sm"
                ></Location>
                <MenuItem>
                  <NavLink className="link" activeClassName="current" to="/analysis">Analysis</NavLink >
                </MenuItem>
              </Item>
              <Item>
                <Location
                  row={0}
                  col={9}
                  screen="lg"
                ></Location>
                <Location
                  row={0}
                  col={0}
                  screen="sm"
                ></Location>
                <MenuItem>
                  <NavLink className="link" activeClassName="current" to="/referrals">Referrals</NavLink >
                </MenuItem>
              </Item>
            </ResponsiveBox>
          </nav>
          <Routes>
            {/* <Route path="/home" element={<Home currentPath={"/home"} />} />
            <Route path="/profile" element={<Profile currentPath={"/profile"} />} />
            <Route path="/display-data" element={<DisplayData currentPath={"/display-data"} />} />
            <Route
              path="*"
              element={<Navigate to="/home" />}
            /> */}
        </Routes>

        </MenuContainer>
    );
  }