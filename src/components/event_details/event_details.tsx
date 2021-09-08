import { FC } from "react";
import "./event.css";

interface EventDetailsProps {
  eventName: string;
  eventDate: string;
  numberOfTickets?: number;
  clientName?: string
}

export const EventDetails: FC<EventDetailsProps> = ({
  eventName,
  eventDate,
  numberOfTickets,
  clientName
}) => (
  <div className="event-details">
    <h3 className="event-details__header">Event details</h3>
    
    <div className="event-details__name">{eventName}</div>
    <div className="event-details__small-print">{eventDate}</div>
    {clientName && (
      <div className="event-details__small-print">{clientName}</div>
    )}

    {numberOfTickets && (
      <div className="event-details__small-print">{numberOfTickets === 1 ? "1 ticket" : "2 tickets"}</div>
    )}
    
  </div>
);
