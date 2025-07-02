
export interface WorkerCapacityCounts {
    available:number;
    total:number;
  }

export interface WorkerCapacityObj {
    channels:Map<string,WorkerCapacityCounts>;
  }

export interface WorkerCapacityState {
    workerCapacities: Map<string,WorkerCapacityObj>;
}
export  interface WorkerCapacityUpdateRequest {
    workerSid: string;
    capacities:WorkerCapacityObj;
  }
  