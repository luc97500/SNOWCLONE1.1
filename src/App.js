import { Box } from "@mui/material";
import "./App.css";
import { Footercomponent } from "./component/Footer";
import { AllRoutes } from "./routing/allRoutes";

function App() {

  return (
    <>
        <div>
            <AllRoutes/>
          <Footercomponent/>
        </div>
    </>
  );
}

export default App;
