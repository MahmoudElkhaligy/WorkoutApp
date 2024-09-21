import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      }
    );

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: workout });
    }

    if (!response.ok) {
      console.error("Failed to delete workout.");
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load kg: </strong>
        {workout.load}
      </p>
      <p>
        <strong>Repetion: </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Created At: </strong>
        {new Date(workout.createdAt).toLocaleDateString()}
      </p>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

export default WorkoutDetails;
