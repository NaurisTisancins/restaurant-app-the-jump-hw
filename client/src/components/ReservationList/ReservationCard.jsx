import React, {useContext} from 'react';
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { ReservationContext } from '../../contexts/reservation.context';

const useStyles = makeStyles((theme) => ({
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));


function ReservationCard({ reservation }) {
  const { customerID, date, time, email, guests, name, table, _id } = reservation;

  const { deleteOwnReservation } = useContext(ReservationContext);
  const styles = useStyles();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Resevation for:
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h5" component="div">
          date: {date.slice(0, 10)} - {time} <br />
          table: {table} <br />
          guests: {guests}
        </Typography>
        <Typography variant="h5" component="div">
          {email}
        </Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button
          size="small"
          component={Link}
          to={`/reservation/update/${_id}`}
        >Update</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}

export default ReservationCard
