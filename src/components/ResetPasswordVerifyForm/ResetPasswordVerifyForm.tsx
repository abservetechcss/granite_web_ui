import { Form } from "devextreme-react";
import { RequiredRule, EmailRule, Label, ButtonItem, ButtonOptions, SimpleItem, CustomRule } from "devextreme-react/form";
import { FieldDataChangedEvent } from "devextreme/ui/form";
import React from "react";
import { withRouter } from "../../../src/hoc/withRouter"
import { Navigate } from "react-router-dom";
import { IAccount } from "../../api/account/interfaces/IAccount";
import { TYPES } from "../../ioc/types";
import { resolve } from 'inversify-react';
import { forgotPasswordVerificationRequest } from "../../api/account/request/forgotPasswordVerificationRequest";

interface ResetPasswordVerifyFormProps {
    
}
 
interface ResetPasswordVerifyFormState {
    loading: boolean;
    verificationCodeSuccess: boolean,
    password: string,
    passwordconfirmation: string,
    verificationcode: string
}
 
class ResetPasswordVerifyForm extends React.Component<ResetPasswordVerifyFormProps, ResetPasswordVerifyFormState> {
    @resolve(TYPES.IAccount) private readonly accountApi: IAccount;
    constructor(props: ResetPasswordVerifyFormProps) {
        super(props);
        this.state = { 
                        loading: false,
                        verificationCodeSuccess: false,
                        password: "",
                        passwordconfirmation: "",
                        verificationcode: "",
                        };
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

    private confirmPassword = ({ value }: any) => value === this.state.password;

    private formFieldDataChanged = (e: FieldDataChangedEvent) => {
        const key = e.dataField != undefined ? e.dataField  : '';
        const val = e.value
        var obj  = {}
        obj[key] = val
        this.setState(obj)
    }

    private handleSubmit = async (e: any) => {
        try{
            this.setState({ loading: true  });
            e.preventDefault();

            const request : forgotPasswordVerificationRequest = {
                password: this.state.password,
                passwordConfirmation: this.state.passwordconfirmation,
                token: this.state.verificationcode
            }
            
            this.accountApi.forgotPasswordVerification(request);
            this.setState({ 
                            loading: false,
                            verificationCodeSuccess: true,
                          });

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    render() { 
        return (
        <div className="form">
            <form onSubmit={this.handleSubmit}>        
                <Form 
                    id="form"
                    labelMode={'floating'}
                    labelLocation={'left'}
                    readOnly={false}
                    colCount={1}
                    onFieldDataChanged={this.formFieldDataChanged}
                    >
                    <SimpleItem dataField="verificationcode" editorType="dxTextBox">
                        <RequiredRule message="Verification Code is required" />
                        <Label text="Verification Code"></Label>
                    </SimpleItem>
                    <SimpleItem dataField="password" editorType="dxTextBox" editorOptions={{ mode: 'password', hint: 'minimum of 8 characters including 3 from upper, lower, number and special character'}}>
                    <CustomRule message={'Password must be minimum of 8 characters including 3 from upper, lower, number and special character'}
                                validationCallback={this.validatePassword}
                                />
                        <RequiredRule message="Password is required" />
                    </SimpleItem>        
                    <SimpleItem dataField="passwordconfirmation" editorType="dxTextBox" editorOptions={{ mode: 'password', hint: 'minimum of 8 characters including 3 from upper, lower, number and special character'}}>
                        <RequiredRule message="Password confirmation is required" />
                        <Label text="Password Confirmation"></Label>
                        <CustomRule message={'Passwords do not match'} validationCallback={this.confirmPassword} />
                    </SimpleItem>
            `       <ButtonItem>
                        <ButtonOptions
                            text={'Reset'}
                            type={'default'}
                            icon={'save'}
                            useSubmitBehavior={'true'}
                        /> 
                    </ButtonItem>
                </Form>
            </form>     
            {this.state.verificationCodeSuccess ? 
                <Navigate to="/login" replace={true} />
            : null }    
        </div>
        );
 
    }
}
 
export default withRouter(ResetPasswordVerifyForm);
