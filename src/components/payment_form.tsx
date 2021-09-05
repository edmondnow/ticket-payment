import { ReactElement, useState } from "react";
import { ConcertItem, ConcertType } from ".";
import { useGetConcerts } from "./api_hooks";

import "./css/payment_form.css";

export function PaymentForm(): ReactElement {
  const [concerts, setConcerts] = useState<ConcertType[] | null>();
  const [selectedConcertId, setSelectedConcertId] = useState<string | null>();
  useGetConcerts(setConcerts);

  return (
    <form name="payment-form" className="payment-form">
      <h2 className="payment-form__header">Select concert</h2>
      {concerts &&
        concerts.map((concert) => {
          const isSelected = concert.id === selectedConcertId;
          const handleClick = () => {
            if (!isSelected) setSelectedConcertId(concert.id);
          };
          return (
            <ConcertItem {...concert} checked={isSelected} handleClick={handleClick} />
          );
        })}
    </form>
  );
}
