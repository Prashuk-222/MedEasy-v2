import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const PatientContext = createContext();
export default PatientContext;

export const PatientProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(false);
  let [patientList, setPatientList] = useState([]);
  let navigate = useNavigate();
  const port = "8000";
  const baseURL = `http://127.0.0.1:${port}`;

  let registerPatient = async (e) => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("first_name", e.firstName);
      formData.append("last_name", e.lastName);
      formData.append("age", e.age);
      formData.append("phone_number", e.phoneNo);
      if (e.email !== null && e.email !== undefined) {
        formData.append("email", e.email);
      }
      if (e.photo) {
        formData.append("profile_photo", e.photo);
      }

      let response = await fetch(`${baseURL}/patients/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: formData,
      });
      console.log(formData)
      let data = await response.json();
      if (response.status === 201) {
        toast.success("Patient is been registered!", {
          position: "top-right",
        });
        setTimeout(function () {
          navigate("/chatHomePage", { replace: true });
        }, 3000);
      } else {
        console.log(data);
        toast.error("Error while creating patient, try again after sometime", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  let fetchPatients = async () => {
    setLoading(true);
    try {
      let response = await fetch(`${baseURL}/patients/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setPatientList(data);
        toast.success("Fetched List is been saved!", {
          position: "top-right",
        });
        setTimeout(function () {
          setLoading(false)
        }, 2000);
      } else {
        console.log(data);
        toast.error("Error while fetching patient list", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  let contextData = {
    registerPatient: registerPatient,
    fetchPatients: fetchPatients,
    patientList: patientList,
    loading: loading,
    setLoading: setLoading,
  };

  return (
    <PatientContext.Provider value={contextData}>
      {children}
    </PatientContext.Provider>
  );
};
