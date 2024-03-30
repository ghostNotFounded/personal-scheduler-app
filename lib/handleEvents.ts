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
  gridPosition: GridPosition;
  startDayNumber: number;
} {
  const startDate = new Date(event.startTime);
  const startTime = new Date(event.startTime);

  const endTime = new Date(event.endTime);

  const startDateFormatted = formatDate(startTime);
  const endDateFormatted = formatDate(endTime);

  const startTimeFormatted = formatTime(startTime);
  const endTimeFormatted = formatTime(endTime);

  // Calculate day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeek = startDate.getUTCDay();

  // Calculate hour of the day (0 to 23)
  const hourOfDay = startDate.getUTCHours();

  const startDayNumber = parseInt(startDateFormatted.split("-")[0]);

  // Calculate grid position based on day of the week and hour of the day
  const gridPosition: GridPosition = {
    row: hourOfDay,
    col: dayOfWeek,
  };

  return {
    name: event.name,
    startDate: startDateFormatted,
    startTime: startTimeFormatted,
    endDate: endDateFormatted,
    endTime: endTimeFormatted,
    timetableId: event.timetableId,
    _id: event._id,
    gridPosition: gridPosition,
    startDayNumber: startDayNumber,
  };
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
