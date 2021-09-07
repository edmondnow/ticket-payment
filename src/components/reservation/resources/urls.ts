export const ROOT_URL = "https://ts-ticketbeast-api.azurewebsites.net";
export const CONCERTS_URL = `${ROOT_URL}/concerts`;

export const getConcertURL = (concertId: string) => `${ROOT_URL}/${concertId}`;

export const getConcertReservationsURL = (
  concertId: string,
  reservationId: string
) => `${ROOT_URL}/concerts/${concertId}/reservations/${reservationId}`;

export const getConcertPaymentsURL = (
  concertId: string,
  reservationId: string
) => `${ROOT_URL}/concerts/${concertId}/reservations/${reservationId}/payments`;
