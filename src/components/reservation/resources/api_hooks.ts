import { useEffect } from "react";
import { CONCERTS_URL, getConcertReservationsURL } from "./urls";
import { ConcertType } from "../";

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
