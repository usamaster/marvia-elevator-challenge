import React from "react";
import "./elevator.css";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  elevatorUp,
  elevatorDown,
  toggleIsMoving,
  calculateRoute,
  arrived,
  addDestination,
} from "./features/elevator/elevatorSlice";
import Floor from "./components/Floor";

const App = () => {
  const {
    floors,
    route,
    currentFloor,
    isMoving,
    destinations,
    upCalls,
    downCalls,
  } = useAppSelector((state) => state.elevator);

  const dispatch = useAppDispatch();
  const moveElevatorUp = async () => {
    await delay(1000);
    dispatch(elevatorUp(0));
    dispatch(toggleIsMoving(false));
  };

  const moveElevatorDown = async () => {
    await delay(1000);
    dispatch(elevatorDown(0));
    dispatch(toggleIsMoving(false));
  };

  function delay(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  if (destinations.length > 0 && route.length === 0) {
    dispatch(calculateRoute(0));
  }

  if (route[0] > currentFloor && !isMoving) {
    dispatch(toggleIsMoving(true));
    moveElevatorUp();
  }
  if (route[0] < currentFloor && !isMoving) {
    dispatch(toggleIsMoving(true));
    moveElevatorDown();
  }
  if (destinations.indexOf(currentFloor) !== -1) {
    dispatch(arrived(0));
    dispatch(calculateRoute(0));
  }
  return (
    <div className="nav-center">
      <div className="elevator">
        {floors.map((floor: any) => {
          return (
            <Floor
              key={floor.level}
              level={floor.level}
              active={floor.active}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
