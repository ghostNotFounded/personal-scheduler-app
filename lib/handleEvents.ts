interface GridPosition {
  row: number;
  col: number;
}

interface initialEventDetail {
  name: string;
  startTime: string;
  endTime: string;
  timetableId: string;
  _id: string;
}

export function extractEventInfo(event: initialEventDetail): {
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timetableId: string;
  _id: string;
  row: number;
  startDayNumber: number;
  difference: number;
} {
  const startDate = new Date(event.startTime);
  const startTime = new Date(event.startTime);

  const endTime = new Date(event.endTime);

  const startDateFormatted = formatDate(startTime);
  const endDateFormatted = formatDate(endTime);

  const startTimeFormatted = formatTime(startTime);
  const endTimeFormatted = formatTime(endTime);

  // Calculate hour of the day (0 to 23)
  const hourOfDay = startDate.getUTCHours();

  const startDayNumber = parseInt(startDateFormatted.split("-")[0]);

  const difference = subtractDates(endTime, startTime);

  return {
    name: event.name,
    startDate: startDateFormatted,
    startTime: startTimeFormatted,
    endDate: endDateFormatted,
    endTime: endTimeFormatted,
    timetableId: event.timetableId,
    _id: event._id,
    row: hourOfDay * 4 - 3,
    startDayNumber: startDayNumber,
    difference: difference * 4,
  };
}

function subtractDates(date1: Date, date2: Date): number {
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();

  const differenceMs = Math.abs(date1Ms - date2Ms);

  const differenceHours = Math.floor(differenceMs / (1000 * 60 * 60));

  return differenceHours;
}

function formatDate(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

function formatTime(date: Date): string {
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
