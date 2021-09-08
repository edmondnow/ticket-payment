import {
  ROOT_URL,
  getConcertReservationsURL,
  getConcertURL,
  getConcertPaymentsURL,
} from "./urls";

describe("Reservation related endpoint URLs are concatenated", () => {
  const concertId = "100";
  const reservationId = "101"
  
  test("concert URL", () => {
    expect(getConcertURL(concertId )).toBe(`${ROOT_URL}/${concertId}`);
  });

  test("concert reservations URL", () => {
    expect(getConcertReservationsURL(concertId, reservationId)).toBe(`${ROOT_URL}/concerts/${concertId}/reservations/${reservationId}`);
  });

  test("concert payments URL", () => {
    expect(getConcertPaymentsURL(concertId,reservationId )).toBe(`${ROOT_URL}/concerts/${concertId}/reservations/${reservationId}/payments`);
  });
});



