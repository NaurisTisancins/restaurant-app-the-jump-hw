import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  customerID: yup.string().required(),
  date: yup.string().required(),
  table: yup.mixed().oneOf(tables).required(),
  name: yup.string().required(),
  email: yup.string().required().email(),
  guest: yup.number().required(),
});

function ReservationForm({ initialValues }) {
  const classes = useStyles();
  const [populated, setPopulated] = useState(false);

  const { addReservation, user } = useContext(ReservationContext);
  
  const defaultValues = {
    cunstomerID: user.sub,
    date: new Date(),
    table: '',
    name: '',
    email: user.email,
    guests: '',
  };//defaultValues

  const { handleSubmit, errors, control, reset, formState } = useForm({
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
            {invalid, isTouched, isDirty}
          ) => (
            <TextField
              inputRef={ref}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors.title}
              helperText={errors.title?.message}
              id="table"
              name={name}
              label="table"
            />
          )}
          name="table"
          control={control}
          rules={{required: true}}
        />
      </div>
    </form>
  )

}

export default ReservationForm;