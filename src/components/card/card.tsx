import { FC, ReactElement } from "react";
import "./card.css";

interface CardProps {
  title: string;
}

export const Card: FC<CardProps> = ({ title, children }): ReactElement => {
  return (
    <div className="card">
      <div className="card__logo-container">
        <div className="card__rectangle" />
        <div className="card__company-name">TicketBeast</div>
      </div>
      <h2 className="card__header">{title}</h2>
      {children}
    </div>
  );
};
