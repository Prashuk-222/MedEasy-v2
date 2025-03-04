import React, { useContext, useEffect, useState } from "react";
import PatientContext from "../providers/PatientProvider";
import { X, Search, Phone, Mail, User } from "lucide-react";
import PatientDetailView from "./PatientDetailView";

const PatientsView = ({ onClose }) => {
  const { fetchPatients, patientList, loading, setLoading } = useContext(PatientContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
    setLoading(false);
  }, []);

  const filteredPatients = patientList.filter(
    (patient) =>
      `${patient.first_name} ${patient.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (patient.email &&
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      patient.phone_number.includes(searchTerm)
  );

  // Handle view details click
  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
  };

  // Handle closing the details modal
  const handleCloseDetails = () => {
    setSelectedPatient(null);
  };

  if (selectedPatient) {
    return (
      <PatientDetailView
        patient={selectedPatient}
        onClose={handleCloseDetails}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fadeIn 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <button
            className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Patients Directory
          </h2>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-indigo-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div
          className="overflow-y-auto p-6 bg-gray-50"
          style={{ maxHeight: "calc(90vh - 180px)" }}
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredPatients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-r from-indigo-400 to-pink-400 p-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <img
                        src={
                          patient.profile_photo ||
                          "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                        }
                        alt={`${patient.first_name}'s profile`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">
                      {patient.first_name} {patient.last_name}
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        ({patient.age} yrs)
                      </span>
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Mail
                          size={16}
                          className="mr-2 flex-shrink-0 text-pink-400"
                        />
                        <span className="text-sm truncate">
                          {patient.email || "Email not provided"}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Phone
                          size={16}
                          className="mr-2 flex-shrink-0 text-pink-400"
                        />
                        <span className="text-sm">{patient.phone_number}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <User
                          size={16}
                          className="mr-2 flex-shrink-0 text-pink-400"
                        />
                        <span className="text-sm">
                          Registered by: {patient.registered_by.user_name}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-colors text-sm font-medium"
                        onClick={() => handleViewDetails(patient)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-3">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <p className="text-lg text-gray-500">
                {searchTerm
                  ? "No patients match your search"
                  : "No patients available"}
              </p>
              {searchTerm && (
                <button
                  className="mt-4 text-indigo-500 hover:text-indigo-600 text-sm font-medium"
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default PatientsView;
