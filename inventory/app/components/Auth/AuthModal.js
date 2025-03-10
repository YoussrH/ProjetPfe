"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import OtpVerificationForm from "./OtpVerificationForm";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const AuthModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    prefix: "",
    nom: "",
    prenom: "",
    email: "",
    password: "",
    newsletter: false,
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setIsOtpSent(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
        withCredentials: true,
      });
      toast.success(response.data.message, { duration: 5000 });
      setIsOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.error || "Une erreur s'est produite. Veuillez réessayer.", { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: formData.email,
        otp,
      }, {
        withCredentials: true,
      });
      toast.success("OTP vérifié avec succès. Vous êtes maintenant connecté.", { duration: 5000 });
      onClose();
      router.push("/");
      window.location.reload(); // Reload the page after successful login
    } catch (error) {
      console.error("Verify OTP Error:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.", { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true,
      });
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message, { duration: 5000 });
      onClose();
      router.push("/");
      window.location.reload(); // Reload the page after successful login
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.", { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-sans">
            {isOtpSent ? "Vérification OTP" : isSignUp ? "Inscrivez-vous en un clic !" : "Bienvenue !"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 font-sans tracking-wide">
          {!isOtpSent && (
            <>
              {/* Tabs for Sign Up and Sign In */}
              <div className="flex justify-center space-x-8 relative">
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`text-sm font-medium ${isSignUp ? "text-black" : "text-gray-500"}`}
                >
                  S'inscrire
                </button>
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`text-sm font-medium ${!isSignUp ? "text-black" : "text-gray-500"}`}
                >
                  Se connecter
                </button>
                <div
                  className={`absolute -bottom-1 h-0.5 bg-yellow-500 transition-all duration-300 ${
                    isSignUp ? "left-[calc(32%-60px)] w-[80px]" : "left-[calc(37%+20px)] w-[90px]"
                  }`}
                ></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-64 flex items-center justify-start gap-2 bg-blue-600 hover:bg-blue-700 hover:text-white font-sans text-white mx-auto"
                >
                  <Image src="/facebook.png" width={20} height={20} alt="facebook" className="w-5 h-5 ml-2" />
                  <span className="flex-grow text-center text-xs">
                    {isSignUp ? "S'inscrire avec Facebook" : "Se connecter avec Facebook"}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="w-64 flex items-center justify-start gap-2 hover:bg-gray-100 mx-auto"
                >
                  <Image src="/google-symbol.png" width={20} height={20} alt="google" className="w-5 h-5 ml-2" />
                  <span className="flex-grow text-center text-xs">
                    {isSignUp ? "S'inscrire avec Google" : "Se connecter avec Google"}
                  </span>
                </Button>
              </div>

              {/* Divider */}
              <div className="my-4 flex items-center justify-center space-x-4">
                <hr className="w-40 border-t-1 border-gray-300" />
                <span className="text-xs text-black">ou</span>
                <hr className="w-44 border-t-1 border-gray-300" />
              </div>
            </>
          )}

          {isSignUp ? (
            isOtpSent ? (
              <OtpVerificationForm
                otp={otp}
                setOtp={setOtp}
                handleVerifyOtp={handleVerifyOtp}
                isLoading={isLoading}
              />
            ) : (
              <SignUpForm
                formData={formData}
                setFormData={setFormData}
                handleSignUp={handleSignUp}
                isLoading={isLoading}
              />
            )
          ) : (
            <LoginForm
              formData={formData}
              setFormData={setFormData}
              handleLogin={handleLogin}
              isLoading={isLoading}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;