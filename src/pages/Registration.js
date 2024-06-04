import RegistrationForm from "../components/RegistrationForm";
import RightImage from "../components/RightImage";

function Registration() {
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <RegistrationForm />
      </div>
      <div className="login-image-wrapper">
        <RightImage />
      </div>
    </div>
  );
}
export default Registration;
