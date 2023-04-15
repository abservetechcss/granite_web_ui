import React from 'react';
import { Link } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule
} from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';
import './ResetPasswordForm.scss'
import { resolve } from 'inversify-react';
import { IAccount } from '../../api/account/interfaces/IAccount';
import { TYPES } from '../../ioc/types';
import { forgotPasswordRequest } from '../../api/account/request/forgotPasswordRequest';
import { FieldDataChangedEvent } from 'devextreme/ui/form';
import { withRouter } from "../../../src/hoc/withRouter"
import { Navigate } from "react-router-dom";

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

interface ResetPasswordFormProps {
  
}
 
interface ResetPasswordFormState {
  loading: boolean;
  email: string;
  forgotPasswordSuccess: boolean;
}
 
class ResetPasswordForm extends React.Component<ResetPasswordFormProps, ResetPasswordFormState> {
  @resolve(TYPES.IAccount) private readonly accountApi: IAccount;
  
  constructor(props: ResetPasswordFormProps) {
    super(props);
    this.state = { 
                    loading: false,
                    email: '',
                    forgotPasswordSuccess: false,
                 };
  }

  private emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email' };
  private submitButtonAttributes = { class: 'submit-button' };
  
  private formFieldDataChanged = (e: FieldDataChangedEvent) => {
    const key = e.dataField != undefined ? e.dataField  : '';
    const val = e.value
    var obj  = {}
    obj[key] = val
    this.setState(obj)
  }

  private onSubmit = async (e: any) => {
    e.preventDefault();
    this.setState({ loading: true  });

    const request: forgotPasswordRequest = {
      email: this.state.email
    }
    
    this.accountApi.forgotPassword(request);

    this.setState({
                    loading: false,
                    forgotPasswordSuccess: true,
                  });

  };

  render() { 
    return (
      <form className={'reset-password-form'}  onSubmit={this.onSubmit}>
        <Form  disabled={this.state.loading} onFieldDataChanged={this.formFieldDataChanged}>
          <Item
            dataField={'email'}
            editorType={'dxTextBox'}
            editorOptions={this.emailEditorOptions}
          >
            <RequiredRule message="Email is required" />
            <EmailRule message="Email is invalid" />
            <Label visible={false} />
          </Item>
          <ButtonItem>
            <ButtonOptions
              elementAttr={this.submitButtonAttributes}
              type={'default'}
              useSubmitBehavior={true}
            >
              <span className="dx-button-text">
                {
                  this.state.loading
                    ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                    : 'Reset my password'
                }
              </span>
            </ButtonOptions>
          </ButtonItem>
          <Item>
            <div className={'login-link'}>
              Return to <Link to={'/login'}>Sign In</Link>
            </div>
          </Item>
        </Form>
        {this.state.forgotPasswordSuccess ? 
          <Navigate to='/reset-password-verify' replace={true} />
        : null }   
      </form>
    );
  }
}

export default withRouter(ResetPasswordForm);
