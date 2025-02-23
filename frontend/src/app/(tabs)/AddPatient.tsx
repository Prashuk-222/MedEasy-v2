import React, { useState, useContext } from "react";
import "./addPatient.css";
import AuthContext from "../../providers/AuthProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const UserProfileEdit = () => {
  const {
    // setUser,
    // setAuthTokens,
    // registerUser,
    // loginUser,
    // logoutUser,
    user,
    authTokens,
  } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "123-456-7890",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteUser = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s",
    });
  };

  if (!user || !authTokens) {
    return (
      <div className="app-container">
        <div className="profile-container ">
        <ArrowBackIosIcon
          className="back-icon"
          style={{ cursor: "pointer", position: 'absolute' }}
          onClick={() => window.history.back()}
        />
          <div style={{ textAlign: "center" }}>
            <h2 className="profile-name">Please login to view your profile</h2>
            <a className="" href="/signIn">
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="profile-container">
      <ArrowBackIosIcon
          className="back-icon"
          style={{ cursor: "pointer", position: 'absolute' }}
          onClick={() => window.history.back()}
        />
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-photo-container">
              <img
                src={formData.photo}
                alt="Profile"
                className="profile-photo"
              />
            </div>
            <h2 className="profile-name">
              {formData.firstName ? formData.firstName : "Your"}{" "}
              {formData.firstName ? formData.lastName : "Name"}
            </h2>
            <p className="profile-email">{formData.email}</p>
            <div className="profile-actions">
              <button className="secondary-button">Import Profile</button>
              <button className="secondary-button">View Profile</button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="form-fields">
            <div className="form-group">
              <label className="form-label">Name</label>
              <div className="name-inputs">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="username-input-group">
                <span className="username-prefix">+91</span>
                <input
                  className="username-input"
                  type="number"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-input"
                onChange={handleChange}
                placeholder="youremail@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Profile Photo</label>
              <div className="photo-upload">
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="profile-photo-small"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="photo-input"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="form-footer">
            <button className="delete-button" onClick={handleDeleteUser}>
              <span className="delete-icon">🗑</span>
              Delete User
            </button>
            <div className="footer-actions">
              <button className="secondary-button">Cancel</button>
              <button className="primary-button">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
