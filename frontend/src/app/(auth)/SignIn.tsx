import React from "react";
import SignInCard from "../../components/MUI components/CustomSignIn/SignInCard";
import img from "../../assets/loginScreenImage.png";
import "./SignIn.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Login = () => {
  console.log("sing In");
  return (
    <div className="container">
      <div className="inner-container">
        <ArrowBackIosIcon className="back-icon icon" />
        <img src={img} alt="Login" className="image" />
        <div className="signin-card">
          <SignInCard />
        </div>
      </div>
    </div>
  );
};

export default Login;
