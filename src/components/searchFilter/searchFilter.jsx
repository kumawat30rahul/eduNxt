import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchFilter = ({ setTextSearch }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setTextSearch(newValue);
  };

  const handleClear = () => {
    setValue("");
    setTextSearch("");
  };
  return (
    <div className="relative">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
        <input
          type="text"
          placeholder="Search records..."
          value={value}
          className="w-full pl-10 pr-10 py-3 border text-black border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md placeholder:text-gray-400"
          onChange={handleChange}
        />

        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-150 group"
          >
            <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
