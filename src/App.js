import React from 'react';
import List from './List'
import FilterBar from './FilterBar'
import './App.css';


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


  let newfilters = filters.map(filter => {
    filter.options = list.map(item => item[filter.connectedDataField])
    filter.id = nextid()
    return filter
  })

  return (
    <div className="App">
      <header className="App-header">
        <img alt="logo" className="h-full w-64" src="https://irp.cdn-website.com/md/pexels/dms3rep/multi/roof-plate-tiles-brick-black-48895.jpeg"></img>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="uppercase text-sky-400"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

        </a>
        <List list={list}/>
        <FilterBar filters={newfilters} list={list}/>
      </header>
    </div>
  );
}

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

export default App;
