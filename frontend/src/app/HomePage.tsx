import React from "react";
import img from "../assets/medical-stethoscope-white.jpg";

export default function HomePage() {
  return (
    <div
    className="h-screen bg-[#DBDEE3]"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'contain',
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'left',
      }}
    >
      {/* Header */}
      <div
        className="flex justify-end gap-16 py-4 bg-transparent"
        style={{ right: "15%", position: "relative" }}
      >
        <a href="/" className="text-xl font-bold">
          Home
        </a>
        <a href="/" className="text-xl font-bold ">
          Login
        </a>
        <a href="/" className="text-xl font-bold">
          AI help
        </a>
      </div>

      {/* Main Content */}
      <div style={{ height: "70%" }} className="w-full justify-items-end">
        <div
          style={{
            width: "30%",
          }}
          className="h-full mx-20 justify-items-center"
        >
          <div className="h-[50%] flex items-end justify-center">
            <p className="text-2xl text-right">
              USE AI FOR <br />
              <span className="text-3xl font-bold"> MORE DEATILED </span>
              AND <br /> <span className="text-3xl font-bold">ACCURATE</span>
              <br /> MEDICAL ASSISTANCE
            </p>
          </div>

          <div className="flex items-center justify-center flex-col w-full h-[50%] gap-2">
            <a
              href="/"
              className="text-xl bg-[#1c2932] px-12 py-4 text-white shadow-sm shadow-black font-semibold"
              style={{ borderRadius: 10 }}
            >
              New Patient
            </a>
            <a href="/" className="text-lg">
              Existing Patient?
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end">
        <div className="flex gap-8">
          <p
            style={{ borderRadius: 8 }}
            className="flex items-center mx-8 text-lg text-left h-12 px-12 bg-[#1c2932] text-white"
          >
            How to use?
          </p>
          <p
            style={{ borderRadius: 8 }}
            className="flex items-center text-lg text-right h-12 px-12 bg-[#1c2932] text-white"
          >
            Learn more
          </p>
        </div>

        <p>
          <div>
            <p
              className="text-2xl font-semibold"
              style={{ right: "35%", position: "relative" }}
            >
              <p className="text-7xl font-bold" style={{ color: "#1c2932" }}>
                MEDEASY
              </p>{" "}
              AI HEALTH ASSISTANT
            </p>
          </div>
        </p>
      </div>
    </div>
  );
}
