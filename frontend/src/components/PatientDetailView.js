import React, { useState } from "react";
import { X, Phone, Mail, User, Calendar, Clock, MapPin, ClipboardList, Activity, Heart, AlertCircle } from "lucide-react";

const PatientDetailView = ({ patient, onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Dummy medical records (would come from API in real implementation)
  const medicalRecords = [
    {
      id: "1",
      date: "2025-02-15T14:00:00Z",
      type: "Blood Test",
      notes: "Normal CBC results. Vitamin D levels slightly low, recommended supplements.",
      doctor: "Dr. James Peterson"
    },
    {
      id: "2",
      date: "2024-11-03T09:15:00Z",
      type: "Annual Physical",
      notes: "Patient in good health. Blood pressure normal at 120/80. Weight stable.",
      doctor: "Dr. Sarah Williams"
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
        style={{animation: "fadeIn 0.3s ease-out"}}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-400 to-pink-400 p-6 text-white">
          <button 
            className="absolute right-6 top-6 text-white hover:text-gray-200 transition-colors rounded-full p-1 hover:bg-white hover:bg-opacity-10"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col sm:flex-row items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 sm:mb-0 sm:mr-6">
              <img
                src={patient.profile_photo || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                alt={`${patient.first_name}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">
                {patient.first_name} {patient.last_name}
              </h2>
              <p className="text-white text-opacity-90">
                Patient ID: {patient.id.substring(0, 8)}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-25">
                  {patient.age} years old
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-25">
                  Registered: {formatDate(patient.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-100">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "profile" 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User size={16} className="inline mr-2" />
              Profile
            </button>
            
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "medical" 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("medical")}
            >
              <ClipboardList size={16} className="inline mr-2" />
              Medical Records
            </button>
          </nav>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto p-6 bg-gray-50" style={{maxHeight: "calc(90vh - 250px)"}}>
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <User className="mr-2 text-indigo-500" /> Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-gray-800">{patient.first_name} {patient.last_name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Age</p>
                    <p className="text-gray-800">{patient.age} years</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-800">{patient.email || "Not provided"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-800">{patient.phone_number}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <Activity className="mr-2 text-indigo-500" /> Health Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-green-100 mr-3">
                        <Heart size={18} className="text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Blood Type</p>
                        <p className="text-gray-800 font-medium">O+</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <AlertCircle size={18} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Allergies</p>
                        <p className="text-gray-800 font-medium">None</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-purple-100 mr-3">
                        <Activity size={18} className="text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Last Checkup</p>
                        <p className="text-gray-800 font-medium">Feb 15, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <Clock className="mr-2 text-indigo-500" /> Registration Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Registered By</p>
                    <p className="text-gray-800">{patient.registered_by.user_name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Registration Date</p>
                    <p className="text-gray-800">{formatDate(patient.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Medical Records Tab */}
          {activeTab === "medical" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">Medical Records</h3>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg text-sm font-medium transition-colors">
                  Add Record
                </button>
              </div>
              
              {medicalRecords.map((record) => (
                <div 
                  key={record.id}
                  className="bg-white rounded-xl p-5 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-medium text-gray-800">
                        {record.type}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(record.date)}
                      </div>
                    </div>
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                      {record.doctor}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {record.notes}
                  </p>
                  
                  <div className="mt-3 flex justify-end">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View Full Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer Actions */}
        <div className="border-t border-gray-100 p-4 bg-white flex justify-between">
          <button 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
            onClick={onClose}
          >
            Close
          </button>
          
          <div className="space-x-2">
            <button className="px-4 py-2 border border-pink-300 text-pink-600 rounded-lg hover:bg-pink-50 text-sm font-medium transition-colors">
              Edit Patient
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg text-sm font-medium transition-colors">
              Save Changes
            </button>
          </div>
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

export default PatientDetailView;