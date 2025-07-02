import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {WorkerCapacityObj,WorkerCapacityState,WorkerCapacityUpdateRequest} from "../../types/WorkerCapacity"

const initialState = { workerCapacities: {} } as WorkerCapacityState ;

const workerCapacitiesSlice = createSlice({
  name: 'workerCapacities',
  initialState,
  reducers: {
    updateCapacity(state, action: PayloadAction<WorkerCapacityUpdateRequest>) {
      state.workerCapacities= {
          ...state.workerCapacities,
          [action.payload.workerSid]:action.payload.capacities
      };
    },
    
  },
});

export const { updateCapacity } = workerCapacitiesSlice.actions;
export const reducerHook = () => ({ workerCapacities: workerCapacitiesSlice.reducer });