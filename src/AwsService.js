// awsService.js
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-north-1_fiC62d8OP",
  ClientId: "715e0qqr8h55p6qi3onn397hku",
};

const userPool = new CognitoUserPool(poolData);

export const authenticateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: username,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = { Username: username, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        const accessToken = session.getAccessToken().getJwtToken();
        const idToken = session.getIdToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();

        // Store tokens in local storage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("refreshToken", refreshToken);

        resolve({ isAuthenticated: true });
      },
      onFailure: (error) => {
        console.error("Authentication failed", error);
        resolve({ isAuthenticated: false });
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // Handle new password requirement (if needed)
        resolve({ isAuthenticated: false, isConfirmed: true });
      },
    });
  });
};
