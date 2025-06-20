const SearchFilter = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        onChange={(e) => {
          // Handle search logic here
          console.log("Search query:", e.target.value);
        }}
      />
    </div>
  );
};

export default SearchFilter;
