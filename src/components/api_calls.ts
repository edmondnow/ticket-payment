
import { getConcertPaymentsURL, getConcertReservationsURL } from ".";

const makeReservationFormData = () => {
    const formData = new FormData();
    formData.append("identification", "name");
    formData.append("numberOfTickets", "1");
    return formData;
  };

  
export const postPayment = async (
    concertId: string,
    reservationId: string,
    setIsPaymentMade: (arg: boolean) => void,
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
  
  export const postReservation = async (
    concertId: string,
    reservationId: string,
    setReservationMade: (argument: string) => void
  ) => {
    const concertReservationsURL = getConcertReservationsURL(
      concertId,
      reservationId
    );
  
    const init = {
      method: "POST",
      body: makeReservationFormData(),
    };
    try {
      const response = await fetch(concertReservationsURL, init);
  
      if (response.status === 202) {
        setReservationMade(reservationId);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  