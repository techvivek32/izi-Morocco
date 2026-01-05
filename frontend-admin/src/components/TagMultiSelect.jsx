import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../slices/tagSlice";
import { cn } from "../lib/utils";

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

/**
 * TagMultiSelect component with API integration
 * @param {Array} selectedTags - Array of selected tag objects
 * @param {Function} onChange - Callback fired when tags change, receives array of tag objects
 * @param {string} placeholder - Input placeholder text
 * @param {string} className - Additional CSS classes
 */
const TagMultiSelect = ({
  selectedTags = [],
  onChange,
  placeholder = "Select tags...",
  className = "",
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

  // Close dropdown when clicking outside
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
  const allTags = data?.response?.docs || [];

  // Filter tags based on search and exclude already selected
  const filteredTags = allTags.filter(
    (tag) =>
      !selectedTags.some((selected) => selected._id === tag._id) &&
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTag = (tag) => {
    const isSelected = selectedTags.some((t) => t._id === tag._id);
    const newSelectedTags = isSelected
      ? selectedTags.filter((t) => t._id !== tag._id)
      : [...selectedTags, tag];

    onChange?.(newSelectedTags);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const removeTag = (tag) => {
    onChange?.(selectedTags.filter((t) => t._id !== tag._id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && searchTerm === "" && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1]);
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
        setHighlightedIndex((prev) => (prev + 1) % filteredTags.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev - 1 + filteredTags.length) % filteredTags.length
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredTags[highlightedIndex]) {
          toggleTag(filteredTags[highlightedIndex]);
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
    <div className={cn("w-full", className)} ref={wrapperRef}>
      <div className="relative">
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 p-2 h-full max-h-10 text-sm",
            "bg-white rounded-lg border border-gray-300",
            "hover:border-accent focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20",
            "cursor-text transition-all duration-200"
          )}
          onClick={() => {
            setIsOpen(true);
            inputRef.current?.focus();
          }}
        >
          {selectedTags.map((tag) => (
            <div
              key={tag._id}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-medium px-2.5 py-1 rounded-md border border-blue-300"
            >
              <HashIcon />
              <span className="text-sm">{tag.name}</span>
              {tag.count !== undefined && (
                <span className="text-xs bg-blue-300 px-1.5 py-0.5 rounded-full">
                  {tag.count}
                </span>
              )}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-900 rounded-full hover:bg-blue-300 p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
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
            placeholder={selectedTags.length === 0 ? placeholder : ""}
            className="flex-grow bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-sm p-0 min-w-[120px]"
          />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 border border-gray-200 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                Loading tags...
              </div>
            ) : filteredTags.length > 0 ? (
              <ul className="p-1">
                {filteredTags.map((tag, index) => (
                  <li
                    key={tag._id}
                    className={cn(
                      "flex items-center justify-between p-3 cursor-pointer rounded-md transition-colors duration-150",
                      highlightedIndex === index
                        ? "bg-accent/10 text-accent"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => toggleTag(tag)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <div className="flex items-center gap-3">
                      <HashIcon />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{tag.name}</span>
                          {tag.count !== undefined && (
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                              {tag.count}
                            </span>
                          )}
                        </div>
                        {tag.description && (
                          <span className="text-xs text-gray-500">
                            {tag.description}
                          </span>
                        )}
                      </div>
                    </div>
                    {selectedTags.some((t) => t._id === tag._id) && (
                      <CheckIcon />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500">
                {searchTerm ? "No tags found." : "No tags available."}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagMultiSelect;
