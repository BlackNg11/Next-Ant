import { useReducer, useEffect, createContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const intialState = {
  user: null,
};

const Context = createContext();

const rootReducer = (state, actions) => {
  switch (actions.type) {
    case "LOGIN":
      return { ...state, user: actions.payload };
    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState);
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  //Run when send req
  axios.interceptors.response.use(
    function (response) {
      //any status code that lie within the range of 2xx cause this fun to trigger
      return response;
    },
    function (error) {
      //any status code that falls outside the range of 2xx cause this fun to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("/401 error => logout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("user");
              route.push("/login");
            })
            .catch((err) => {
              console.log("Axios interceptors err", err);
              reject(err);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
