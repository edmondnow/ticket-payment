import { getConcertReservationsURL, getConcertPaymentsURL } from "./urls";

const makeReservationFormData = (
  identification: string,
  numberOfTickets: number
) => {
  const formData = new FormData();
  formData.append("identification", identification);
  formData.append("numberOfTickets", numberOfTickets.toString());
  return formData;
};

export const postReservation = async (
  concertId: string,
  reservationId: string,
  setReservationIdOnSuccess: (argument: string) => void,
  setClientName: (arg: string) => void,
  setNumberOfTicketsForPayment: (arg: number) => void,
  identification: string,
  numberOfTickets: number
) => {
  const concertReservationsURL = getConcertReservationsURL(
    concertId,
    reservationId
  );
  const init = {
    method: "POST",
    body: makeReservationFormData(identification, numberOfTickets),
  };

  try {
    const response = await fetch(concertReservationsURL, init);
    if (response.status === 202) {
      setReservationIdOnSuccess(reservationId);
      setClientName(identification);
      setNumberOfTicketsForPayment(numberOfTickets);
    }
  } catch (error) {
    console.error("error", error);
  }
};

export const postPayment = async (
  concertId: string,
  reservationId: string,
  setIsPaymentMade: (arg: boolean) => void
) => {
  const concertPaymentsUrl = getConcertPaymentsURL(concertId, reservationId);
  const init = {
    method: "POST",
  };

  try {
    const response = await fetch(concertPaymentsUrl, init);
    if (response.status === 202) {
      setIsPaymentMade(true);
    }
  } catch (error) {
    console.error("error", error);
  }
};
