import { RestAccount } from './account/RestAccount';

export async function logIn(email, password) {
  try {

    const account = new RestAccount();
    const response = await account.login(email, password);
    sessionStorage.setItem('GraniteSessionToken', response.body.data.token);
    localStorage.setItem('GraniteUserId', email);
    
    return {
      isOk: response.body.data.user ? true : false,
      data: response.body.data
    };
  }
  catch {
    return {
      isOk: false,
      message: "Authentication failed"
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
