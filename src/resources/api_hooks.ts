import { useEffect } from "react";
import { CONCERTS_URL ,getConcertPaymentsURL, getConcertReservationsURL } from "./urls";
import { EventType } from "../components/select_event_card";


export const useGetConcerts = (
  setConcerts: (concerts: EventType[]) => void
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
  reservationId?: string,
  concertId?: string,
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
