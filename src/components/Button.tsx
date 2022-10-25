import React from "react";
import { addDestination } from "../features/elevator/elevatorSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

interface floor {
  level: number;
}

const Button = ({ level }: floor) => {
  const dispatch = useAppDispatch();
  const { currentFloor, destinations } = useAppSelector(
    (state) => state.elevator
  );

  const moveElevator = async () => {
    if (currentFloor !== level) {
      dispatch(addDestination(level));
    }
  };

  return (
    <div>
      {destinations.indexOf(level) !== -1 ? (
        <div className="button active">{level}</div>
      ) : (
        <div
          className="button"
          onClick={() => {
            moveElevator();
          }}
        >
          {level}
        </div>
      )}
    </div>
  );
};

export default Button;
