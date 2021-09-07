import { useEffect } from "react";
import { CONCERTS_URL, getConcertReservationsURL } from ".";
import { ConcertType } from "./concert_item";
import { getConcertPaymentsURL } from "./urls";

export const useGetConcerts = (
  setConcerts: (concerts: ConcertType[]) => void
) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CONCERTS_URL);
        const json = await response.json();
        setConcerts(json);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchData();
  }, []);
};

export const useGetReservations = (
  setReservation: (arg: any) => void,
  concertId?: string,
  reservationId?: string,
  hookDependency?: () => void
) => {
  useEffect(() => {
    const fetchData = async () => {
      const url =
        concertId &&
        reservationId &&
        getConcertReservationsURL(concertId, reservationId);

      if (url) {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setReservation(json);
        } catch (error) {
          console.error("error", error);
        }
      }
    };
    fetchData();
  }, [hookDependency]);
};

export const useGetPayment = async (
  setPaymentDetails: (arg: any) => void,
  hookDependency?: () => void,
  concertId?: string,
  reservationId?: string,

) => {
  useEffect(() => {
    const fetchData = async () => {
      const url =
        concertId &&
        reservationId &&
        getConcertPaymentsURL(concertId, reservationId);
      console.log(">>  URL", url)
      if (url) {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setPaymentDetails(json);
        } catch (error) {
          console.error("error", error);
        }
      }
    };
    fetchData();
  }, [hookDependency]);
};
