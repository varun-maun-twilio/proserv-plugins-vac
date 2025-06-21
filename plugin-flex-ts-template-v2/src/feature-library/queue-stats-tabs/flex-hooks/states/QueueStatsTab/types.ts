// Actions
export const prefix = 'custom/QueueStatsTab';
export const SELECT_TAB = `${prefix}/SELECT_TAB`;

// State
export interface QueueStatsTabState {
  selectedTab?: string;
}
