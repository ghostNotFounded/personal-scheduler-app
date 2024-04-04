export const getWeekNumber = (): number => {
  const currentDate = new Date();
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (currentDate.getTime() - firstDayOfYear.getTime()) / 86400000;
  const weekNumber = Math.ceil(
    (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
  );
  return weekNumber;
};

export const getMonthFromWeekNumber = (weekNumber: number) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const firstDayOfYear = new Date(currentYear, 0, 1);
  const pastDaysOfYear = (weekNumber - 1) * 7;
  const targetDate = new Date(
    firstDayOfYear.getTime() + pastDaysOfYear * 24 * 60 * 60 * 1000
  );

  const monthFormatter = new Intl.DateTimeFormat("en", { month: "long" });
  const monthName = monthFormatter.format(targetDate);

  return monthName;
};
