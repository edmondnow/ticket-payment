import { ReactElement, FC, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { ConcertItem, ConcertType } from ".";
import { postReservation, postPayment } from "./api_calls";
import { useGetConcerts, useGetPayment, useGetReservations } from "./api_hooks";

import "./css/payment_form.css";

type Reservation = {
  status: string;
  id: string;
  concertId: string;
  lastUpdated: string;
};

export const PaymentForm: FC = (): ReactElement => {
  const [concerts, setConcerts] = useState<ConcertType[] | null>();
  const [selectedConcert, setSelectedConcert] = useState<ConcertType>();

  const [identification, setIdentification] = useState("");
  const [reservationMade, setReservationMade] = useState<string>();
  const [reservation, setReservation] = useState<Reservation | null>();
  const numberOfTicketsSelect = [1, 2];
  const [numberOfTickets, setNumberOfTickets] = useState<1 | 2>(1);

  const [isPaymentMade, setIsPaymentMade] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState();

  useGetConcerts(setConcerts);

  useGetReservations(
    setReservation,
    selectedConcert?.id,
    reservationMade,
    useCallback(() => {}, [reservationMade])
  );

  useGetPayment(
    setPaymentDetails,
    useCallback(() => {}, [isPaymentMade]),
    selectedConcert?.id,
    reservation?.id
  );

  const onClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reservationId = uuidv4();
    postReservation(selectedConcert!.id, reservationId, setReservationMade);
  };

  const handleSelectChange = (value: string) => {
    const index = Number(value);
    const numberofTickets = numberOfTicketsSelect[index];
    setNumberOfTickets(numberofTickets === 1 ? 1 : 2);
  };

  const handlePaymentSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = postPayment(
      reservation!.concertId,
      reservation!.id,
      setIsPaymentMade
    );
  };

  return (
    <div className="payment-form">
      <form name="reservation-form" onSubmit={onClick}>
        <h2 className="payment-form__header">Select concert</h2>
        {concerts &&
          concerts.map((concert, key) => {
            const isSelected = concert.id === selectedConcert?.id;
            const handleClick = () => {
              if (!isSelected) setSelectedConcert(concert);
              //setReservationMade(false);
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
            <h2 className="payment-form__header">Place a reservation</h2>
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
      <form
        name="buy-form"
        onSubmit={handlePaymentSubmission}
        {...console.log(reservation?.status)}
      >
        {reservation?.status === "Reserved" && (
          <button type="submit">Submit payment</button>
        )}
      </form>
      {paymentDetails && JSON.stringify(paymentDetails)}
    </div>
  );
};
