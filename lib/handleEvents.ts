interface initialEventDetail {
  name: string;
  startTime: string;
  endTime: string;
  timetableID: string;
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
  // Convert start time string to a Date object.
  const startTime = new Date(event.startTime);

  // Convert end time string to a Date object.
  const endTime = new Date(event.endTime);

  // Round start and end times to the nearest 15 minutes.
  const roundedStartTime = roundToNearest15(startTime);
  const roundedEndTime = roundToNearest15(endTime);

  // Format start and end dates.
  const startDateFormatted = formatDate(startTime);
  const endDateFormatted = formatDate(endTime);

  // Format start and end times.
  const startTimeFormatted = formatTime(startTime);
  const endTimeFormatted = formatTime(endTime);

  // Calculate the hour and minute of the day for the rounded start time.
  const hourOfDay = roundedStartTime.getHours();
  const minuteOfDay = roundedStartTime.getMinutes();

  // Extract the day number from the formatted start date.
  const startDayNumber = parseInt(startDateFormatted.split("-")[0]);

  // Calculate the duration of the event.
  const difference = subtractDates(roundedEndTime, roundedStartTime);

  // Calculate the row position based on the rounded start time.
  const row = hourOfDay * 4 + minuteOfDay / 15 - 25;

  // Return extracted event information.
  return {
    name: event.name,
    startDate: startDateFormatted,
    startTime: startTimeFormatted,
    endDate: endDateFormatted,
    endTime: endTimeFormatted,
    timetableId: event.timetableID,
    _id: event._id,
    row: row,
    startDayNumber: startDayNumber,
    difference: difference[0] * 4 + difference[1] * 4,
  };
}

function roundToNearest15(date: Date): Date {
  const roundedDate = new Date(date);
  const roundedMinutes = Math.round(roundedDate.getMinutes() / 15) * 15;
  roundedDate.setMinutes(roundedMinutes);
  return roundedDate;
}

// Function to calculate the difference between two dates in hours and minutes.
function subtractDates(date1: Date, date2: Date): number[] {
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();

  const differenceMs = date1Ms - date2Ms;

  const differenceHours = Math.floor(differenceMs / (1000 * 60 * 60));
  const differenceMinutes =
    (differenceMs % (1000 * 60 * 60)) / (1000 * 60 * 60);

  return [differenceHours, differenceMinutes];
}

// Function to format a date as 'dd-mm-yyyy'.
function formatDate(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

// Function to format a time as 'hh:mm'.
function formatTime(date: Date): string {
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
