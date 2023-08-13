import React, {useState, useReducer, useEffect} from 'react';
import List from './List'
import FilterBar from './FilterBar'
import './App.css';
import FilterReducer from './FilterReducer'


App.defaultProps = {
  bw: false,
  userName: 'Default User',
  theme: 'default-theme',
  type: 'default-type',
  backToList: 'Back to Default List',
  list: [{name:'Honda Accord 1991', "valueConnector1":"Honda", "valueConnector2":"Accord", "valueConnector3":"1991"},
  {name:'Subaru Crosstrek 2020', "valueConnector1":"Subaru", "valueConnector2":"Crosstrek", "valueConnector3":"2020"}],
  filters: [{label: 'Makes', type: 'MultipleSelect', connectedDataField: 'valueConnector1'},
  {label: 'Models', type: 'MultipleSelect', connectedDataField: 'valueConnector2'},
  {label: 'Year', type: 'MultipleSelect', connectedDataField: 'valueConnector3'}]
};

function filterItems(items, query) {
  query = query.toLowerCase();
  return items.filter(item =>
    item.name.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
  );
}


const createIdGenerator = () => {
  let counter = 0;
  const nextid = () => {
    counter++;
    return counter;
  };
  return nextid;
};


const nextid = createIdGenerator();






function App(props) {

  const { list, filters } = props;

  const newfilters = filters.map(filter => {
    filter.options = list.map(item => item[filter.connectedDataField])
    filter.id = nextid()
    filter.selected = [];
    return filter
  })
  const initialState = filters.reduce((acc, filter) => {
    acc[filter.connectedDataField] = [];
    return acc;
  }, {});

  const [state, dispatch] = useReducer(FilterReducer, initialState);
  const [filteredData, setFilteredData] = useState(list);

  function handleButtonClick(option, actiontype, filterparent) {
    dispatch({ type: actiontype, option:option, filterparent:filterparent });
  }

  useEffect(() => {
    const newFilteredData = list.filter(item => {
      // Check if every filter connector's array is empty or the item's connector is included in the selected options
      return Object.keys(state).every(filterConnector => {
        if (state[filterConnector].length === 0) {
          return true;
        } else if (state[filterConnector].length > 0 && state[filterConnector].includes(item[filterConnector])) {
          return true;
        } else {
          return false;
        }
      });
    });

    // Update the filteredData state after filtering
    setFilteredData(newFilteredData);
  }, [state, list]);

  


  return (
    <div className="App">
      <header className="App-header">
        <img alt="logo" className="h-full w-64" src="https://irp.cdn-website.com/530aeed4/dms3rep/multi/82708474-01.jpg"></img>
        
        
        <FilterBar handleButtonClick={handleButtonClick} filters={newfilters} list={filteredData} nextid={nextid}/>
        <List list={filteredData} nextid={nextid}/>      
      </header>
    </div>
  );
}



export default App;
