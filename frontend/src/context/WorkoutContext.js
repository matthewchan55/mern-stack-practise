import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
        return {
          workouts: state.workouts.filter((workout) => 
            workout._id !== action.payload._id)
        }
    default:
      return state;
  }
};


// children means whatever components being wrapped inside the WorkoutContextProvider (index.js)
// now <App/> is wrapped => children = <App/>
// which means all components now have the access to the WorkoutsContext
export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    workouts: null,
  });

  console.log(state)
  //state = {workouts: null} (initially nothing)
  //{ {state, dispatch} } => double bracket = an object
  return (
    <WorkoutsContext.Provider value={{...state, dispatch}}>
      {children}
    </WorkoutsContext.Provider>
  );
};

