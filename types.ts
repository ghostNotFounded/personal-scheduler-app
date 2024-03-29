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
  name: string;
  startTime: string;
  endTime: string;
  timetableId: string;
  _id: string;
}
