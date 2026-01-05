import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../slices/tagSlice";

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3 w-3"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const HashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3 w-3"
  >
    <line x1="4" x2="20" y1="9" y2="9" />
    <line x1="4" x2="20" y1="15" y2="15" />
    <line x1="10" x2="8" y1="3" y2="21" />
    <line x1="16" x2="14" y1="3" y2="21" />
  </svg>
);

export const CategoryMultiSelect = ({
  labelName,
  required = false,
  selectedCategories = [],
  onChange,
}) => {
  const dispatch = useDispatch();
  const { getTagsApi } = useSelector((state) => state.tag);
  const { data, isLoading } = getTagsApi;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch tags on component mount
  useEffect(() => {
    dispatch(getTags({ page: 1, limit: 100 }));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get all tags from API response
  const ALL_CATEGORIES = data?.response?.docs || [];

  const filteredCategories = ALL_CATEGORIES.filter(
    (category) =>
      !selectedCategories.some((selected) => selected._id === category._id) &&
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategory = (category) => {
    const isSelected = selectedCategories.some((c) => c._id === category._id);
    const newSelectedCategories = isSelected
      ? selectedCategories.filter((c) => c._id !== category._id)
      : [...selectedCategories, category];

    onChange?.(newSelectedCategories);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const removeCategory = (category) => {
    onChange?.(selectedCategories.filter((c) => c._id !== category._id));
  };
  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      searchTerm === "" &&
      selectedCategories.length > 0
    ) {
      removeCategory(selectedCategories[selectedCategories.length - 1]);
    }
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredCategories.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(
          (prev) =>
            (prev - 1 + filteredCategories.length) % filteredCategories.length
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredCategories[highlightedIndex]) {
          toggleCategory(filteredCategories[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen, searchTerm]);
  return (
    <div className="w-full mx-auto" ref={wrapperRef}>
      <div className="relative">
        <label
          htmlFor={labelName}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
          {required && <span className="text-red-600"> *</span>}
        </label>
        <div
          className="mt-1 flex flex-wrap items-center gap-2 p-2 min-h-[40px] text-sm outline-transparent hover:outline hover:outline-accent focus:outline focus:outline-accent bg-white rounded-md shadow-sm cursor-text transition-colors"
          onClick={() => {
            setIsOpen(true);
            inputRef.current?.focus();
          }}
        >
          {selectedCategories.map((category) => (
            <div
              key={category._id}
              className="flex items-center gap-1.5 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 font-medium px-2 py-1 rounded-md border border-slate-200 "
            >
              {category.icon && (
                <span className="text-sm">{category.icon}</span>
              )}
              <HashIcon />
              {category.name}
              {category.count !== undefined && (
                <span className="text-xs bg-slate-300  px-1.5 py-0.5 rounded-full">
                  {category.count}
                </span>
              )}
              <button
                type="button"
                className="text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-200  p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400  focus:ring-offset-1"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCategory(category);
                }}
              >
                <XIcon />
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedCategories.length === 0 ? "Select categories..." : ""
            }
            className="flex-grow bg-transparent border-none outline-none text-slate-900 placeholder-slate-400  text-sm p-0"
          />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 border border-slate-200 bg-white  rounded-md shadow-lg max-h-60 overflow-y-auto animate-popover-in">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                Loading tags...
              </div>
            ) : filteredCategories.length > 0 ? (
              <ul className="p-1">
                {filteredCategories.map((category, index) => (
                  <li
                    key={category._id}
                    className={`flex items-center justify-between p-3 cursor-pointer rounded-md transition-colors duration-150 ${
                      highlightedIndex === index
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                    onClick={() => toggleCategory(category)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <div className="flex items-center gap-3">
                      {category.icon && (
                        <span className="text-lg">{category.icon}</span>
                      )}
                      <HashIcon />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{category.name}</span>
                          {category.count !== undefined && (
                            <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">
                              {category.count}
                            </span>
                          )}
                        </div>
                        {category.description && (
                          <span className="text-xs text-slate-500">
                            {category.description}
                          </span>
                        )}
                      </div>
                    </div>
                    {selectedCategories.some((c) => c._id === category._id) && (
                      <CheckIcon />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-slate-500">
                {searchTerm ? "No tags found." : "No tags available."}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
