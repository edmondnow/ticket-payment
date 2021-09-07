import { getConcertPaymentsURL } from "./urls";

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
