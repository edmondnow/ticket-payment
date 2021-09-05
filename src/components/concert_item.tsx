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
  handleClick: () => void;
}

export const ConcertItem = ({
  name,
  handleClick,
  checked,
  id,
  date,
  capacity,
}: ConcertItemProps): ReactElement => (
  <div className="concert">
    <h3>{name}</h3>
    <input type="checkbox" checked={checked} onClick={handleClick} />
  </div>
);
