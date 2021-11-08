import React from 'react'
import Header from "../../components/Header/Header";
import PageFrame from "../../components/PageFrame/PageFrame";
import ReservationList from '../../components/ReservationList/ReservationList';

function Reservations() {
  return (
    <div className="App">
      <Header />
      <PageFrame>
        <h1>Reservations</h1>
        <ReservationList />
      </PageFrame>
    </div>
  )
}

export default Reservations
