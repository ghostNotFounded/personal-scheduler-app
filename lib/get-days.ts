import { WeekDayInfo } from "@/types";

export const getDaysFromWeekNumber = (
  weekNumber: number
): Array<WeekDayInfo> => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const januaryFirst = new Date(year, 0, 1);
  const daysOffset = januaryFirst.getDay();
  const firstWeekDay = 1 + 7 * (weekNumber - 1) - daysOffset;

  const firstDayOfWeek = new Date(year, 0, firstWeekDay);
  const weekDayInfo: WeekDayInfo[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(firstDayOfWeek);
    currentDate.setDate(firstDayOfWeek.getDate() + i);
    weekDayInfo.push({
      dayNumber: currentDate.getDate(),
      dayName: dayNames[currentDate.getDay()],
      today: false,
    });
  }

  return weekDayInfo;
};
