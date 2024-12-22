import React from "react";
import SignUpCard from "../../components/MUI components/CustomSignIn/SignUpCard";
import img from "../../assets/loginScreenImage.png";
import "./SignIn.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const SignUp = () => {
  console.log("sing Up page");
  return (
    <div className="container">
      <div className="inner-container">
        <ArrowBackIosIcon className="back-icon icon" />
        <img src={img} alt="Login" className="image" />
        <div className="signin-card">
          <SignUpCard />
        </div>
      </div>
    </div>
  );
};


export default SignUp;
