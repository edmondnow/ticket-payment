import { useState } from "react";
import "./app.css";
import {
  SelectEventCard,
  PaymentCard,
  ReservationType,
  EventType,
  ReservationCard,
} from "./components";

function App() {
  const [event, setEvent] = useState<EventType>();
  const [reservation, setReservation] = useState<ReservationType>();
  const [clientName, setClientName] = useState<string>();
  const [numberOfTickets, setNumberOfTickets] = useState<number>();
  const isReserved = reservation?.status === "Reserved";

  return (
    <div className="app-container">
      <div className="forms-container">
        {!event && <SelectEventCard setEvent={setEvent} />}
        {event && !isReserved && (
          <ReservationCard
            reservationStatus={reservation?.status}
            setClientName={setClientName}
            setNumberOfTicketsForPayment={setNumberOfTickets}
            eventId={event.id}
            eventName={event.name}
            eventDate={event.date}
            setReservation={setReservation}
          />
        )}
        {isReserved && (
          <PaymentCard
            eventName={event!.name}
            eventDate={event!.date}
            clientName={clientName!}
            numberOfTickets={numberOfTickets!}
            reservationId={reservation!.id}
            concertId={reservation!.concertId}
          />
        )}
      </div>
    </div>
  );
}

export default App;
