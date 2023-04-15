import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SingleCard } from './layouts';
import { LoginForm, ResetPasswordForm, ChangePasswordForm, CreateAccountForm, VerifyForm } from './components';
import ResetPasswordVerifyForm from './components/ResetPasswordVerifyForm/ResetPasswordVerifyForm';

export default function () {
  return (
    <Routes>
      <Route path='/login' element={
        <SingleCard title="Sign In">
          <LoginForm />
        </SingleCard>
      } >
      </Route>
      <Route path='/verify' element={
        <SingleCard title="Verify Code">
          <VerifyForm />
        </SingleCard>
      } >
      </Route>
      <Route path='/create-account' element={
          <SingleCard title="Sign Up">
            <CreateAccountForm />
          </SingleCard>
        }>
      </Route>
      <Route path='/reset-password' element={
        <SingleCard
          title="Reset Password"
          description="Please enter the email address that you used to register, and we will send you an email with a code to reset your password."
        >
          <ResetPasswordForm />
        </SingleCard>
      } >
      </Route>  
      <Route path='/reset-password-verify' element={
        <SingleCard
          title="Reset Password Verification"
          description="Please enter the code supplied via email, then enter and confirm your new password"
        >
          <ResetPasswordVerifyForm />
        </SingleCard>
      } >
      </Route>  
      <Route path='/change-password/:recoveryCode' element={
        <SingleCard title="Change Password">
          <ChangePasswordForm />
        </SingleCard>
      } >
      </Route>
      <Route path='/' element={
        <SingleCard title="Sign In">
          <LoginForm />
        </SingleCard>
      } >
      </Route>  
    </Routes>
  );
}
