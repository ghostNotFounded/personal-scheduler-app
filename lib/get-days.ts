import { WeekDayInfo } from "@/types";

export const getDays = () => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - currentDay); // Setting it to the first day of the week (Sunday)

  const weekDayInfo: WeekDayInfo[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(firstDayOfWeek);
    currentDate.setDate(firstDayOfWeek.getDate() + i);
    const isToday = currentDate.toDateString() === today.toDateString(); // Compare dates to check if it's today
    weekDayInfo.push({
      dayNumber: currentDate.getDate(),
      dayName: dayNames[currentDate.getDay()],
      today: isToday,
    });
  }

  return weekDayInfo;
};
