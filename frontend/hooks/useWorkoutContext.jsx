import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error(
      "useWrokoutContext must be used inside an WorksContextProvider"
    );
  }

  return context;
};
