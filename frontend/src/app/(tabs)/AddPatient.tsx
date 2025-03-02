import React, { useState, useContext } from "react";
import "./addPatient.css";
import AuthContext from "../../providers/AuthProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PatientsView from "../../components/PatientsView";
import { ToastContainer } from "react-toastify";

const UserProfileEdit = () => {
  const { user, authTokens } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "123-456-7890",
    photo:
      "https://static-00.iconduck.com/assets.00/user-icon-512x512-x23sj495.png",
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
        <ToastContainer />
        <div className="profile-container">
          <div className="header-section">
            <ArrowBackIosIcon
              className="back-icon"
              onClick={() => window.history.back()}
            />
          </div>
          <div className="auth-message">
            <h2 className="profile-name">Please login to view your profile</h2>
            <a className="login-link" href="/signIn">
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <ToastContainer />
      <div className="profile-container">
        <div className="header-section">
          <ArrowBackIosIcon
            className="back-icon"
            onClick={() => window.history.back()}
          />
          <h5 className="header-title">Add Patient Profile</h5>
        </div>

        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-photo-container">
              <img
                src={formData.photo || "/placeholder.svg"}
                alt="Profile"
                className="profile-photo"
              />
              <div className="photo-upload-icon">
                <label htmlFor="photo-upload" className="upload-label">
                  📷
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="photo-input"
                  />
                </label>
              </div>
            </div>
            <h2 className="profile-name">
              {formData.firstName ? formData.firstName : "Your"}{" "}
              {formData.firstName ? formData.lastName : "Name"}
            </h2>
            <p className="profile-email">{formData.email}</p>
            <div className="profile-actions">
              <button className="secondary-button">
                <span className="button-icon">📥</span>Import Profile
              </button>
              <button
                className="secondary-button"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="button-icon">👁️</span>View Profile
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="form-fields">
            <div className="form-group">
              <label className="form-label">Name*</label>
              <div className="name-inputs">
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="First Name"
                  />
                </div>
                <div className="input-wrapper">
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
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Phone Number*</label>
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
                <label className="form-label">Age*</label>
                <div className="username-input-group">
                  <input
                    className="form-input"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="age"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="form-input"
                  onChange={handleChange}
                  placeholder="youremail@email.com"
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

      {/* Patient View Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <PatientsView onClose={() => setIsModalOpen(!isModalOpen)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileEdit;
