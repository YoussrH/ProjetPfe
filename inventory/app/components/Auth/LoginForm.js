// components/LoginForm.js
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const LoginForm = ({ formData, setFormData, handleLogin, isLoading }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
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
  );
};

export default LoginForm;