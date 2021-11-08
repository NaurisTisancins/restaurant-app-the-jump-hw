import React, { createContext, useState, useCallback, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useAuth0 } from "@auth0/auth0-react";

const domain = window.location.host;

let headers = {
  "Content-Type": "application/json",
};

export const ReservationContext = createContext({
  addReservation: () => { },
  loaded: false,
  loading: false,
  error: null,
  reservations: [],
});

export const ReservationProvider = (props) => {
  const { getAccessTokenSilently, user, loginWithRedirect } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
    reservations: [],
  });

  const { loading, error, reservations, loaded } = state;

  const setLoading = useCallback(
    () => setState({
      ...state,
      loading: true,
    }), [state]
  ); //setLoading

  const setError = useCallback(
    (err) => setState({
      ...state,
      error: err.message || err.statusText,
      loading: false,
      loaded: true,
    }), [state]
  ); //setError

  const setReservations = useCallback(
    (data) => setState({
      ...state,
      reservations: data,
      loading: false,
      loaded: true,
    }), [state]
  ); //setReservations

  const { addToast } = useToasts();

  useEffect(() => {
    const getToken = async () => {
      try {
        const Acctoken = await getAccessTokenSilently();
        setAccessToken(Acctoken);
        console.log("afterSet", accessToken);
      } catch (err) {
        console.log("getAccessTokenSilently err", err);
        if (
          err.error === "login_required" ||
          err.error === "consent_required"
        ) {
          loginWithRedirect();
        }
      }
    };
    if (user) {
      console.log("user", user);
      getToken();
    }
  }, [accessToken, getAccessTokenSilently, loginWithRedirect, user]);//getToken useEffect

  const fetchOwnReservations = useCallback(
    async () => {
      const { loading, loaded, error } = state;

      if (loading || loaded || error || !accessToken) {
        console.log("bailing");
        return;
      };
      setLoading();
      try {
        const response = await fetch("/api/v1/reservation", {
          headers: accessToken ? { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
        });
        if (!response.ok) {
          throw response;
        };
        const data = await response.json();
        console.log("reservations", data);
        setReservations(data);
      } catch (err) {
        console.log("err", err);
        setError(err);
      }
    }, [accessToken, setError, setLoading, setReservations, state]);//fetchOwnReservations

  const addOwnReservation = useCallback(
    async (formData) => {
      setLoading();
      const { reservations } = state;
      try {
        const response = await fetch("/api/v1/reservation", {
          method: "POST",
          headers: accessToken ?
            { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }//post reservation
        const savedReservation = await response.json();
        console.log("got data", savedReservation);
        setReservations([...reservations, savedReservation]);
        addToast(`Saved ${savedReservation.name}`, {
          appearance: "success",
        });
      } catch (err) {
        console.log(err);
        setState(err);
        addToast(`Error ${err.message || err.statusText}`, {
          appearance: "error",
        });
      }
    }, [accessToken, addToast, setLoading, setReservations, state]
  );//addReservation

  const updateOwnReservation = useCallback(
    async (id, updates) => {
      let newReservation = null;
      setLoading();
      const { Reservations } = state;
      try {
        const response = await fetch(`/api/v1/resrvation/${id}`, {
          methot: "PUT",
          headers: accessToken ?
            { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
          body: JSON.stringify(updates),
        });
        if (!response.ok) {
          throw response;
        };
        //update state
        const idx = Reservations.findIndex((Reservation) => Reservation._id === id);
        const oldReservation = Reservations[idx];
        newReservation = {
          ...oldReservation,
          ...updates,
        };
        const updatedReservations = [
          ...Reservations.slice(0, idx),
          newReservation,
          ...Reservations.slice(idx + 1),
        ];
        setReservations(updatedReservations);
        addToast(`Updated ${newReservation.name} reservation`, {
          appearance: "success",
        });
      } catch (err) {
        console.log(err);
        setError(err);
        addToast(`Error: Failed to update ${newReservation.name} reservation`, {
          appearance: "error",
        });
      }
    }, [accessToken, addToast, setError, setLoading, setReservations, state]
  );//updateOwnReservation



  return (
    <ReservationContext.Provider
      value={{
        user,
        reservations,
        loading,
        loaded,
        error,
        fetchOwnReservations,
        addOwnReservation,
      }}
    >
      {props.children}
    </ReservationContext.Provider>
  )
}