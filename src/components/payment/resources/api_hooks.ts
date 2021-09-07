import { useEffect } from "react";
import { getConcertPaymentsURL } from "./urls";

export const useGetPayment = async (
  setPaymentDetails: (arg: any) => void,
  hookDependency: () => void,
  concertId: string,
  reservationId: string
) => {
  useEffect(() => {
    const fetchData = async () => {
      const url = getConcertPaymentsURL(concertId, reservationId);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPaymentDetails(json);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, [hookDependency]);
};
