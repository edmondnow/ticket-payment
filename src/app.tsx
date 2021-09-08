import { useState } from "react";
import "./app.css";
import { ReservationForm, PaymentForm, ReservationType } from "./components";

function App() {
  const [reservation, setReservation] = useState<ReservationType | null>();
  const showPaymentForm = reservation?.status === "Reserved";

  return (
    <div className="app-container">
      <div className="forms-container">
        <ReservationForm setReservation={setReservation} />
        {showPaymentForm && (
          <PaymentForm
            reservationStatus={reservation!.status}
            reservationId={reservation!.id}
            concertId={reservation!.concertId}
          />
        )}
      </div>
    </div>
  );
}

export default App;
