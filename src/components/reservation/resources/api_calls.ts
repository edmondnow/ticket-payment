import { getConcertReservationsURL } from "./urls";

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
    }
  } catch (error) {
    console.error("error", error);
  }
};
