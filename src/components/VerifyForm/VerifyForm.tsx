import { Form, LoadIndicator, Toast } from "devextreme-react";
import { ButtonItem, ButtonOptions, Label, RequiredRule, SimpleItem } from "devextreme-react/form";
import { Position } from "devextreme-react/toast";
import { FieldDataChangedEvent } from "devextreme/ui/form";
import { resolve } from "inversify-react";
import React from "react";
import { Navigate } from "react-router-dom";
import { withRouter } from "../../../src/hoc/withRouter"
import { IAccount } from "../../api/account/interfaces/IAccount";
import { createUserRequest } from "../../api/account/request/createUserRequest";
import { exchangeCodeForTokenRequest } from "../../api/account/request/exchangeCodeForTokenRequest";
import { withAuth } from "../../hoc/withAuth";
import { TYPES } from "../../ioc/types";

interface VerifyFormProps {
    location: any,
    user: any,
}
 
interface VerifyFormState {
    loading: boolean,
    verificationCode: string,
    verificationCodeSuccess: boolean,
    errorResponse: string,
}
 
class VerifyForm extends React.Component<VerifyFormProps, VerifyFormState> {
    @resolve(TYPES.IAccount) private readonly accountApi: IAccount;
    
    constructor(props: VerifyFormProps) {
        super(props);
        this.state = { 
                     loading : false,
                     verificationCode: '',
                     verificationCodeSuccess: false,
                     errorResponse: ''
                      };
    }
    
    private onHiding = () => {
        this.setState({
                        errorResponse: ''
                         })    
    } 

    private getErrorNarrative(errorResponse: string): string  {

        if(errorResponse === 'Mobile invalid')
          return 'Mobile number invalid.';
        else if(errorResponse === 'user_already_registered')
          return 'This mobile has already been registered.';  
        else
          return 'Error, please try again. If the error persists, please contact Granite support.';
    }

    private handleSubmit = async (e: any) => {
        e.preventDefault();
        this.setState({ loading: true });
        
        const tokenRequest: exchangeCodeForTokenRequest = {
            mobile: this.props.location.state.mobile,
            code: this.state.verificationCode,
        }
        
        let retValue = await this.accountApi.exchangeCodeForToken(tokenRequest);
  
        this.setState({ 
            loading: false,
          });

        if(retValue.response) {
            sessionStorage.setItem("GraniteSessionToken", retValue.token);  
            const userRequest: createUserRequest = {
                dob: this.props.location.state.dob,
                email: this.props.location.state.email,
                name: this.props.location.state.name,
                surname: this.props.location.state.surname,
                passwd: this.props.location.state.password
            }
            
            retValue = await this.accountApi.createUser(userRequest, retValue.token);

            this.setState({ verificationCodeSuccess: true  });
        }
        else{
      
            this.setState({ 
                errorResponse: this.getErrorNarrative(retValue.error)
            });
          }
    };

    private formFieldDataChanged = (e: FieldDataChangedEvent) => {
        const key = e.dataField != undefined ? e.dataField  : '';
        const val = e.value
        var obj  = {}
        obj[key] = val
        this.setState(obj)
    }

    render(){
        return(
            <>
            <div>
                A verification SMS message has been sent to your phone number. Please enter the code below.
            </div>            
            <div className="form">
                 <form onSubmit={this.handleSubmit}>        
                    <Form 
                        id="form"
                        labelMode={'floating'}
                        labelLocation={'left'}
                        readOnly={false}
                        colCount={1}
                        onFieldDataChanged={this.formFieldDataChanged}
                        disabled={this.state.loading}
                        >   
                        <SimpleItem dataField="verificationCode" editorType="dxTextBox">
                            <RequiredRule message="Verification code is required" />
                            <Label text="Verification Code"></Label>
                        </SimpleItem>

                `       <ButtonItem>
                            <ButtonOptions
                                width={'100%'}
                                type={'default'}
                                useSubmitBehavior={'true'}
                            >
                                <span className="dx-button-text">
                                    {this.state.loading === true
                                    ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                                    : 'Verify'}
                                </span>    
                            </ButtonOptions>   
                        </ButtonItem>
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
            </div>
            {this.state.verificationCodeSuccess ? 
            <Navigate to="/login" replace={true} />
            : null }     
            </>
    )
  }
}      
 
export default withAuth(withRouter(VerifyForm));