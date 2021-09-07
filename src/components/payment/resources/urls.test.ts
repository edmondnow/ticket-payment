import {
  ROOT_URL,
  getConcertPaymentsURL,
} from "./urls";

describe("Endpoint URLs are concatenated", () => {
  const concertId = "100";
  const reservationId = "101"
  
  test("concert payments URL", () => {
    expect(getConcertPaymentsURL(concertId,reservationId )).toBe(`${ROOT_URL}/concerts/${concertId}/reservations/${reservationId}/payments`);
  });
});
