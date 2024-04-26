"use client";
import { ChangeEvent } from "react";
import { CardGrid } from "@/components/dashboard/Recent/CardGrid";
import FilterDropdown from "@/components/dashboard/Recent/FilterDropdown";
import SortDropdown from "@/components/dashboard/Recent/SortDropdown";

export default function Page() {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    console.log("Function not implemented.");
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center text-gray-800">
      <div className="w-full px-6 pt-10 pb-5 border-b border-gray-200 flex flex-col justify-start">
        <h1 className="text-xl font-bold">Recents</h1>
      </div>
      <div className="w-full p-4">
        <div className="flex w-full p-2 pb-4 items-center justify-end space-x-4">
          <FilterDropdown onChange={handleChange} />
          <SortDropdown onChange={handleChange} />
        </div>
        <CardGrid />
      </div>
    </div>
  );
}
