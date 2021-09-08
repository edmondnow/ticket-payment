export const makeDateString = (date: string) => {
    const dateObj = new Date(date);
    const monthNames = [
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
  
    const month = dateObj.getMonth();
    const dayOfMonth = dateObj.getDate();
    const year = dateObj.getFullYear();
    const monthName = monthNames[month];
    return `${monthName} ${dayOfMonth}, ${year}`;
  };
  