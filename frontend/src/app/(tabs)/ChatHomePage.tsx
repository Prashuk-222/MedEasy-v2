import React, { useState, useEffect, useContext } from "react";
import {
  Mic,
  MicOff,
  ChevronDown,
  ChevronUp,
  Send,
  Clock,
  Award,
  User,
  CheckCircle,
  Search,
  AlertCircle,
  PenTool,
} from "lucide-react";
import PatientContext from "../../providers/PatientProvider";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const questions = [
  {
    id: 1,
    question:
      "Describe the cognitive processes involved in decision-making. How do factors such as biases and emotions influence decision-making outcomes?",
  },
  {
    id: 2,
    question:
      "Explain the role of classical and operant conditioning in shaping human behavior. Provide real-life examples to illustrate your explanation.",
  },
  {
    id: 3,
    question:
      "Discuss the psychological impact of prolonged social isolation on individuals. What coping mechanisms can help mitigate these effects?",
  },
  {
    id: 4,
    question:
      "How does childhood trauma affect personality development and mental health in adulthood?",
  },
  {
    id: 5,
    question:
      "Explain the difference between intrinsic and extrinsic motivation. How do they impact learning and performance?",
  },
];

const ChatHome = () => {
  const { fetchPatients, patientList, loading, setLoading } =
    useContext(PatientContext);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [answers, setAnswers] = useState({});
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeRecordingQuestion, setActiveRecordingQuestion] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [lastTranscriptValue, setLastTranscriptValue] = useState("");

  useEffect(() => {
    if (activeRecordingQuestion && selectedPatient && transcript) {
      if (transcript !== lastTranscriptValue) {
        setAnswers((prev) => {
          const currentAnswer =
            prev[selectedPatient.id]?.[activeRecordingQuestion] || "";

          const updatedAnswer =
            currentAnswer === ""
              ? transcript
              : `${currentAnswer} ${transcript
                  .slice(lastTranscriptValue.length)
                  .trim()}`;

          return {
            ...prev,
            [selectedPatient.id]: {
              ...prev[selectedPatient.id],
              [activeRecordingQuestion]: updatedAnswer,
            },
          };
        });

        setLastTranscriptValue(transcript);
      }
    }
  }, [
    transcript,
    activeRecordingQuestion,
    selectedPatient,
    lastTranscriptValue,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchPatients();
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setPatients(patientList);
  }, [patientList]);

  const handleAnswerChange = (patientId, questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [patientId]: { ...prev[patientId], [questionId]: value },
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Submitting answers:", answers);
      setIsSubmitting(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      alert("Responses submitted successfully!");
    }, 1500);
  };

  const getProgress = (patientId) => {
    if (!answers[patientId]) return 0;
    const answered = Object.keys(answers[patientId]).length;
    return Math.round((answered / questions.length) * 100);
  };

  const toggleQuestion = (id) => {
    // If switching questions and still recording, stop recording
    if (listening && activeRecordingQuestion) {
      handleStopListening();
    }
    setExpandedQuestion((prev) => (prev === id ? null : id));
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient.email &&
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSaveAnswer = (questionId) => {
    if (
      selectedPatient &&
      answers[selectedPatient.id]?.[questionId] &&
      answers[selectedPatient.id][questionId].trim() !== ""
    ) {
      if (listening && activeRecordingQuestion === questionId) {
        handleStopListening();
      }
      toggleQuestion(questionId);
    }
  };

  const handleStartListening = (questionId) => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    if (!isMicrophoneAvailable) {
      alert("Microphone permission is required for voice input.");
      return;
    }

    // Stop any ongoing recording
    if (listening) {
      SpeechRecognition.stopListening();
    }

    // Clear transcript before starting
    resetTranscript();
    setLastTranscriptValue("");
    setActiveRecordingQuestion(questionId);

    // Start continuous listening
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setActiveRecordingQuestion(null);
    // Reset the transcript tracking
    setLastTranscriptValue("");
    resetTranscript();
  };

  const renderPatientStatus = (progress) => {
    if (progress === 0) return { color: "bg-gray-500", label: "Not Started" };
    if (progress < 50) return { color: "bg-orange-500", label: "In Progress" };
    if (progress < 100) return { color: "bg-blue-500", label: "Almost Done" };
    return { color: "bg-green-500", label: "Completed" };
  };

  if (!browserSupportsSpeechRecognition) {
    console.warn("Browser doesn't support speech recognition.");
  }

  return (
    <div className="h-screen flex bg-[#DBDEE3] overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-xl overflow-hidden flex flex-col border-r border-gray-200">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Go Back"
            >
              <ChevronDown size={20} className="rotate-90 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">Patient List</h2>
            <div className="bg-gray-100 p-2 rounded-full">
              <User size={20} className="text-gray-600" />
            </div>
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white shadow-sm"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-2 px-1">
            <span>Patient</span>
            <span>Status</span>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 pr-1 patient-list">
          <div className="space-y-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-6 space-y-3">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
                <p className="text-gray-600 font-medium">Loading patients...</p>
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 space-y-3">
                <AlertCircle size={40} className="text-gray-400" />
                <p className="text-gray-600 text-center">
                  No patients found matching your search
                </p>
              </div>
            ) : (
              filteredPatients
                .slice()
                .reverse()
                .map((patient) => {
                  const progress = getProgress(patient.id);
                  const status = renderPatientStatus(progress);
                  return (
                    <button
                      key={patient.id}
                      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                        selectedPatient?.id === patient.id
                          ? "bg-gray-700 text-white shadow-md"
                          : "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm"
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                          <img
                            src={
                              patient.profile_photo ||
                              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                            }
                            alt={patient.first_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {progress === 100 && (
                          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg">
                            <CheckCircle size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p
                          className={`font-semibold text-sm truncate ${
                            selectedPatient?.id === patient.id
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {patient.first_name} {patient.last_name}
                        </p>
                        <p
                          className={`text-xs truncate ${
                            selectedPatient?.id === patient.id
                              ? "text-gray-300"
                              : "text-gray-500"
                          }`}
                        >
                          {patient.email ||
                            patient.phone_number ||
                            "No contact info"}
                        </p>
                      </div>
                      <div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            selectedPatient?.id === patient.id
                              ? "bg-white bg-opacity-20 text-white"
                              : `${status.color} text-white`
                          }`}
                        >
                          {status.label}
                        </div>
                      </div>
                    </button>
                  );
                })
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 flex flex-col">
        {selectedPatient ? (
          <>
            <div className="p-5 border-b bg-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                  <img
                    src={
                      selectedPatient.profile_photo ||
                      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                    }
                    alt={selectedPatient.first_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedPatient.first_name} {selectedPatient.last_name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedPatient.email ||
                      selectedPatient.phone_number ||
                      "No contact information available"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-5">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-800">
                      Registered by:
                    </span>
                    <span className="text-gray-500 text-sm">
                      {selectedPatient.registered_by.user_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-800">
                      Last Updated on:
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                      }).format(new Date(selectedPatient.updated_at))}
                    </span>
                  </div>
                </div>

                <div className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2">
                  <Clock size={18} className="text-gray-600" />
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-medium leading-tight">
                      Progress: {getProgress(selectedPatient.id)}%
                    </span>
                    <span className="text-gray-500 text-xs leading-tight">
                      {answers[selectedPatient.id]
                        ? Object.keys(answers[selectedPatient.id]).length
                        : 0}
                      /{questions.length} questions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-[#DBDEE3] space-y-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Psychology Assessment
              </h3>

              {questions.map((q, index) => {
                const isAnswered = answers[selectedPatient.id]?.[q.id];
                const isExpanded = expandedQuestion === q.id;
                const isRecording =
                  listening && activeRecordingQuestion === q.id;

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 border-l-4 ${
                      isAnswered ? "border-green-500" : "border-gray-400"
                    } ${isExpanded ? "shadow-lg" : ""}`}
                  >
                    <div
                      className={`p-5 cursor-pointer transition-all hover:bg-gray-50 ${
                        isExpanded ? "bg-gray-50" : ""
                      }`}
                      onClick={() => toggleQuestion(q.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold ${
                              isAnswered ? "bg-green-500" : "bg-gray-600"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <p
                            className={`font-medium text-lg ${
                              isAnswered ? "text-green-800" : "text-gray-800"
                            }`}
                          >
                            {q.question}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {isAnswered ? (
                            <span className="mr-3 text-green-600 text-sm font-medium flex items-center">
                              <CheckCircle size={16} className="mr-1" />
                              Answered
                            </span>
                          ) : (
                            <span className="mr-3 text-gray-500 text-sm font-medium flex items-center">
                              <PenTool size={16} className="mr-1" />
                              Pending
                            </span>
                          )}
                          {isExpanded ? (
                            <ChevronUp size={22} className="text-gray-600" />
                          ) : (
                            <ChevronDown size={22} className="text-gray-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div
                        className="p-5 bg-white border-t border-gray-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex gap-3">
                          <textarea
                            className={`flex-1 border ${
                              isRecording
                                ? "border-blue-400 ring-2 ring-blue-200"
                                : "border-gray-300"
                            } p-4 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 h-48 bg-white resize-none`}
                            placeholder="Type your detailed answer here..."
                            value={answers[selectedPatient.id]?.[q.id] || ""}
                            onChange={(e) =>
                              handleAnswerChange(
                                selectedPatient.id,
                                q.id,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <button
                              className={`p-3 rounded-full ${
                                isRecording
                                  ? "bg-red-100 text-red-600 hover:bg-red-200 animate-pulse"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              } 
                              transition-colors`}
                              onClick={() =>
                                isRecording
                                  ? handleStopListening()
                                  : handleStartListening(q.id)
                              }
                              title={
                                isRecording
                                  ? "Stop recording"
                                  : "Start voice input"
                              }
                            >
                              {isRecording ? (
                                <MicOff size={20} />
                              ) : (
                                <Mic size={20} />
                              )}
                            </button>
                            <span className="text-gray-500 text-sm font-medium">
                              {isRecording
                                ? "Recording... Click to stop"
                                : "Voice input"}
                            </span>
                            {isRecording && (
                              <span className="text-blue-500 text-xs ml-2">
                                Speaking: {transcript || "..."}
                              </span>
                            )}
                          </div>
                          <button
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all shadow-sm ${
                              !answers[selectedPatient.id]?.[q.id] ||
                              answers[selectedPatient.id][q.id].trim() === ""
                                ? "bg-gray-400 text-white cursor-not-allowed opacity-70"
                                : isAnswered
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-700 text-white hover:bg-gray-800"
                            }`}
                            onClick={() => handleSaveAnswer(q.id)}
                          >
                            {isAnswered ? (
                              <>
                                <CheckCircle size={18} />
                                <span>Answer Saved</span>
                              </>
                            ) : (
                              <>
                                <Send size={18} />
                                <span>Save Answer</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-5 bg-white border-t shadow-md flex justify-between items-center">
              <div className="text-gray-600">
                <span className="font-medium">
                  {getProgress(selectedPatient.id)}% complete
                </span>
                <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-700"
                    style={{ width: `${getProgress(selectedPatient.id)}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || getProgress(selectedPatient.id) < 100}
                className={`relative overflow-hidden px-8 py-3 rounded-lg font-semibold shadow-lg flex items-center gap-2 transition-all ${
                  getProgress(selectedPatient.id) < 100
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : isSubmitting
                    ? "bg-gray-500 text-white cursor-wait"
                    : "bg-gray-700 text-white hover:bg-gray-800"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Award size={20} />
                    <span>Submit All Responses</span>
                  </>
                )}

                {showConfetti && (
                  <div className="confetti-container absolute inset-0 overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="confetti"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          backgroundColor: `hsl(${
                            Math.random() * 360
                          }, 100%, 50%)`,
                          transform: `rotate(${Math.random() * 360}deg)`,
                          animationDuration: `${Math.random() * 2 + 1}s`,
                          animationDelay: `${Math.random() * 0.5}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
              <User size={60} className="text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Patient Selected
            </h3>
            <p className="text-gray-600 max-w-md text-center mb-6">
              Please select a patient from the sidebar to view and answer their
              psychology assessment questions.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg max-w-md border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <AlertCircle size={16} className="mr-2" />
                Quick Tip
              </h4>
              <p className="text-gray-600 text-sm">
                You can use the search bar in the sidebar to quickly find a
                specific patient by name or email address.
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .patient-list::-webkit-scrollbar {
          width: 6px;
        }

        .patient-list::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }

        .patient-list::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 8px;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall linear forwards;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(50px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatHome;
