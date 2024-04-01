export default function handleDateFormat(date: string) {
  const [day, month, year] = date.split("-");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${day} ${months[parseInt(month)]}, ${year}`;
}
