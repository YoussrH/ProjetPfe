"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner"; // Use sonner for notifications
import Image from "next/image";
import axios from "axios";

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and sign-in
  const [formData, setFormData] = useState({
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
    setIsOtpSent(false); // Reset OTP state
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(formData.email)) {
      toast.error("Veuillez entrer une adresse e-mail valide.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      toast.success(response.data.message); // Success toast
      setIsOtpSent(true); // Show OTP input after successful registration
    } catch (error) {
      toast.error(error.response?.data?.error || "Une erreur s'est produite. Veuillez réessayer."); // Error toast
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
      });
  
      // Display success message in French
      toast.success("OTP vérifié avec succès. Vous êtes maintenant connecté.");
  
      // Fetch and log user data
      await fetchUserData();
  
      // Close the modal
      onClose();
  
      // Optionally, reload the page or update the UI to reflect the logged-in state
      window.location.reload();
    } catch (error) {
      console.error("Verify OTP Error:", error); // Log the full error object
  
      // Handle specific error messages
      if (error.response?.status === 404) {
        toast.error("User not found.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid or expired OTP.");
      } else {
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message); // Success toast
  
      // Fetch and log user data
      await fetchUserData();
  
      // Close the modal
      onClose();
  
      // Optionally, reload the page or update the UI to reflect the logged-in state
      window.location.reload();
    } catch (error) {
      console.error("Login Error:", error); // Log the full error object
  
      // Handle specific error messages
      if (error.response?.status === 403) {
        toast.error(error.response?.data?.message || "You are already logged in.");
      } else if (error.response?.status === 404) {
        toast.error("User not found.");
      } else if (error.response?.status === 401) {
        toast.error("Invalid credentials.");
      } else {
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/user", {
        withCredentials: true, // Include session cookie
      });
      console.log("User Data:", response.data.user); // Log user data to the console
    } catch (error) {
      console.error("Error fetching user data:", error);
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
          {/* Hide Tabs and Social Buttons when OTP is shown */}
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

          {/* Sign Up / Sign In Form */}
          {isSignUp ? (
            <form className="space-y-4" onSubmit={isOtpSent ? handleVerifyOtp : handleSignUp}>
              {!isOtpSent ? (
                <>
                  {/* Sign-Up Form Fields */}
                  <div className="w-64 mx-auto">
                    <label className="block text-black font-medium mb-1 text-xs">
                      Nom <span className="text-yellow-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="nom"
                      placeholder="Nom"
                      className="w-full text-xs"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-64 mx-auto">
                    <label className="block text-black font-medium mb-1 text-xs">
                      Prénom <span className="text-yellow-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="prenom"
                      placeholder="Prénom"
                      className="w-full text-xs"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-64 mx-auto">
                    <label className="block text-black font-medium mb-1 text-xs">
                      Email <span className="text-yellow-500">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full text-xs"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-black text-center">
                    N'oubliez pas de valider votre adresse e-mail.
                  </p>
                  <div className="w-64 mx-auto">
                    <label className="block text-black font-medium mb-1 text-xs">
                      Mot de passe <span className="text-yellow-500">*</span>
                    </label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      className="w-full text-xs"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2 w-64 mx-auto">
                    <Checkbox
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, newsletter: checked })
                      }
                    />
                    <label htmlFor="newsletter" className="text-xs text-black">
                      Je m'inscris à la newsletter
                    </label>
                  </div>
                  <div className="w-64 mx-auto">
                    <Button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-yellow-500 hover:text-black text-xs"
                      disabled={isLoading}
                    >
                      {isLoading ? "Chargement..." : "S'inscrire"}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* OTP Verification Form */}
                  <div className="w-64 mx-auto">
                    <label className="block text-black font-medium mb-1 text-xs">
                      OTP <span className="text-yellow-500">*</span>
                    </label>
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className="w-64 mx-auto">
                    <Button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-yellow-500 hover:text-black text-xs"
                      disabled={isLoading}
                    >
                      {isLoading ? "Chargement..." : "Verify OTP"}
                    </Button>
                  </div>
                </>
              )}
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Login Form Fields */}
              <div className="w-64 mx-auto">
                <label className="block text-black font-medium mb-2 text-xs">
                  Email <span className="text-yellow-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full text-xs"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-64 mx-auto">
                <label className="block text-black font-medium mb-2 text-xs">
                  Mot de passe <span className="text-yellow-500">*</span>
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  className="w-full text-xs"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between w-64 mx-auto">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-xs text-black">
                    Rester connecté
                  </label>
                </div>
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="w-64 mx-auto">
                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-yellow-500 hover:text-black text-xs"
                  disabled={isLoading}
                >
                  {isLoading ? "Chargement..." : "Se connecter"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;