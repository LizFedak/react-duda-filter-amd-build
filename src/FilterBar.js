import React from 'react';

function SearchBar({ options, onSearch }) {
    return (
      <div className="w-full">
        <input className="border-black border-2 border-solid rounded px-2 py-2 w-full"
          type="text"
          placeholder="Search..."
          onChange={e => onSearch(e.target.value)}
        />
      </div>
    );
  }
  

  function MultipleSelect({ filter, searchTerm, handleSearch, selectedOptions, isOpen, toggleItem }) {
    const filteredOptions = filter.options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    let options = filteredOptions.map((option, index) => (
      <MultipleSelectOption
        key={`${option}-${index}`}
        index={index}
        option={option}
        filterId={filter.id}
        selectedOptions={selectedOptions}
        handleSearch={handleSearch}
      />
    ));
    const selectedCount = selectedOptions[filter.id].length;
    return (
      <div className="w-64 text-center relative">
        <h3 className="rounded bg-gray-900 text-white px-5 py-2 w-full"  onClick={toggleItem}>{filter.label} {selectedCount > 0 && `(${selectedCount})`}</h3>
        {isOpen && (
          <div className="bg-white shadow-md shadow-slate-300 absolute w-full p-2 rounded-sm">
            <SearchBar options={filter.options} onSearch={term => handleSearch(filter.id, term)} />
            <ul className="flex flex-col p-1 h-64 w-full overflow-auto">{options}</ul>
          </div>
        )}
      </div>
    );
  }
  
  
  function MultipleSelectOption({ option, index, filterId, selectedOptions, handleSearch }) {
    const id = `option${index}`;
    const isSelected = selectedOptions[filterId].includes(option);
  
    const handleChange = () => {
      const updatedSelectedOptions = isSelected
        ? selectedOptions[filterId].filter(selectedOption => selectedOption !== option)
        : [...selectedOptions[filterId], option];
      handleSearch(filterId, '', updatedSelectedOptions);
    };
  
    return (
      <div className="relative flex items-start text-left">
        <div className="flex h-6 items-center">
          <input
            id={id}
            aria-describedby={option}
            name={id}
            type="checkbox"
            checked={isSelected}
            onChange={handleChange}
            className="h-4 w-4 rounded focus:outline-slate-700 focus:outline-offset-2 checked:bg-slate-700 focus-active:bg-slate-700 accent-slate-700 focus:bg-slate-700 accent-color-slate-700 color-slate-700"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor={id} className="font-medium">
            {option}
          </label>
        </div>
      </div>
    );
  }
  
 
  export default function Filterbar({ filters }) {
    
  const [filterOpenStates, setFilterOpenStates] = React.useState(
      filters.reduce((acc, filter) => ({ ...acc, [filter.id]: false }), {})
    );
  
    const [currentOpenFilter, setCurrentOpenFilter] = React.useState(null); // New state
  
    
    const [searchTerms, setSearchTerms] = React.useState(
      filters.reduce((acc, filter) => {
        if (filter.type === 'MultipleSelect') {
          return { ...acc, [filter.id]: '' };
        }
        return acc;
      }, {})
    );
  
    const [selectedOptions, setSelectedOptions] = React.useState(
      filters.reduce((acc, filter) => {
        if (filter.type === 'MultipleSelect') {
          return { ...acc, [filter.id]: [] };
        }
        return acc;
      }, {})
    );
  
  
    const handleSearch = (filterId, term, updatedSelectedOptions = null) => {
      const newSelectedOptions = updatedSelectedOptions !== null ? updatedSelectedOptions : selectedOptions[filterId];
      setSearchTerms(prevSearchTerms => ({
        ...prevSearchTerms,
        [filterId]: term,
      }));
      setSelectedOptions(prevSelectedOptions => ({
        ...prevSelectedOptions,
        [filterId]: newSelectedOptions,
      }));
    };
  
  
  
    const toggleFilterOpen = (filterId) => {
      // If the clicked filter is not open, close the previously open filter
      if (currentOpenFilter && currentOpenFilter !== filterId) {
        setFilterOpenStates((prevOpenStates) => ({
          ...prevOpenStates,
          [currentOpenFilter]: false,
          [filterId]: !prevOpenStates[filterId],
        }));
        setCurrentOpenFilter(filterId);
      } else {
        setFilterOpenStates((prevOpenStates) => ({
          ...prevOpenStates,
          [filterId]: !prevOpenStates[filterId],
        }));
        setCurrentOpenFilter(filterOpenStates[filterId] ? null : filterId);
      }
    };
  
    let renderedFilters = filters.map((filter, index) => {
      if (filter.type === 'MultipleSelect') {
        return (
          <div key={index} className="">
            <MultipleSelect
              filter={filter}
              searchTerm={searchTerms[filter.id]}
              handleSearch={handleSearch}
              selectedOptions={selectedOptions}
              isOpen={filterOpenStates[filter.id]} // Pass the open state here
              toggleItem={() => toggleFilterOpen(filter.id)}
            />
          </div>
        );
      }
      return null;
    });
  
    return (
      <fieldset>
        <legend className="sr-only">Filters</legend>
        <div className="flex flex-row gap-5">{renderedFilters}</div>
      </fieldset>
    );
  }
  