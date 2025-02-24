import { useState } from 'react';

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="border p-2 rounded w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? options.find((option) => option.value === value)?.label : placeholder}
      </div>
      {isOpen && (
        <div
          className="relative z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-32 overflow-y-auto"
          style={{ maxHeight: '120px' }} // Adjust height as needed
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;