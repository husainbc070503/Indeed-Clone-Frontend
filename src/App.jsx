import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppContext } from "./contexts/AppContext";
import Authentication from "./pages/Authentication";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import Profile from "./pages/Profile";
import Companies from "./pages/Companies";
import Home from "./pages/Home";
import PostJob from "./pages/PostJob";
import Applications from "./pages/Applications";
import Bookmarks from "./pages/Bookmarks";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#115293",
      },
      secondary: {
        main: "#EBF400",
      },
    },
    typography: { fontFamily: "Bubblegum Sans" },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} index />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/myProfile" element={<Profile />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/postJob" element={<PostJob />} />
            <Route path="/editJob/:id" element={<PostJob />} />
            <Route path="/myApplications" element={<Applications />} />
            <Route
              path="/applications"
              element={<Applications fromRecruiter={true} />}
            />
            <Route path="/myBookmarks" element={<Bookmarks />} />
          </Routes>
        </AppContext>
      </BrowserRouter>
      <ToastContainer transition={Zoom} />
    </ThemeProvider>
  );
};

export default App;
