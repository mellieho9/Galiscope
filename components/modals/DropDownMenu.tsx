import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

// Define the type for the selections state
type SelectionsType = {
  [key: string]: boolean;
};

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null); // Use generic type for DOM element reference
  const [selections, setSelections] = useState<SelectionsType>({
    "Food insecurity": false,
    VideoQA: false,
    "Video summarization": false,
  });

  const handleAddSelection = (newSelection: string) => {
    if (!selections[newSelection]) {
      setSelections((prevSelections) => ({
        ...prevSelections,
        [newSelection]: false,
      }));
    }
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && inputValue.trim()) {
      handleAddSelection(inputValue);
      setInputValue("");
    }
  }

  useEffect(() => {
    // Define the event handler with the correct type
    const handleClickOutside = (event: MouseEvent) => {
      // Check if dropdownRef.current exists and does not contain the event target
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setSelections((prevSelections) => ({
      ...prevSelections,
      [name]: !prevSelections[name],
    }));
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className="text-gray-500 w-full px-4 py-2 text-left bg-white border border-gray-500 rounded-lg shadow flex items-center justify-between focus:outline-none focus:ring-2 ring-gray-500 focus:border-transparent"
      >
        Select a folder that you want
        {isOpen ? (
          <ChevronUpIcon className="w-4 h-4" />
        ) : (
          <ChevronDownIcon className="w-4 h-4" />
        )}
      </button>
      {isOpen && (
        <div className="absolute bg-white border border-black rounded-lg shadow w-full z-10">
          <div className="flex flex-col p-3 mb-5 gap-3">
            <ul role="menu">
              {Object.keys(selections).map((folderName) => (
                <li
                  role="menuitem"
                  key={folderName}
                  className="flex items-center p-1 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={folderName}
                    name={folderName}
                    onChange={handleCheckboxChange}
                    className="form-checkbox  h-4 w-4"
                    onClick={(e) => e.stopPropagation()} // Stop propagation to prevent li's onClick when clicking the checkbox directly
                  />
                  <label
                    htmlFor={folderName}
                    className="ml-2 block text-gray-800"
                  >
                    {folderName}
                  </label>
                </li>
              ))}
            </ul>
            <div className="flex flex-row items-center mt-2 py-2 cursor-pointer">
              <PlusIcon className="w-4 h-4 mr-4 text-teal" />
              <input
                type="text"
                placeholder="Add new folder"
                className="text-sm text-gray-800 font-normal bg-transparent border-none focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
