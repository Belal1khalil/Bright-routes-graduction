import { useEffect } from "react";
import PropTypes from "prop-types";
import usePhoneValidation from "../hooks/usePhoneValidation";

/**
 * A reusable phone input component with Egyptian phone number validation
 */
export default function PhoneInput({
  value,
  onChange,
  onBlur,
  name = "mobile",
  id = "mobile",
  label = "Phone Number",
  required = false,
  placeholder = "Enter your phone number (e.g., 01xxxxxxxxx)",
  className = "",
  disabled = false,
  error = "",
}) {
  // Use the validation hook
  const phoneValidation = usePhoneValidation(value, required);

  useEffect(() => {
    // Update the internal value when the external value changes
    if (value !== phoneValidation.value) {
      phoneValidation.reset(value || "");
    }
  }, [value]);

  const handleChange = (e) => {
    // Use the hook's change handler
    phoneValidation.handleChange(e);

    // Pass the value to parent component
    if (onChange) {
      onChange({
        target: {
          name,
          value: e.target.value,
        },
      });
    }
  };

  const handleBlur = (e) => {
    // Use the hook's blur handler
    phoneValidation.handleBlur();

    // Call external onBlur if provided
    if (onBlur) {
      onBlur(e);
    }
  };

  // Use external error if provided, otherwise use hook's validation
  const displayError = error || phoneValidation.error;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type="tel"
        name={name}
        placeholder={placeholder}
        value={phoneValidation.value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        className={`w-full px-3 py-2 border ${
          displayError ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      />
      {displayError && (
        <p className="text-sm text-red-500 font-medium mt-1">
          * {displayError}
        </p>
      )}
    </div>
  );
}

PhoneInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};
