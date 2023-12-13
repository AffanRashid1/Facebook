import React, { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { setLogged, setUser } from "./store/reducer";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hoc from "./Hoc";
import { routes } from "./router";
import NotFound from "./screens/NotFound";
import { createTheme, ThemeProvider } from "@mui/material";
import apiManager from "./helper/apiManager";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.appReducer.isLogged);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
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
        path: `/users/user`,
      });

      dispatch(setLogged());
      dispatch(setUser(response?.data?.payload?.user));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      toast.error(err);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
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
              <Route path="*" element={<NotFound />}></Route>
              {routes.map((e, i) => {
                return (
                  <Route
                    path={e.path}
                    key={i}
                    element={
                      <Hoc
                        children={e.element}
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
