import React from 'react';
import Header from "../../components/Header/Header";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import PageFrame from "../../components/PageFrame/PageFrame";

function AddReservation() {
  return (
    <div className="page">
      <Header />
      <PageFrame>
        <h1>Add Reservation</h1>
        <ReservationForm/>
      </PageFrame>
    </div>
  )
}

export default AddReservation;

