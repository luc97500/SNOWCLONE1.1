import { Routes, Route } from "react-router-dom";
import { Datatable } from "../component/datatable";
import { Box } from "@mui/material";
import { Navbar } from "../component/navbar";
import  {LoginPge}  from "../component/loginPage";
import { SignUp } from "../component/signUpPage";

export const AllRoutes = () => {
  return (
    <div className="dark:bg-darkbg">
      <Routes>
        <Route path="/" element={<LoginPge />} />

        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/home"
          element={
            <Box
              sx={{
                paddingTop: "30px",
                paddingRight: "20px",
                paddingLeft: "20px",
                paddingBottom: "10px",
                border: '2px solid black',
                borderRadius: "4px",
              }}
            >
              <Navbar />
              <Datatable currentScreen="Home Page" />
            </Box>
          }
        />
      </Routes>
    </div>
  );
};
