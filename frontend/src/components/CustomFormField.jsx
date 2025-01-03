import React from "react";

const CustomFormField = ({
  name,
  control,
  label,
  placeholder,
  fieldType,
  errorMessage,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-300 font-medium mb-2">
        {label}
      </label>

      <input
        id={name}
        type={fieldType}
        placeholder={placeholder}
        {...control.register(name)}
        className="w-full bg-gray-800 text-gray-200 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomFormField;
