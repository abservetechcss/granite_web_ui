import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule
} from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';

import { useAuth } from '../../contexts/auth';

import './LoginForm.scss';
import Toast from 'devextreme-react/toast';
import { Position } from 'devextreme-react/load-panel';
import { useDispatch } from "react-redux";

export default function () {
  const navigation = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const { logIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ email: localStorage.getItem('GraniteUserId')!, password: '' });
  const dispatch = useDispatch();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    const { email, password } = formData.current;
    setLoading(true);
    if (logIn) { 
      const response = await logIn(email, password);
      if(!response.isOk){
        setLoginError(true);
        setLoading(false);
      }
      else{
        dispatch({ type: 'LOGGEDINUSERID', payload: response.data.user.id })
      }
    }
    }, [logIn]);

  const onCreateAccountClick = useCallback(() => {
    navigation('/create-account');
  }, [navigation]);

  const onHiding = () => {
    setLoginError(false);
  }

  return (
    <form className={'login-form'} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="Email is required" />
          <EmailRule message="Email is invalid" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'password'}
          editorType={'dxTextBox'}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <Label visible={false} />
        </Item>
        <ButtonItem>
          <ButtonOptions
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {
                loading
                  ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                  : 'Sign In'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={'link'}>
            <Link to={'/reset-password'}>Forgot password?</Link>
          </div>
        </Item>
        <ButtonItem>
          <ButtonOptions
            text={'Create an account'}
            width={'100%'}
            onClick={onCreateAccountClick}
          />
        </ButtonItem>
      </Form>
      <Toast
            visible={loginError}
            message={"User name or password incorrect, please try again."}
            type={"error"}
            displayTime={3000}
            closeOnClick={true}
            onHiding={onHiding}
            
        >
          <Position my={"bottom"} at={"top"} of=".dx-button-text" offset="0 100" />  
        </Toast>
    </form>
  );
}

const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email' };
const passwordEditorOptions = { stylingMode: 'filled', placeholder: 'Password', mode: 'password' };
