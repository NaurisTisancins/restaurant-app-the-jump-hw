import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
} from "@material-ui/core";
import { DateTimePicker } from '@mui/lab';


import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useParams, useHistory } from "react-router-dom";
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
  dateTime: yup.date().required(),
  table: yup.number().oneOf(tables).required(),
  name: yup.string().required(),
  email: yup.string().required().email(),
  guests: yup.number().required(),
});

function ReservationForm({ initialValues }) {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [populated, setPopulated] = useState(false);

  const { addOwnReservation, updateOwnReservation, user } = useContext(ReservationContext);

  useEffect(() => {
    console.log(initialValues);
  }, [initialValues])

  const defaultValues = {
    dateTime: '',
    table: '',
    name: '',
    email: '',
    guests: '',
  };//defaultValues

  const { handleSubmit, errors, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  }); //useForm

  const { isDirty, isValid } = formState;

  if (initialValues && !populated) {
    reset({
      ...initialValues,
    });
    setPopulated(true);
  }

  const onSubmit = async (formValues) => {
    if (populated) {
      const updates = {
        ...initialValues,
        ...formValues,
        dateTime: formValues.dateTime,
      };
      // for (const key in initialValues) {
      //   if (initialValues.hasOwnProperty(key)) {
      //     if (initialValues[key] !== formValues[key] && key[0] !== "_") {
      //       updates[key] = formValues[key];
      //     }
      //   }
      // }
      updateOwnReservation(id, updates);
    } else {
      addOwnReservation(formValues);
    }
    history.push("/reservation");
  };//onSubmit

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formrow}>
        <Controller
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <DateTimePicker
              label="Date&Time"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              id="dateTime"
              renderInput={(props) => {
                return <TextField
                  {...props}
                  name={name}
                  // inputRef={ref}
                />
              }}
            />
          )}
          name="dateTime"
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
              error={!!errors.table}
              helperText={errors.table?.message}
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
              error={!!errors.name}
              helperText={errors.name?.message}
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
              error={!!errors.email}
              helperText={errors.email?.message}
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
              error={!!errors.guests}
              helperText={errors.guests?.message}
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
          disabled={!isValid || !isDirty}
        >
          {populated ? "Update" : "Add"} Reservation
        </Button>
      </div>
    </form>
  );//return
}

export default ReservationForm;