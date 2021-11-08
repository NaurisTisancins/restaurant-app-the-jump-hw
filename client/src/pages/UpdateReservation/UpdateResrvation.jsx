import React, { useContext, useEffect } from "react";
import PageFrame from "../../components/PageFrame/PageFrame";
import Header from "../../components/Header/Header";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import { useParams } from "react-router-dom";
import { ReservationContext } from "../../contexts/reservation.context";

function UpdateReservation() {
  let { id } = useParams();
  const { reservations, loaded, fetchOwnReservations } = useContext(ReservationContext);

  useEffect(() => {
    if (!loaded) {
      fetchOwnReservations();
    };
  }, [loaded, fetchOwnReservations, reservations]);

  const reservationToUpdate = reservations.find((reservation) => {
    return reservation._id === id;
  });
  
  return (
    <div className="App">
      <Header />
      <PageFrame>
        <h1>Update Reservation</h1>
        <ReservationForm initialValues={reservationToUpdate} />
      </PageFrame>
    </div>
  )
};

export default UpdateReservation;