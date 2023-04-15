import React from 'react';
import { Link } from 'react-router-dom';
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule
} from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';

import './CreateAccountForm.scss';
import { TYPES } from '../../ioc/types';
import { IAccount } from '../../api/account/interfaces/IAccount';
import { resolve } from 'inversify-react';
import { getValidationCodeRequest } from '../../api/account/request/getValidationCodeRequest';
import { FieldDataChangedEvent } from 'devextreme/ui/form';
import { Navigate } from "react-router-dom";
import { Toast } from 'devextreme-react';
import { Position } from 'devextreme-react/toast';
interface CreateAccountProps {
  
}
 
interface CreateAccountState {
  loading: boolean,
  dob: Date,
  email: string,
  mobile: string,
  name: string,
  surname: string,
  password: string,
  mobileCodeSent: boolean,
  errorResponse: string,

}
 
class CreateAccount extends React.Component<CreateAccountProps, CreateAccountState> {
  @resolve(TYPES.IAccount) private readonly accountApi: IAccount;
  
  constructor(props: CreateAccountProps) {
    super(props);
    this.state  = { 
                    loading: false,
                    dob: new Date(),
                    email: '',
                    mobile: '',
                    name: '',
                    surname: '',
                    password: '',
                    mobileCodeSent: false,
                    errorResponse: '',  
                  };
  }

  private formData = { email: '', password: '', name: '', surname: ''  };

  private formFieldDataChanged = (e: FieldDataChangedEvent) => {
    const key = e.dataField != undefined ? e.dataField  : '';
    const val = e.value
    var obj  = {}
    obj[key] = val
    this.setState(obj)
  }

  private confirmPassword = ({ value }: any) => value === this.formData.password;

  private getErrorNarrative(errorResponse: string): string  {

    if(errorResponse === 'registration_tokensverification codeexceeded_max')
      return 'You have exceeded the maximum number of allowed registration attempts.';
    else if(errorResponse === 'Mobile number already registered')
      return 'This mobile number has already been registered.';  
    else
      return 'Error, please try again. If the error persists, please contact Granite support.';
  }

  private validatePassword = ({ value }: any) => {

    const length_test = /.{8,}/;
    const numeric_test = /[0-9]+/;
    const capitals_test = /[A-Z]+/;
    const lower_test = /[a-z]+/;
    const special_test = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
    const test_length = length_test.test(String(value));
    const test_numeric = numeric_test.test(String(value));
    const test_capitals = capitals_test.test(String(value));
    const test_lowercase = lower_test.test(String(value));
    const test_special = special_test.test(String(value));
    return Number(test_special) + Number(test_numeric) + Number(test_capitals) + Number(test_lowercase) > 2 && test_length;
  }

  private onHiding = () => {
    this.setState({ errorResponse: ''  });
  }

  private onSubmit = async (e: any) => {
    e.preventDefault();
    this.setState({ loading: true  });

    const request: getValidationCodeRequest = {
      dob: this.state.dob,
      mobile: this.state.mobile,
      email: this.state.email,
    }
    this.setState({ 
      loading: false,
    });

    const retValue = await this.accountApi.sendMobileValidationCode(request);

    if(retValue.response) {
      this.setState({ 
        mobileCodeSent: true,
      });
    }
    else{

      this.setState({ 
        errorResponse: this.getErrorNarrative(retValue.error)
      });
    }
  };

