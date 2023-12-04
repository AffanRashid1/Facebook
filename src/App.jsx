import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { setLogged, setUser } from "./store/reducer";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HOC from "./HOC";
import Error from "./screens/Error";
import { routes } from "./router";
import { createTheme, ThemeProvider } from "@mui/material";
import apiManager from "./Helper/ApiManager";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.appReducer.isLogged);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#2196f3",
      },
      secondary: {
        main: "#ff4081",
      },
      background: {
        default: "#18191A",
        paper: "#242526",
        gray: "#2F3031",
      },
      action: {
        selected: "rgba(255, 255, 255, 0.16)",
      },
      typography: {
        light: "#A2A4A8",
        dark: "#E4E6EB",
      },
    },
  });

  const userCall = async () => {
    try {
      const response = await apiManager({
        method: "get",
        path: `${process.env.REACT_APP_API_KEY}/users/user`,
      });

      dispatch(setLogged());
      dispatch(setUser(response?.payload?.user));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    userCall();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<HOC childern={<Home />} />}></Route> */}
              <Route path="*" element={<Error />}></Route>
              {routes.map((e, i) => {
                return (
                  <Route
                    path={e.path}
                    key={i}
                    element={
                      <HOC
                        childern={e.element}
                        isProtected={e.protected}
                        isLogged={isLogged}
                      />
                    }
                  />
                );
              })}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
