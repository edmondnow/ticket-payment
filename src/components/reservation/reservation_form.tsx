import { ReactElement, FC, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { ConcertItem, ConcertType } from "..";
import {
  useGetConcerts,
  useGetReservations,
  postReservation,
} from "./resources";
import "./css/reservation_form.css";

export type ReservationType = {
  status: string;
  id: string;
  concertId: string;
  lastUpdated: string;
};

interface ReservationFormProps {
  setReservation: (args: ReservationType) => void;
}

export const ReservationForm: FC<ReservationFormProps> = ({
  setReservation,
}): ReactElement => {
  const [concerts, setConcerts] = useState<ConcertType[] | null>();
  const [selectedConcert, setSelectedConcert] = useState<ConcertType>();
  const [identification, setIdentification] = useState<string>();
  const [reservationIdOnPost, setReservationIdOnPost] = useState<string>();
  const numberOfTicketsSelect = [1, 2];
  const [numberOfTickets, setNumberOfTickets] = useState<1 | 2>(1);

  useGetConcerts(setConcerts);

  useGetReservations(
    setReservation,
    reservationIdOnPost,
    selectedConcert?.id,
    useCallback(() => {}, [reservationIdOnPost])
  );

  const onClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reservationId = uuidv4();
    postReservation(
      selectedConcert!.id,
      reservationId,
      setReservationIdOnPost,
      identification!,
      numberOfTickets
    );
  };

  const handleSelectChange = (value: string) => {
    const index = Number(value);
    const numberofTickets = numberOfTicketsSelect[index];
    setNumberOfTickets(numberofTickets === 1 ? 1 : 2);
  };

  return (
    <form
      name="reservation-form"
      className="reservation-form"
      onSubmit={onClick}
    >
      <div className="reservation-form__logo-container">
        <div className="reservation-form__rectangle" />
        <div className="reservation-form__company-name">TicketBeast</div>
      </div>
      <h2 className="reservation-form__header">Select the event you want to reserve</h2>
      {concerts &&
        concerts.map((concert, key) => {
          const isSelected = concert.id === selectedConcert?.id;
          const handleClick = () => {
            if (!isSelected) setSelectedConcert(concert);
          };

          return (
            <ConcertItem
              {...concert}
              key={key + "item"}
              checked={isSelected}
              onChange={handleClick}
            />
          );
        })}

      {selectedConcert && (
        <>
          <h2 className="reservation-form__header">Place a reservation</h2>
          <div>{selectedConcert?.name}</div>
          <input
            name="identification"
            type="text"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
          />
          <select
            name="number-of-tickets"
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            {numberOfTicketsSelect.map((n, key) => (
              <option key={key + "option"} value={key}>
                {n}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </>
      )}
    </form>
  );
};
