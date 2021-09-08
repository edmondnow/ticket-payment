import { ReactElement, FC, useState } from "react";
import { EventItem, EventType } from "..";
import { Card } from "../card";
import { useGetConcerts } from "../../resources";
import { Button } from "../button";
import './select_event_card.css';

interface SelectEventCardProps {
  setEvent: (event: EventType) => void;
}

export const SelectEventCard: FC<SelectEventCardProps> = ({
  setEvent,
}): ReactElement => {
  const [events, setEvents] = useState<EventType[]>();
  const [selectedEvent, setSelectedEvents] = useState<EventType>();

  useGetConcerts(setEvents);

  return (
    <Card title="Select the event you want to reserve">
      <div className="events-container">
        {events &&
          events.map((event, key) => {
            const isSelected = event.id === selectedEvent?.id;
            const handleClick = () => {
              if (!isSelected) setSelectedEvents(event);
            };

            return (
              <EventItem
                {...event}
                key={key + "item"}
                checked={isSelected}
                onChange={handleClick}
              />
            );
          })}
      </div>
      <Button
        onClick={() => setEvent(selectedEvent!)}
        disabled={!selectedEvent}
      >
        Go to ticket details
      </Button>
    </Card>
  );
};
