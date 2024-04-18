import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";

// Define the type for the selections state
type SelectionsType = {
  [key: string]: boolean;
};

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null); // Use generic type for DOM element reference
  const [selections, setSelections] = useState<SelectionsType>({
    "Food insecurity": false,
    VideoQA: false,
    "Video summarization": false,
  });

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
        className="text-black w-full px-4 py-2 text-left bg-white border border-black rounded-lg shadow flex items-center justify-between focus:outline-none focus:ring-2 ring-black focus:border-transparent"
      >
        Select a folder that you want
        {isOpen ? (
          <ChevronUpIcon className="w-6 h-6" />
        ) : (
          <ChevronDownIcon className="w-6 h-6" />
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
                  className="flex items-center hover:bg-gray-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={folderName}
                    name={folderName}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4"
                    onClick={(e) => e.stopPropagation()} // Stop propagation to prevent li's onClick when clicking the checkbox directly
                  />
                  <label htmlFor={folderName} className="ml-2 block text-black">
                    {folderName}
                  </label>
                </li>
              ))}
            </ul>
            <InputGroup color="black">
              <InputLeftElement pointerEvents="none">
                <PlusIcon className="h-5 w-5" />
              </InputLeftElement>
              <Input placeholder="Add a new folder" />
            </InputGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
