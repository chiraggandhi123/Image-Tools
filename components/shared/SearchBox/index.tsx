// src/SearchBox.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchBoxProps {
    query:string,
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({query:initialText ,onSearch }) => {
  const [query, setQuery] = useState<string>(initialText);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center my-5">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="px-4 py-2 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 w-64"
      />
      <button
        type="submit"
        className="px-4 py-2 text-lg border border-blue-500 bg-blue-500 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
