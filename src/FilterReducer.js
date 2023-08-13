export default function FilterReducer(state, action) {
    switch (action.type) {
      case "addms": {
        const newSelectedOptions = {
          ...state,
          [action.filterparent]: [...(state[action.filterparent] || []), action.option]
        };
        
        return newSelectedOptions;
      }
      case "removems": {
        const newSelectedOptions = {
          ...state,
          [action.filterparent]: (state[action.filterparent] || []).filter(option => option !== action.option)
        };
        
        return newSelectedOptions;
      }
      default: {
        throw new Error('Unknown action type: ' + action.type);
      }
    }
  }
  