  render() { 
    return (
      <>
      <form className={'create-account-form'} onSubmit={this.onSubmit}>
        <Form   id="form"
                labelMode={'floating'}
                labelLocation={'left'}
                readOnly={false}
                colCount={1}
                onFieldDataChanged={this.formFieldDataChanged}
                formData={this.formData}
                disabled={this.state.loading} >
          <Item dataField="name" editorType="dxTextBox" editorOptions={{ placeholder: "name", stylingMode: 'filled' }} >
            <RequiredRule message="Name is required" />
            <Label visible={false} />
          </Item>
          <Item dataField="surname" editorType="dxTextBox" editorOptions={{ placeholder: "surname", stylingMode: 'filled' }}>
            <RequiredRule message="Surname is required" />
            <Label visible={false} />
          </Item>
          <Item
            dataField={'dob'}
            editorType={'dxDateBox'}
            editorOptions={{displayFormat: "dd/MM/yyyy", showClearButton: true, useMaskBehavior: true, type: "date", placeholder: "dd/mm/yyyy" }}
          >
            <RequiredRule message="Date of birth is required" />
            <Label text="Date of Birth"/>
          </Item>
          <Item dataField="mobile" editorType="dxTextBox" editorOptions={{ stylingMode: 'filled', placeholder: 'including international dialling code'}}>
            <RequiredRule message="Mobile is required" />
          </Item>
          <Item
            dataField={'email'}
            editorType={'dxTextBox'}
            editorOptions={{ stylingMode: 'filled', placeholder: 'Email', mode: 'email' }}
          >
            <RequiredRule message="Email is required" />
            <EmailRule message="Email is invalid" />
          </Item>
          <Item
            dataField={'email'}
            editorType={'dxTextBox'}
            editorOptions={{ stylingMode: 'filled', placeholder: 'Confirm Email', mode: 'email' }}
          >
            <RequiredRule message="Email confirmation is required" />
            <EmailRule message="Email is invalid" />
            <Label text={'Confirm Email'} />
          </Item>
          <Item
            dataField={'password'}
            editorType={'dxTextBox'}
            editorOptions={{ stylingMode: 'filled', placeholder: 'Password', mode: 'password', hint: 'minimum of 8 characters including 3 from upper, lower, number and special character'}}
          >
            <RequiredRule message="Password is required" />
            <CustomRule
              message={'Password must be minimum of 8 characters including 3 from upper, lower, number and special character'}
              validationCallback={this.validatePassword}
            />
          </Item>
          <Item
            dataField={'confirmpassword'}
            editorType={'dxTextBox'}
            editorOptions={{ stylingMode: 'filled', placeholder: 'Password', mode: 'password', hint: 'minimum of 8 characters including 3 from upper, lower, number and special character'}}
          >
            <RequiredRule message="Password is required" />
            <CustomRule
              message={'Passwords do not match'}
              validationCallback={this.confirmPassword}
            />
            <Label text={'Confirm Password'} />
          </Item>
          <Item>
            <div className='policy-info'>
              By creating an account, you agree to the <Link to=''>Terms of Service</Link> and <Link to=''>Privacy Policy</Link>
            </div>
          </Item>
          <ButtonItem>
            <ButtonOptions
              width={'100%'}
              type={'default'}
              useSubmitBehavior={true}
            >
              <span className="dx-button-text">
                {
                  this.state.loading
                    ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                    : 'Create a new account'
                }
              </span>
            </ButtonOptions>
          </ButtonItem>
          <Item>
          <div className={'login-link'}>
            Have an account? <Link to={'/login'}>Sign In</Link>
          </div>
          </Item>

        </Form>
      </form>
      <Toast
              visible={this.state.errorResponse.length > 0}
              message={this.state.errorResponse}
              type={'error'}
              displayTime={3000}
              closeOnClick={true}
              onHiding={this.onHiding}
            >
              <Position
                  at="bottom"
                  my="bottom"
                  of=".create-account-form"
              />
          </Toast> 
      {this.state.mobileCodeSent ? 
        <Navigate to="/verify" replace={true} state={{ 
                                                      email: this.state.email,
                                                      name: this.state.name,
                                                      surname: this.state.surname,
                                                      dob: this.state.dob,
                                                      mobile: this.state.mobile,
                                                      password: this.state.password,
                                                    }} />
        : null }                                            
      </>
    );
  }

}
 
  
  
 


export default CreateAccount;

