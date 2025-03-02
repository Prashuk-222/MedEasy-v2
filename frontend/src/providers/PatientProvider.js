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
  let [loading, setLoading] = useState(true);
  let [patientList, setPatientList] = useState([]);
  let navigate = useNavigate();
  const port = "8000";
  const baseURL = `http://127.0.0.1:${port}`;

  let registerPatient = async (e) => {
    setLoading(true);
    try {
      let response = await fetch(`${baseURL}/patients/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({
          first_name: e.first_name,
          last_name: e.last_name,
          age: e.age,
          phone_number: e.phone_number,
          email: e.email || null,
        }),
      });
      await response.json();
      if (response.status === 201) {
        toast.success("Patient is been registered!", {
          position: "top-right",
        });
        setTimeout(function () {
          navigate("/");
        }, 6000);
      } else {
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
          // navigate("/");
        }, 6000);
      } else {
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
