import React from "react";
import { useAppSelector } from "../app/hooks";
import Button from "./Button";

const ButtonPanel = () => {
  const { floors } = useAppSelector((state) => state.elevator);
  return (
    <div className="buttonPanel">
      {floors.map((floor: any) => {
        return <Button key={floor.level} level={floor.level} />;
      })}
    </div>
  );
};

export default ButtonPanel;
