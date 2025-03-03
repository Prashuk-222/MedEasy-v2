import React, { useState, useContext } from "react";
import "./addPatient.css";
import AuthContext from "../../providers/AuthProvider";
import PatientContext from "../../providers/PatientProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PatientsView from "../../components/PatientsView";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfileEdit = () => {
  const { user, authTokens } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { registerPatient, fetchPatients, patientList, loading, setLoading } =
    useContext(PatientContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: null,
    age: "",
    phoneNo: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
  };

  const handleDeleteUser = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: null,
      age: "",
      phoneNo: "",
      photo: null,
    });
  };

  const handleRegisterPatient = async () => {
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.age === "" ||
      formData.phoneNo === ""
    ) {
      toast.error("Please fill all the required fields marked as *");
      return;
    }

    await registerPatient(formData);
  };

  if (!user || !authTokens) {
    return (
      <div className="app-container">
        <ToastContainer aria-label="Notification container" />
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

  if (loading) {
    return (
      <div className="app-container">
        <ToastContainer aria-label="Notification container" />
        <div className="profile-container">
          <div className="header-section">
            <ArrowBackIosIcon
              className="back-icon"
              onClick={() => window.history.back()}
            />
            <h5 className="header-title">Add Patient Profile</h5>
          </div>

          {/* Loading Indicator */}
          <div
            className="loading-container"
            style={{
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress size={50} />
            <p className="loading-text">Loading, please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <ToastContainer aria-label="Notification container" />
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
                src={
                  formData.photo ? URL.createObjectURL(formData.photo) : "https://static-00.iconduck.com/assets.00/user-icon-512x512-x23sj495.png"
                }
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
                <span className="button-icon">📑</span>View Profile
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
              <button
                className="primary-button"
                onClick={handleRegisterPatient}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Patient View Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <PatientsView onClose={() => setIsModalOpen(!isModalOpen)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileEdit;
