import { useState } from "react";

/**
 * Custom hook for Egyptian phone number validation
 * @param {string} initialValue - Initial phone number value
 * @param {boolean} required - Whether the phone number is required
 * @returns {Object} An object containing phone validation state and methods
 */
export default function usePhoneValidation(
  initialValue = "",
  required = false
) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  // Egyptian phone number validation regex
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  /**
   * Validates a given phone number value
   * @param {string} phoneNumber - The phone number to validate
   * @returns {boolean} Whether the phone number is valid
   */
  const validate = (phoneNumber) => {
    if (!phoneNumber && required) {
      setError("Phone number is required");
      return false;
    } else if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      setError("Sorry, We Accept Egyptian Phone Numbers Only");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  /**
   * Handles phone input change
   * @param {Event|string} e - The change event or string value
   */
  const handleChange = (e) => {
    const newValue = typeof e === "string" ? e : e.target.value;
    setValue(newValue);

    if (touched) {
      validate(newValue);
    }
  };

  /**
   * Handles input blur event
   */
  const handleBlur = () => {
    setTouched(true);
    validate(value);
  };

  /**
   * Resets the phone validation state
   * @param {string} newValue - Optional new value to set
   */
  const reset = (newValue = "") => {
    setValue(newValue);
    setError("");
    setTouched(false);
  };

  return {
    value,
    error,
    touched,
    isValid: !error,
    handleChange,
    handleBlur,
    validate,
    reset,
  };
}
