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

export const ConcertItem = ({
  name,
  onChange,
  checked,
  id,
  date,
  capacity,
}: ConcertItemProps): ReactElement => (
  <div className="concert">
    <h3 className="concert__header">{name}</h3>
    <input type="checkbox" checked={checked} onChange={onChange} />
  </div>
);
