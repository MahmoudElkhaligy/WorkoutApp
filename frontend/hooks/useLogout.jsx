import { useAuthContext } from "./useAuthContext";
import {useWorkoutContext} from "../hooks/useWorkoutContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutesDispatch } = useWorkoutContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    workoutesDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
