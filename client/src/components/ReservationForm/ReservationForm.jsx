import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
} from "@material-ui/core";


import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { tables } from './../../constants';

import { ReservationContext } from './../../contexts/reservation.context';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const schema = yup.object().shape({
  time: yup.string().required(),
  date: yup.date().required(),
  table: yup.number().oneOf(tables).required(),
  name: yup.string().required(),
  email: yup.string().required().email(),
  guest: yup.number().required(),
});

function ReservationForm({ initialValues }) {
  const classes = useStyles();
  const [populated, setPopulated] = useState(false);

  const { addReservation, user } = useContext(ReservationContext);

  const userID = user.sub;

  const defaultValues = {
    time: '',
    date: '',
    table: '',
    name: '',
    email: '',
    guests: '',
  };//defaultValues

  const {handleSubmit, errors, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  }); //useForm

  const { isDirty, isValid } = formState;

  const onSubmit = async (formValues) => {
    console.log(formValues);
    // TODO
  };//onSubmit

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formrow}>
        <Controller
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <TextField
              inputRef={ref}
              type="time"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors.title}
              helperText={errors.title?.message}
              id="time"
              name={name}

            />
          )}
          name="time"
          control={control}
          rules={{ required: true }}
        />
        <Controller
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <TextField
              inputRef={ref}
              type="date"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              
              error={!!errors.title}
              helperText={errors.title?.message}
              id="date"
              name={name}
            />
          )}
          name="date"
          control={control}
          rules={{ required: true }}
        />
      </div>

      <div className={classes.formrow}>
        <Controller
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <TextField
              inputRef={ref}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              type="number"
              error={!!errors.title}
              helperText={errors.title?.message}
              id="table"
              name={name}
              label="table"
            />
          )}
          name="table"
          control={control}
          rules={{ required: true }}
        />
      </div>

      <div className={classes.formrow}>
        <Controller
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <TextField
              inputRef={ref}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              type="text"
              error={!!errors.title}
              helperText={errors.title?.message}
              id="name"
              name={name}
              label="name"
            />
          )}
          name="name"
          control={control}
          rules={{ required: true }}
        />
      </div>

      <div className={classes.formrow}>
        <Controller
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <TextField
              inputRef={ref}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
             type="text"
              error={!!errors.title}
              helperText={errors.title?.message}
              id="email"
              name={name}
              label="email"
            />
          )}
          name="email"
          control={control}
          rules={{ required: true }}
        />
      </div>

      <div className={classes.formrow}>
        <Controller
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <TextField
              inputRef={ref}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              type="number"
              error={!!errors.title}
              helperText={errors.title?.message}
              id="guests"
              name={name}
              label="guests"
            />
          )}
          name="guests"
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formrow}>
        <Button onClick={() => reset(defaultValues)}>Reset</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        disabled={!isValid}
        >
          {populated ? "Update" : "Add"} Reservation
        </Button>
      </div>
    </form>
  );//return
}

export default ReservationForm;