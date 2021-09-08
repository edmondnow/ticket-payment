import { ReactElement } from "react";

import "./css/concert.css";

export type ConcertType = {
  id: string;
  name: string;
  date: string;
  capacity: number;
};

interface ConcertItemProps extends ConcertType {
  checked: boolean;
  onChange: () => void;
}

const makeDateString = (date: string) => {
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

export const ConcertItem = ({
  name,
  onChange,
  checked,
  id,
  date,
  capacity,
}: ConcertItemProps): ReactElement => {
  const dateString = makeDateString(date);

  return (
    <div className="concert"  onClick={onChange}>
      <div className="concert__copy-container">
        <h3 className="concert__header">{name}</h3>
        <div>{dateString}</div>
      </div>

      <input
        type="checkbox"
        color="success"
        checked={checked}
       
      />
    </div>
  );
};
