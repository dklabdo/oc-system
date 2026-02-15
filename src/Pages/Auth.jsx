import React, { useEffect, useState } from "react";
import bgAuth from "../assets/bg-auth.svg";
import logo from "../assets/logo.png";
import { CircleUser, Facebook, Instagram, Linkedin } from "lucide-react";
import logoClient from "../assets/Gemini_Generated_Image_hu68muhu68muhu68-removebg-preview.png";
import AdminAuth from "@/Component/AdminAuth";
import { Phone, Mail, ChevronRight, Server, Zap } from "lucide-react";

function Auth() {
  function ConnectToServer() {
    location.replace("https://benhadou.erp.ocestral.com/", "_blank");
  }
  return (
    <div className=" w-full overflow-y-hidden h-dvh flex bg-gray-50 items-center ">
      <ServerConnection />

      <div className="bg-gradient-to-b flex flex-col items-center justify-between relative from-main to-main/70 min-w-[35%] w-[40%] h-dvh ">
        <img
          src={bgAuth}
          alt=""
          className=" w-full absolute top-0 h-full object-cover "
        />
        <div className=" w-full h-dvh flex justify-center items-center flex-col gap-8 ">
          <img
            src={logo}
            alt=""
            className=" w-full max-w-52
              "
          />
          <h2 className="text-center text-lg px-3 font-semibold text-white ">
We Deliver smart & scalable digital solutions that empower businesses to grow in a connected, modern world.          </h2>
          
        </div>
      </div>
    </div>
  );
}

function ServerConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConnected(true);
    setIsConnecting(false);
    location.replace("https://benhadou.erp.ocestral.com/", "_blank");
  };

  return (
    <div className="min-h-screen scale-90 w-full bg-gradient-to-br flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Welcome Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Hello and welcome back! 👋
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            We've kept the engine running for you. Everything is organized,
            optimized, and ready for your next move.
          </p>
        </div>

        {/* About Software */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden mb-8 transform transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/60 animate-slide-up">
          {/* Card Body */}
          <div className="px-8 py-8">
            {/* Company Info */}
            <div className="flex scale-95 items-start gap-3 pb-4">
              <div className="w-22  p-2 h-22 bg-gradient-to-br  rounded-2xl flex items-center justify-center flex-shrink-0  ">
                <div className=" relative">
                  <img src={logoClient} />{" "}
                </div>
              </div>
              <div className=" pt-3 flex flex-col ">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  SARL BENHADOU TRAVEUX BATIMENT
                </h3>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Server className="w-4 h-4" />
                  <span className="text-sm">
                    Server provider: Algerie telecom
                  </span>
                </div>
              </div>
            </div>

            {/* Software Description */}
            <div className="mb-6 p-6 bg-gradient-to-br bg-gray-50 rounded-2xl border border-slate-200">
              <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-800" />
                <span>À propos du logiciel</span>
              </h4>
              <p className="text-slate-500 text-justify leading-relaxed">
                Our ERP platform provides a comprehensive and intuitive solution for centralized business management. Designed to adapt to various industries, it enables you to monitor operations in real time, coordinate teams, optimize resources, and automate core business and administrative processes. With a modern interface and powerful tools, you gain complete visibility and full control over your organization—anytime, anywhere.
              </p>
            </div>

            {/* Connection Status */}
            {isConnected && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">
                      Connected Successfully
                    </p>
                    <p className="text-sm text-green-700">
                      You're now connected to the server
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Connect Button */}
            <button
              onClick={handleConnect}
              disabled={isConnecting || isConnected}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 flex items-center justify-center space-x-3 group ${
                isConnected
                  ? "bg-green-500 cursor-default"
                  : isConnecting
                    ? "bg-blue-400 cursor-wait"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600  shadow-lg shadow-blue-500/30   transform "
              }`}
            >
              {isConnecting ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </>
              ) : isConnected ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <span>Connect to the server</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex pt-8 flex-wrap justify-center gap-6 text-slate-600 animate-fade-in-delayed">
          <a
            href="tel:+213699542392"
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">+213 6 99 54 23 92</span>
          </a>
          <a
            href="tel:+213697226795"
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">+213 6 97 22 67 95</span>
          </a>
          <a
            target="_blank"
            href="mailto:ocestral@gmail.com?subject=ERP ENTRY"
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">ocestral@gmail.com</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.6s ease-out 0.3s both;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}

export default Auth;
