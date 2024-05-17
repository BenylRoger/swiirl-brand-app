import RegistrationForm from "../components/RegistrationForm";

function Registration() {
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <RegistrationForm />
      </div>
      <div className="login-image-wrapper">
        <img
          src="/login/image.png" // Replace with your image path
          alt="right side Login"
          className="login-image"
        />
      </div>
    </div>
  );
}
export default Registration;
