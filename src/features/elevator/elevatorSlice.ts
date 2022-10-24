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
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleIsMoving: (state, { payload }) => {
      state.isMoving = payload;
    },
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
    },
    calculateRoute: (state, action) => {
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
  },
});

export const {
  elevatorUp,
  elevatorDown,
  addDestination,
  toggleIsMoving,
  calculateRoute,
  arrived,
  addUpCall,
  addDownCall,
} = elevatorSlice.actions;

export default elevatorSlice.reducer;
