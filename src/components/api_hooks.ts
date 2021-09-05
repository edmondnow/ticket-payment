import { useEffect } from "react";
import { CONCERTS_URL } from ".";
import { ConcertType } from "./concert_item";


export function useGetConcerts(setConcerts: (concerts: ConcertType[]) => void) {
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
}


