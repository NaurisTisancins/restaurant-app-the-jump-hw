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
      console.log("getting AT", `http://${domain}/api/v1`);
      try {
        const Acctoken = await getAccessTokenSilently();
        console.log("GOT AT", Acctoken);
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

  //TODO fetch reservations

  const addReservation = useCallback(
    async (formData) => {
      console.log("headers", headers);
      console.log("accessToken", accessToken);
      setLoading();

      const { reservations } = state;

      try {
        const response = await fetch("/api/v1/reservation", {
          method: "POST",
          headers: accessToken ?
            { ...headers, Authorisation: `Bearer ${accessToken}` } : headers,
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



  return (
    <ReservationContext.Provider
      value={{
        user,
        reservations,
        loading,
        loaded,
        error,
        addReservation,
      }}
    >
      {props.childern}
    </ReservationContext.Provider>
  )
}