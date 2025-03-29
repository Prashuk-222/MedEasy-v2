import React from "react";
import { useState, useEffect, useContext } from "react";
import PatientContext from "../../providers/PatientProvider";

const ChatHome = () => {
  const {fetchPatients, patientList, loading, setLoading} = useContext(PatientContext);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        await fetchPatients();
        setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setPatients(patientList);
  }, [patientList])

  const sendMessage = async () => {

  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar - Patient List */}
      <div className="w-1/4 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-4">Patients</h2>
        <div className="space-y-2">
          {patients.map((patient) => (
            <button
              key={patient.id}
              className={`flex items-center gap-3 w-full p-2 rounded-lg transition ${
                selectedPatient?.id === patient.id ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedPatient(patient)}
            >
              <img
                src={patient.profile_photo ? patient.profile_photo : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                alt={patient.first_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold">{patient.first_name} {patient.last_name}</p>
                <p className="text-xs">{patient.email ? patient.email : patient.phone_number}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-white flex items-center gap-3">
          {selectedPatient && (
            <>
              <img
                src={selectedPatient.profile_photo ? selectedPatient.profile_photo : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                alt={selectedPatient.first_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex justify-start flex-col">
                <h2 className="text-xl font-bold">{selectedPatient.first_name} {selectedPatient.last_name}</h2>
                <p className="text-sm text-gray-500">{selectedPatient.email ? selectedPatient.email : selectedPatient.phone_number}</p>
              </div>
            </>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
              <span className={`inline-block p-3 rounded-lg max-w-xs ${
                msg.sender === "User" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Message Input */}
        {selectedPatient && (
          <div className="p-4 border-t bg-white flex gap-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded-lg"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button className="bg-green-500 text-white p-2 rounded-lg" onClick={sendMessage}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHome;
