import { useState } from "react";
import { useWorkoutsContext } from "../hook/useWorkoutContext";
import { useAuthContext } from '../hook/useAuthContext'

const WorkoutForm = () => {
  const [workout, setWorkout] = useState({ title: "", load: "", reps: "" });
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  
  const validateForm = async (e) => {
    e.preventDefault();

    if(!user){
      setError('You must be logged in')
      return
    }

    //if need to add an item -> go to /api/workouts -> then use the POST method (=createWorkout())
    const resp = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(workout),
    });

    const respData = await resp.json();

    //respData is returned with the emptyFields array
    if (!resp.ok) {
      setError(respData.error);
      setEmptyFields(respData.emptyFields);
    }

    if (resp.ok) {
      setWorkout({ ...workout, title: "", load: "", reps: "" });
      setError(null);
      setEmptyFields([]);
      console.log("New workout added", respData);
      dispatch({ type: "CREATE_WORKOUT", payload: respData });
    }
  };

  return (
    <form className="create" onSubmit={validateForm}>
      <h3>Add a New Workout</h3>
      <div
        className={
          emptyFields.includes("Title") ? "input-group required" : "input-group"
        }
      >
        <label htmlFor="title">Exercise Title: </label>
        <input
          type="text"
          onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
          value={workout.title}
        />
        <span>'Title' is required</span>
      </div>

      <div
        className={
          emptyFields.includes("Load") ? "input-group required" : "input-group"
        }
      >
        <label htmlFor="load">Load (in kg): </label>
        <input
          type="number"
          onChange={(e) => setWorkout({ ...workout, load: e.target.value })}
          value={workout.load}
        />
        <span>'Load' is required</span>
      </div>

      <div
        className={
          emptyFields.includes("Reps") ? "input-group required" : "input-group"
        }
      >
        <label htmlFor="reps">Reps: </label>
        <input
          type="number"
          onChange={(e) => setWorkout({ ...workout, reps: e.target.value })}
          value={workout.reps}
        />
        <span>'Reps' is required</span>
      </div>

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
