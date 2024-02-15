export interface CallStatistics {
  totalCalls: number;
  positiveCalls: number;
  negativeCalls: number;
  neutralCalls: number;
  averageCallTime: number;
  totalMinutes: number;
}

export interface OverallCallStatusPercentages {
  positive: number;
  negative: number;
  neutral: number;
}

export interface CallRecording {
  title: string;
  date: Date;
  status: string;
  callUrl: string;
}
