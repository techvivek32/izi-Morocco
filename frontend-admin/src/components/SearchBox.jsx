import React, { useState, useEffect, useCallback } from "react";
import { cn } from "../lib/utils";

/**
 * SearchBox component with debouncing
 * @param {string} value - Controlled value
 * @param {function} onChange - Callback fired after debounce delay with search term
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500ms)
 * @param {string} placeholder - Input placeholder text
 * @param {string} className - Additional CSS classes
 */
const SearchBox = ({
  value = "",
  onChange,
  debounceMs = 500,
  placeholder = "Search...",
  className = "",
  disabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  // Sync internal state with external value prop
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Debounced onChange handler
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== value) {
        onChange?.(searchTerm);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, onChange, value]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onChange?.("");
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "block w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg",
            "focus:ring-2 focus:ring-accent focus:border-accent",
            "disabled:bg-gray-100 disabled:cursor-not-allowed",
            "transition-colors duration-200"
          )}
        />

        {/* Clear Button */}
        {searchTerm && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
