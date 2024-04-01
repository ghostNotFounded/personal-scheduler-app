export interface Timetable {
  _id: string;
  name: string;
}

export interface WeekDayInfo {
  dayNumber: number;
  dayName: string;
  today: boolean;
}

export interface EventDetail {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  timetableId: string;
  startDate: string;
  endDate: string;
  startDayNumber: number;
  row: number;
  difference: number;
}
