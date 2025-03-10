// components/PrefixCheckbox.js
import React from "react";

const PrefixCheckbox = ({ prefix, setFormData, formData }) => {
  return (
    <div className="w-64 mx-auto">
      <label className="block text-black font-medium mb-1 text-xs">
        Civilité <span className="text-yellow-500">*</span>
      </label>
      <div className="flex items-center space-x-4">
        {/* Checkbox for Madame */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="prefix"
            value="Madame"
            checked={formData.prefix === "Madame"}
            onChange={(e) =>
              setFormData({
                ...formData,
                prefix: e.target.checked ? "Madame" : "",
              })
            }
            className="form-checkbox h-4 w-4 text-black rounded-sm focus:ring-black focus:border-white"
          />
          <span className="text-xs text-black">Madame</span>
        </label>

        {/* Checkbox for Monsieur */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="prefix"
            value="Monsieur"
            checked={formData.prefix === "Monsieur"}
            onChange={(e) =>
              setFormData({
                ...formData,
                prefix: e.target.checked ? "Monsieur" : "",
              })
            }
            className="form-checkbox h-4 w-4 text-black rounded-sm focus:ring-black focus:border-white"
          />
          <span className="text-xs text-black">Monsieur</span>
        </label>

        {/* Checkbox for MLLE */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="prefix"
            value="MLLE"
            checked={formData.prefix === "MLLE"}
            onChange={(e) =>
              setFormData({
                ...formData,
                prefix: e.target.checked ? "MLLE" : "",
              })
            }
            className="form-checkbox h-4 w-4 text-black rounded-sm focus:ring-black focus:border-white"
          />
          <span className="text-xs text-black">MLLE</span>
        </label>
      </div>
    </div>
  );
};

export default PrefixCheckbox;