import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

// user = email + token  (returned by userController -> useSignup -> here)
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });


  // check if the token exists, if it does that means user technically not logged out
  // only fires once when the componenet very first renders
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user){
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [])


  console.log('AuthContext state: ', state)

  // ...state because we may add more properties
  // {user: null, xxx:null....}
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
  )
};
