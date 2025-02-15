import React from "react";
import SignInCard from "../../components/MUI components/CustomSignIn/SignInCard";
import img from "../../assets/loginScreenImage.png";
import "./SignIn.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Login = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="container">
      <div className="inner-container">
        <div className="back-icon-container" onClick={goBack}>
          <ArrowBackIosIcon className="back-icon icon" />
        </div>
        <img src={img} alt="Login" className="image" />
        <div className="signin-card">
          <SignInCard />
        </div>
      </div>
    </div>
  );
};

export default Login;
