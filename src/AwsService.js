// awsService.js
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
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

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        // Authentication successful
        resolve({ isAuthenticated: true, isConfirmed: true });
        console.log(session);
      },
      onFailure: (error) => {
        // Authentication failed
        if (error.code === "UserNotConfirmedException") {
          console.error("User is not confirmed yet", error);
          resolve({ isAuthenticated: false, isConfirmed: false });
        } else {
          console.error("Authentication failed", error);
          resolve({ isAuthenticated: false, isConfirmed: true });
        }
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // Handle new password requirement (if needed)
        resolve({ isAuthenticated: false, isConfirmed: true });
      },
    });
  });
};

export const signUpUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log("User registration failed", err);
        reject(err);
        return;
      }

      const cognitoUser = result.user;
      console.log("user registered:", cognitoUser);

      if (result.userConfirmed === false) {
        resolve({ showConfirmationCode: true, isUserExists: false });
      } else {
        resolve({ showConfirmationCode: false, isUserExists: false });
      }
    });
  });
};

export const resetPassword = (username, verificationCode, newPassword) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: (data) => {
        resolve(data);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const forgotPassword = (username) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: () => {
        resolve();
      },
      onFailure: (err) => {
        reject(err);
      },
      inputVerificationCode: () => {
        resolve();
      },
    });
  });
};

export const confirmRegistration = (username, confirmationCode) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(
      confirmationCode,
      true,
      (confirmationErr, confirmationResult) => {
        if (confirmationErr) {
          console.error("Confirmation error:", confirmationErr);
          reject(confirmationErr);
        } else {
          console.log("user registration confirmed:", confirmationResult);
          resolve(confirmationResult);
        }
      }
    );
  });
};

export const resendConfirmationCode = (username) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error("Error resending confirmation code:", err);
        reject("Error resending confirmation code. Please try again.");
      } else {
        console.log("Confirmation code resent successfully:", result);
        resolve("Confirmation code sent successfully!");

        // Implement the timer logic after successful code resend if needed
      }
    });
  });
};

export const changePassword = (username, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: username,
      Password: oldPassword,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        // Authentication successful, change password
        cognitoUser.changePassword(
          oldPassword,
          newPassword,
          (changePasswordErr, changePasswordResult) => {
            if (changePasswordErr) {
              console.error("Change password error:", changePasswordErr);
              reject(changePasswordErr);
            } else {
              console.log(
                "Password changed successfully:",
                changePasswordResult
              );
              resolve(changePasswordResult);
            }
          }
        );
      },
      onFailure: (authError) => {
        console.error(
          "Authentication failed during change password:",
          authError
        );
        reject(authError);
      },
    });
  });
};
