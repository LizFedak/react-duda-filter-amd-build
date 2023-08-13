import React, {useState} from 'react';


  

  function MultipleSelect({ filter,isOpen, handleButtonClick, nextid }) {

    let options = filter.options.map((option, index) => (
      <MultipleSelectOption
        key={`${option}-${index}`}
        index={index}
        option={option}
        handleButtonClick={handleButtonClick}
        nextid={nextid}
        filterparent={filter.connectedDataField}
      />
    ));
    return (
      <div className="w-64 text-center relative">
        <h3 className="rounded bg-gray-900 text-white px-5 py-2 w-full">{filter.label}</h3>
        {isOpen && (
          <div className="bg-white shadow-md shadow-slate-300 w-full p-2 rounded-sm">
            <ul className="flex flex-col p-1 h-64 w-full overflow-auto">{options}</ul>
          </div>
        )}
      </div>
    );
  }
  
  function MultipleSelectOption({ option, handleButtonClick, nextid, filterparent }) {
    let id = nextid()
    const handleChange = e => {
      const actiontype = e.target.checked ? 'addms' : 'removems';
      const option = e.target.dataset.option;
      const filterparent = e.target.dataset.filterparent;
      console.log(36, actiontype, option, filterparent)
      handleButtonClick(option, actiontype, filterparent); // Pass both the option and type
    };
    const handleCheckboxClick = (event) => {
      console.log('stop prop', event)
      event.stopPropagation();
    }
    return (
      <div className="relative flex items-start text-left">
        <div className="flex h-6 items-center">
          <input
            data-filterparent={filterparent}
            data-option={option}
            id={id}
            aria-describedby={option}
            name={id}
            type="checkbox"
            className="h-4 w-4 rounded focus:outline-slate-700 focus:outline-offset-2 checked:bg-slate-700 focus-active:bg-slate-700 accent-slate-700 focus:bg-slate-700 accent-color-slate-700 color-slate-700"
            
            onChange={handleChange}
            onClick={handleCheckboxClick}
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
  
  




export default function Filterbar({ filters, handleButtonClick, nextid}) {

  
    let renderedFilters = filters.map((filter, index) => {
      if (filter.type === 'MultipleSelect') {
        return (
          <div key={index} className="">
            <MultipleSelect
              filter={filter}
              isOpen={true} // Pass the open state here
              // toggleItem={() => toggleFilterOpen(filter.id)}
              nextid={nextid}
              handleButtonClick={handleButtonClick}
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
  