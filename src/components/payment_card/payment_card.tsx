import { ReactElement, FC, useState, useCallback } from "react";
import { makeDateString } from "..";
import { useGetPayment, postPayment } from "../../resources";
import { Button } from "../button";
import { Card } from "../card";
import { EventDetails } from "../event_details";
import "./payment_card.css";

type PaymentType = {
  id: string;
  concertId: string;
  status: string;
  lastUpdated: string;
};

interface PaymentCardProps {
  concertId: string;
  reservationId: string;
  eventName: string;
  eventDate: string;
  clientName: string;
  numberOfTickets: number;
}

export const PaymentCard: FC<PaymentCardProps> = ({
  concertId,
  reservationId,
  eventName,
  eventDate,
  clientName,
  numberOfTickets,
}): ReactElement => {
  const [isPaymentMade, setIsPaymentMade] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentType | null>();
  const paymentIsNotMade =
    paymentDetails && paymentDetails?.status === "Reserved";
  const isPaymentMadeHookDependency = useCallback(() => {}, [isPaymentMade]);
  
  useGetPayment(
    setPaymentDetails,
    isPaymentMadeHookDependency,
    concertId,
    reservationId
  );

  const handlePaymentSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postPayment(concertId, reservationId, setIsPaymentMade);
  };

  return (
    <Card title="Confirm payment for reserved tickets">
      <EventDetails
        eventName={eventName}
        eventDate={makeDateString(eventDate)}
        clientName={clientName}
        numberOfTickets={numberOfTickets}
      />
      <form name="buy-form" onSubmit={handlePaymentSubmission}>
        <Button
          className={!paymentIsNotMade ? "button-card__success" : undefined}
          type="submit"
        >
          {paymentIsNotMade ? "Confirm payment" : "Payment confirmed"}
        </Button>
      </form>
    </Card>
  );
};
