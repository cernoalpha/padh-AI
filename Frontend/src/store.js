// store.js
import { createStore } from 'redux';

const SET_ASSIGNMENTS = 'SET_ASSIGNMENTS';

const setAssignments = (assignments) => ({
  type: SET_ASSIGNMENTS,
  payload: assignments,
});


const assignmentReducer = (state = { assignments: [] }, action) => {
  switch (action.type) {
    case SET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload,
      };
    default:
      return state;
  }
};


const store = createStore(assignmentReducer);

export { store, setAssignments };
