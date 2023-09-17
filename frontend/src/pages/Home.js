import { useEffect } from "react";
import { useWorkoutsContext } from "../hook/useWorkoutContext";
import { useAuthContext } from "../hook/useAuthContext";
//component
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";


const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  // useState vs useReducer
  // e.g. fetchWorkout -> workouts (in workoutcontext) is set
  // -> pass to home.js as workout and can be used here
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  // fire it once, dependency array 
  useEffect(() => {
    const fetchWorkouts = async () => {
      // path for fetching all workouts
      const resp = await fetch("/api/workouts", {
        headers: {
          // authorization token = "Bearer xxxxx...."
          'Authorization': `Bearer ${user.token}`
        }
      });
      const respData = await resp.json();

      if (resp.ok) {
        //setWorkouts(respData);
        dispatch({ type: "SET_WORKOUTS", payload: respData });
      }
    };
    // used user -> add in dependency array
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {/* if have workouts then display */}
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <div className="workoutForm">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
