import React from "react";

const CustomFormField = ({
  name,
  control,
  label,
  placeholder,
  fieldType,
  errorMessage, // Add errorMessage prop
}) => {
  return (
    <div className="mb-4">
      {/* Label for the input field */}
      <label htmlFor={name} className="block text-gray-300 font-medium mb-2">
        {label}
      </label>

      {/* Input field with consistent styling */}
      <input
        id={name}
        type={fieldType}
        placeholder={placeholder}
        {...control.register(name)} // Registering the input with react-hook-form
        className="w-full bg-gray-800 text-gray-200 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Conditionally render error message if exists */}
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomFormField;
