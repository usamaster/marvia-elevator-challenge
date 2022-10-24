import React from "react";
import "../elevator.css";
import ButtonPanel from "./ButtonPanel";
import { ChevronDown, ChevronUp } from "../icons";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addDownCall, addUpCall } from "../features/elevator/elevatorSlice";

interface floor {
  level: number;
  active: boolean;
}

const Floor = ({ level, active }: floor) => {
  const { upCalls, downCalls } = useAppSelector((state) => state.elevator);
  const dispatch = useAppDispatch();

  const UpButton = () => {
    return (
      <>
        {upCalls.indexOf(level) !== -1 ? (
          <div className="chevron c-active">
            <ChevronUp />
          </div>
        ) : (
          <div className="chevron" onClick={() => dispatch(addUpCall(level))}>
            <ChevronUp />
          </div>
        )}
      </>
    );
  };
  const DownButton = () => {
    return (
      <>
        {downCalls.indexOf(level) !== -1 ? (
          <div className="chevron c-active">
            <ChevronDown />
          </div>
        ) : (
          <div className="chevron" onClick={() => dispatch(addDownCall(level))}>
            <ChevronDown />
          </div>
        )}
      </>
    );
  };
  return (
    <div>
      {active ? (
        <div className="floor-container">
          <div className="chevron-panel">
            <UpButton />
            <div className="chevron">
              <DownButton />
            </div>
          </div>
          <div className="floor active">{level}</div>
          <ButtonPanel />
        </div>
      ) : (
        <div className="floor-container">
          <div className="chevron-panel">
            <UpButton />
            <div className="chevron">
              <DownButton />
            </div>
          </div>
          <div className="floor">{level}</div>
        </div>
      )}
    </div>
  );
};

export default Floor;
