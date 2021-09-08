import { ReactElement } from "react";
import { makeDateString } from "..";
import "./event_item.css";

export type EventType = {
  id: string;
  name: string;
  date: string;
  capacity: number;
};

interface EventItemProps extends EventType {
  checked: boolean;
  onChange: () => void;
}


export const EventItem = ({
  name,
  onChange,
  checked,
  date,
}: EventItemProps): ReactElement => {
  const dateString = makeDateString(date);

  return (
    <div className="event" onClick={onChange}>
      <div className="event__copy-container">
        <h3 className="event__header">{name}</h3>
        <div className="event__date">{dateString}</div>
      </div>

      <input type="checkbox" color="success" checked={checked} />
    </div>
  );
};
