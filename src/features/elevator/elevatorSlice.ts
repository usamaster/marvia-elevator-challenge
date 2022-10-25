import { createSlice } from "@reduxjs/toolkit";
import floors from "../../floors";

export interface CounterState {
  floors: Array<object>;
  currentFloor: number;
  destinations: Array<number>;
  route: Array<number>;
  isMoving: Boolean;
  upCalls: Array<number>;
  downCalls: Array<number>;
}

const initialState: CounterState = {
  floors: floors,
  currentFloor: 0,
  destinations: [],
  route: [],
  isMoving: false,
  upCalls: [],
  downCalls: [],
};

export const elevatorSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleIsMoving: (state, { payload }) => {
      state.isMoving = payload;
    },
    // Moves elevator 1 floor up while also picking up, upcalls from levels it passes. For down it is the reverse.
    elevatorUp: (state, action) => {
      state.destinations.push(...state.upCalls);

      state.floors[state.currentFloor] = {
        level: state.currentFloor,
        active: false,
      };

      state.currentFloor < 5
        ? (state.currentFloor += 1)
        : (state.currentFloor += 0);

      state.floors[state.currentFloor] = {
        level: state.currentFloor,
        active: true,
      };
      state.isMoving = false;
    },
    elevatorDown: (state, action) => {
      state.destinations.push(...state.downCalls);

      state.floors[state.currentFloor] = {
        level: state.currentFloor,
        active: false,
      };

      state.currentFloor < 1
        ? (state.currentFloor -= 0)
        : (state.currentFloor -= 1);

      state.floors[state.currentFloor] = {
        level: state.currentFloor,
        active: true,
      };
      state.isMoving = false;
    },
    addDestination: (state, { payload }) => {
      state.destinations.push(payload);

      if (state.destinations.length === 0 && state.upCalls.length > 0) {
        state.destinations.push(...state.upCalls);
      } else if (
        state.destinations.length === 0 &&
        state.downCalls.length > 0
      ) {
        state.destinations.push(...state.downCalls);
      }
      const destinationsArray = [...state.destinations];
      state.route = destinationsArray.sort(
        (a, b) =>
          Math.abs(a - state.currentFloor) - Math.abs(b - state.currentFloor)
      );
    },

    // Adds elevator calls to upcalls array, and if the elevator is idle it also adds a destination directly
    addUpCall: (state, { payload }) => {
      state.currentFloor !== payload &&
        state.upCalls.push(payload) &&
        state.destinations.length === 0 &&
        state.destinations.push(payload);
    },
    addDownCall: (state, { payload }) => {
      state.currentFloor !== payload &&
        state.downCalls.push(payload) &&
        state.destinations.length === 0 &&
        state.destinations.push(payload);
    },
    arrived: (state, action) => {
      state.destinations = state.destinations.filter(
        (dest) => dest !== state.currentFloor
      );
      state.upCalls = state.upCalls.filter(
        (dest) => dest !== state.currentFloor
      );
      state.downCalls = state.downCalls.filter(
        (dest) => dest !== state.currentFloor
      );
    },
    calculateRoute: (state, action) => {
      const destinationsArray = [...state.destinations];
      state.route = destinationsArray.sort(
        (a, b) =>
          Math.abs(a - state.currentFloor) - Math.abs(b - state.currentFloor)
      );
    },
  },
});

export const {
  elevatorUp,
  elevatorDown,
  addDestination,
  toggleIsMoving,
  arrived,
  addUpCall,
  addDownCall,
  calculateRoute,
} = elevatorSlice.actions;

export default elevatorSlice.reducer;
