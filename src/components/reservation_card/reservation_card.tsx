import { ReactElement, FC, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../card";
import { useGetReservations, postReservation } from "../../resources";
import { makeDateString } from "..";
import { Button } from "../button";
import { TextField, Select, MenuItem, InputLabel } from "@material-ui/core";
import "./reservation_card.css";
import { EventDetails } from "../event_details";

export type ReservationType = {
  status: string;
  id: string;
  concertId: string;
  lastUpdated: string;
};

interface ReservationFormProps {
  setReservation: (args: ReservationType) => void;
  setClientName: (arg: string) => void;
  setNumberOfTicketsForPayment: (arg: number) => void;
  eventId: string;
  eventName: string;
  eventDate: string;
  reservationStatus?: string;
}

export const ReservationCard: FC<ReservationFormProps> = ({
  setReservation,
  eventId,
  eventName,
  setClientName,
  reservationStatus,
  setNumberOfTicketsForPayment,
  eventDate,
}): ReactElement => {
  const [identification, setIdentification] = useState<string>();
  const [reservationIdOnPost, setReservationIdOnPost] = useState<string>();
  const numberOfTicketsSelect = [1, 2];
  const [numberOfTickets, setNumberOfTickets] = useState<1 | 2>(1);

  useGetReservations(
    setReservation,
    reservationIdOnPost,
    eventId,
    useCallback(() => {}, [reservationIdOnPost])
  );

  const onClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reservationId = uuidv4();

    postReservation(
      eventId,
      reservationId,
      setReservationIdOnPost,
      setClientName,
      setNumberOfTicketsForPayment,
      identification!,
      numberOfTickets
    );
  };

  const handleSelectChange = (value: any) => {
    const index = Number(value);
    const numberofTickets = numberOfTicketsSelect[index];
    setNumberOfTickets(numberofTickets === 1 ? 1 : 2);
  };

  return (
    <Card title="Place a reservation">
      <form name="reservation-form" onSubmit={onClick}>
        <EventDetails
          eventName={eventName}
          eventDate={makeDateString(eventDate)}
        />
        <TextField
          label="Name"
          name="identification"
          className="reservation-card__text-field"
          placeholder="James Hetfield"
          value={identification}
          onChange={(e) => setIdentification(e.target.value)}
        />

        <InputLabel className="reservation-card__input-label">
          Number of tickets
        </InputLabel>
        <Select
          label="Number of tickets"
          className="reservation-card__select"
          value={numberOfTickets - 1}
          name="number-of-tickets"
          onChange={(event) => handleSelectChange(event.target.value)}
        >
          {numberOfTicketsSelect.map((n, key) => (
            <MenuItem key={key + "option"} value={key}>
              {n}
            </MenuItem>
          ))}
        </Select>

        <Button
          className={
            reservationStatus === "SoldOut" ? "button-card--danger" : undefined
          }
          type="submit"
          disabled={!identification}
        >
          Reserve tickets
        </Button>
      </form>
    </Card>
  );
};
