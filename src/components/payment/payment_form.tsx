import { ReactElement, FC, useState, useCallback } from "react";
import { useGetPayment, postPayment } from "./resources";
import "./payment_form.css";

interface PaymentFormProps {
  concertId: string;
  reservationId: string;
  reservationStatus: string;
}

type PaymentType = {
  id: string,
  concertId: string,
  status: string,
  lastUpdated: string
}
export const PaymentForm: FC<PaymentFormProps> = ({
  concertId,
  reservationId,
  reservationStatus,
}): ReactElement => {
  const [isPaymentMade, setIsPaymentMade] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentType | null>();
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
    <div className="payment-form">
      <form name="buy-form" onSubmit={handlePaymentSubmission}>
        {reservationStatus === "Reserved" && (
          <button type="submit">Submit payment</button>
        )}
      </form>
      {paymentDetails && paymentDetails!.status}
    </div>
  );
};
