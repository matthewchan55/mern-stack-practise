import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // remove user from localstorage
    localStorage.removeItem("user");

    // dispatch: 'logout' action
    // no need payload (because no action in the AuthReducer (null))
    dispatch({ type: "LOGOUT" });
    // when we logout, we clear the global workouts state
    workoutsDispatch({type: "SET_WORKOUTS", payload: null})
  };

  return {logout}
};
