import { Link } from "react-router-dom";
import "./LoginFooter.css";

function LoginFooter(props) {
  return (
    <p className="already-have-an-acco">
      <span className="text-wrapper-3">
        {props.page === "login"
          ? "Don’t have an Account?"
          : "Already have an account?"}{" "}
      </span>
      <Link
        to={props.page === "login" ? "/registration" : "/login"}
        className="text-wrapper-4"
      >
        {props.page === "login" ? "Register" : "Log in"}
      </Link>
    </p>
  );
}

export default LoginFooter;
