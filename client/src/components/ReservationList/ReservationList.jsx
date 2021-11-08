import React, { useContext, useEffect } from 'react'
import { ReservationContext } from "../../contexts/reservation.context";

import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ReservationPermission,
} from "../../constants";
import { Link } from "react-router-dom";

import ReservationCard from "./ReservationCard";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formRow: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
  },
  categoriesList: {
    listStyle: "none",
    padding: 0,
  },
  itemList: {
    listStyle: "none",
    padding: 0,
  },
  categoryTitle: {
    textTransform: "capitalize",
  },
}));

function ReservationList() {
  const classes = useStyles();
  const { user } = useAuth0();

  let permissions = [];
  if (user) {
    console.log("user", user);
    permissions = user[`${window.location.origin}/user_authorization`].permissions;
  };

  const canUptade = permissions.includes(ReservationPermission.UpdateOwnReservation);
  const canDelete = permissions.includes(ReservationPermission.DeleteOwnReservation);

  const { reservations, loaded, fetchOwnReservations, loading, error } = useContext(ReservationContext);

  useEffect(() => {
    if (!loading && !loaded) {
      fetchOwnReservations();
    };
  }, [loaded, fetchOwnReservations, reservations, loading]);

  if (reservations.length === 0) {
    return <p>No Reservetions to display!</p>
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {reservations.map((reservation) => {
        return <ReservationCard
          key={reservation._id}
          reservation={reservation}
        />
      })}
    </div>
  )
}

export default ReservationList
